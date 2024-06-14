import chatControl from '@/core/api/Chat';
import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import submitCreateNewChat from '@/utils/submit/submitCreateNewChat';
import { default as AvailableChats, default as Chat } from './availableChats';
import Link from './link';
import { Modal } from './Modal';

export interface ChatsProps extends EventsProps {
  chatLink: Link;
  searchChat: InputWrapper;
  createChat: Button;
  existingChats: Chat;
}

const template = /*html*/ `
  <div class='chats-wrapper'>
    {{ chatLink }}
    <div class='chat-actions'>
      {{ searchChat }}
      {{ createChat }}
    </div>
		{{ existingChats }}
  </div>`;

export default class Chats extends Block<ChatsProps> {
  constructor(props: Pick<ChatsProps, 'existingChats'>) {
    super({
      ...props,
      chatLink: new Link({
        linkClass: 'chat-link',
        linkText: 'Профиль',
        linkHref: '/settings',
      }),
      searchChat: new InputWrapper({
        classNameInput: 'chat-search-input',
        placeholder: 'Поиск...',
        labelFor: 'search',
        className: 'search-input',
        inputType: 'text',
        addResetBtn: true,
        button: new Button({
          className: 'clear-result',
          child: 'X',
          type: 'button',
          events: {
            click: () => {
              (this.children.searchChat as InputWrapper).setProps({
                value: '',
              });
            },
          },
        }),
      }),
      createChat: new Button({
        child: '+',
        type: 'button',
        className: 'chat-add',
        events: {
          click: () => {
            new Modal({
              title: 'Создать чат',
              inputs: [
                new InputWrapper({
                  inputType: 'text',
                  labelText: 'Название чата',
                  labelFor: 'title',
                  placeholder: 'Введите название будущего чата',
                }),
                new Button({
                  child: 'Создать',
                  type: 'submit',
                }),
              ],
              events: {
                submit: async (event) => {
                  await submitCreateNewChat(
                    event,
                    this.createChat,
                    this.requestExtistingChats,
                    this.children.existingChats as AvailableChats,
                  );
                },
              },
            }).renderInRoot();
          },
        },
      }),
    });
  }

  async createChat(data: FormData) {
    const formObject = Object.fromEntries(data.entries());

    const chatId = await chatControl.createChat({
      title: formObject.title as string,
    });

    return chatId;
  }

  async requestExtistingChats(
    data?: Parameters<typeof chatControl.getChats>[0],
  ) {
    const chats = await chatControl.getChats(data);

    window.chats = chats;

    return chats;
  }

  render() {
    return this.compile(template, this.props);
  }
}
