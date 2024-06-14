import DefaultImg from '@/assets/defaultUserImg.png';
import chatControl, { Chat } from '@/core/api/Chat';
import { Block } from '@/core/Block';
import { displayUsersOfChat } from '@/pages/Chat/utils';
import Button, { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import submitAddUser from '@/utils/submit/submitAddUser';
import { Modal } from '../Modal';
import { template } from './tmpl';

interface ChatInfoProps extends EventsProps {
  avatar: string;
  title: string;
  count: number;
  addButton: Button;
}

export default class ChatInfo extends Block<Partial<ChatInfoProps>> {
  constructor() {
    super({
      events: {
        click: async (event) => {
          if ((event.target as HTMLElement).closest('.user-info')) {
            const userInChat = await chatControl.getChatUsers(
              window.currentChatId,
            );

            new Modal({
              wrapperType: 'div',
              title: 'Список участников чата',
              inputs: displayUsersOfChat(userInChat, this),
            }).renderInRoot();
          }
        },
      },
    });
  }

  triggerUpdateBlock(choosenChat: Chat, chatId: number, userInChat: number) {
    this.setProps({
      ...choosenChat,
      avatar: choosenChat.avatar ?? DefaultImg,
      count: userInChat,
    });

    this.setChildren({
      addButton: new Button({
        child: ``,
        type: 'button',
        className: 'chat-settings',
        events: {
          click: () => {
            new Modal({
              title: 'Настройки Чата',
              inputs: [
                new InputWrapper({
                  inputType: 'text',
                  labelFor: 'login',
                  placeholder: 'Введите логин пользователя',
                  required: true,
                }),
                new Button({
                  child: 'Добавить пользователя',
                  type: 'submit',
                  className: 'modal-btn',
                }),
              ],
              events: {
                submit: async (event) => {
                  await submitAddUser(event, this, chatId, userInChat);
                },
              },
            }).renderInRoot();
          },
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
