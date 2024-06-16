import chatControl, { Chat as IChat } from '@/core/api/Chat';
import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import formatDateTime from '@/utils/formatDateTime';
import submitUpdateChatPhoto from '@/utils/submit/submitUpdateChatPhoto';
import AvailableChats from './availableChats';
import { ChangePhoto } from './changePhoto';
import { DeleteChat } from './deleteChat';
import { Modal } from './Modal';
import { Toaster } from './Toaster';

export interface ChatProps extends IChat, EventsProps {
  deleteChat: DeleteChat;
  changePhoto: ChangePhoto;
  availableChatRef: AvailableChats;
}

const template = /*html*/ `
  <div class='chat'>
    <img class='chat-avatar' src="{{ avatar }}" alt='Аватар {{title}}'/>
    <div class='user-info'>
      <p class='chat-username'>{{title}}</p>
      {{if last_message}}
        <p class='last-message'>{{last_message.content}}</p>
      {{endif}}
    </div>
    <div class='user-message-info'>
      {{if last_message}}
        <span class='message-time'>{{last_message.time}}</span>
      {{endif}}
      {{if unread_count}}
      <p class='new-messsage'>
        {{unread_count}}
      </p>
      {{endif}}
    </div>
    {{changePhoto}}
    {{deleteChat}}
  </div>`;

export default class ChatComponent extends Block<ChatProps> {
  constructor(props: ChatProps) {
    props.last_message = props.last_message ?? false;
    if (props.last_message) {
      props.last_message.time = formatDateTime(props.last_message.time);
    }

    props.deleteChat = new DeleteChat({
      events: {
        click: async (event) => {
          event.stopImmediatePropagation();
          try {
            new Toaster({
              title: 'Инфо',
              text: 'Пытаемся удалить чат',
              reason: 'info',
            }).renderInRoot();

            await chatControl.deleteChat({ chatId: props.id });

            this.remove();

            props.availableChatRef.triggerRefreshIfChatDelete();

            new Toaster({
              title: 'Инфо',
              text: 'Чат успешно удален',
              reason: 'info',
            }).renderInRoot();
          } catch (error) {
            new Toaster({
              title: 'Ошибка',
              text: 'Не удалось удалить чат: ' + error,
            }).renderInRoot();
          }
        },
      },
    });

    props.changePhoto = new ChangePhoto({
      events: {
        click: (event) => {
          event.stopImmediatePropagation();
          new Modal({
            title: 'Изменить фото чата',
            inputs: [
              new InputWrapper({
                inputType: 'file',
                labelText: 'Фото для чата',
                labelFor: 'avatar',
              }),
              new Button({
                child: 'Изменить',
                type: 'submit',
              }),
            ],
            events: {
              submit: async (event) => {
                const avatar = await submitUpdateChatPhoto(event, props.id);

                if (avatar) {
                  const newAvatar =
                    import.meta.env.VITE_HOST_URL_RESOURCE + avatar;
                  this.setProps({
                    avatar: newAvatar,
                  });

                  props.availableChatRef.refBlocks.chatInfo?.setProps({
                    avatar: newAvatar,
                  });

                  new Toaster({
                    title: 'Инфо',
                    text: 'Фото успешно изменено',
                    reason: 'info',
                  }).renderInRoot();

                  Modal.close();
                }
              },
            },
          }).renderInRoot();
        },
      },
    });
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
