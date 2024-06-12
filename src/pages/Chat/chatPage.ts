import '@/styles/chat.css';
import '@/styles/global.css';
import AvailableChats from '@/components/availableChats';
import Chats from '@/components/chats';
import { Conversation } from '@/components/conversation';
import Link from '@/components/link';
import { Modal } from '@/components/Modal';
import { Toaster } from '@/components/Toaster';
import chatControl, { Restriction } from '@/core/api/Chat';
import userControl from '@/core/api/User';
import { Block } from '@/core/Block';
import DefaultImg from '@/public/defaultUserImg.png';
import SettingIcon from '@/public/settings.svg';
import Button from '@/templates/button';
import { getDataFromForm } from '@/templates/form/utils';
import InputWrapper from '@/templates/input';
import { router } from '../router';
import { template } from './tmpl';
import { ChatPageProps } from './types';
import { creatingChat } from './utils';

const searchChat = new InputWrapper({
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
        searchChat.setProps({
          value: '',
        });
      },
    },
  }),
});

const chatLink = new Link({
  linkClass: 'chat-link',
  linkText: 'Профиль',
  events: {
    click: () => router.go('/profile'),
  },
});

export class ChatPage extends Block<ChatPageProps> {
  private conversation = new Conversation({
    dialog: false,
    events: {
      submit: (event) => {
        event.preventDefault();

        if (event.target && event.target instanceof HTMLFormElement) {
          console.log(
            event.target.querySelector('input')?.getAttribute('value'),
          );
        }
      },
      input: (event) => {
        (event.target as HTMLInputElement).setAttribute(
          'value',
          (event.target as HTMLInputElement).value,
        );
      },
    },
  });

  private existingChats = new AvailableChats({
    chatArray: null,
  });

  private chats = new Chats({
    chatLink,
    searchChat,
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
                const formData = getDataFromForm(event);

                if (!formData) {
                  new Toaster({
                    title: 'Ошибка',
                    text: 'Не удалось создать чат! Неверно введенный заголовок.',
                  }).renderInRoot();

                  return;
                }

                try {
                  await this.createChat(formData);
                  const updatedChats = await this.requestExtistingChats();

                  this.existingChats.setChildren({
                    chatArray: creatingChat(updatedChats, this),
                  });

                  new Toaster({
                    title: 'Успешно',
                    text: 'Новый чат создан!',
                    reason: 'info',
                  }).renderInRoot();
                } catch (error) {
                  new Toaster({
                    title: 'Ошибка',
                    text: `Не удалось создать чат! ${error}`,
                    reason: 'info',
                  }).renderInRoot();
                } finally {
                  Modal.close();
                }
              },
            },
          }).renderInRoot();
        },
      },
    }),
    existingChats: this.existingChats,
  });

  constructor() {
    super({
      chats: null,
      conversation: null,
    });

    this.requestExtistingChats()
      .then((chats) => {
        this.existingChats.setChildren({
          chatArray: creatingChat(chats, this),
        });
      })
      .catch((error) => {
        console.error('Some Error:', error);
      });

    this.setChildren({
      chats: this.chats,
      conversation: this.conversation,
    });
  }

  async displayChat(chatId: number) {
    const choosenChat = window.chats.find((item) => item.id === chatId);
    const userInChat = await this.getChatUsers(chatId);

    if (!choosenChat) return;

    this.conversation.setProps({
      dialog: {
        ...choosenChat,
        avatar: choosenChat.avatar ?? DefaultImg,
        count: userInChat.length,

      },
    });

    this.conversation.setChildren({
      addButton: new Button({
        child: `<img src='${SettingIcon}' alt='Настройки'/>`,
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
                  const formData = getDataFromForm(event);

                  if (!formData) return;

                  try {
                    const { user, convertFormData } =
                      await userControl.searchForUser(formData);

                    const userExist = user.find(
                      ({ login }) => login === convertFormData.login,
                    );

                    if (!userExist) {
                      new Toaster({
                        text: 'Такого пользователя нет',
                        title: 'Ошибка',
                      }).renderInRoot();
                      return;
                    }

                    await chatControl.addUsersToChat(userExist.id, chatId);
                  } catch (error) {
                    new Toaster({
                      text: error as string,
                      title: 'Ошибка',
                    }).renderInRoot();
                  } finally {
                    // Modal.close();
                  }
                },
              },
            }).renderInRoot();
          },
        },
      }),
    });
  }

  async requestExtistingChats(
    data?: Parameters<typeof chatControl.getChats>[0],
  ) {
    const chats = await chatControl.getChats(data);

    window.chats = chats;

    return chats;
  }

  async createChat(data: FormData) {
    const formObject = Object.fromEntries(data.entries());

    const chatId = await chatControl.createChat({
      title: formObject.title as string,
    });

    return chatId;
  }

  async getChatUsers(
    chatId: number,
    data?: Partial<Restriction> & {
      name?: string;
      email?: string;
    },
  ) {
    const chatUsers = await chatControl.getChatUsers(chatId, data);

    return chatUsers;
  }

  async deleteChat(chatId: number) {
    const deletedChat = await chatControl.deleteChat({ chatId });

    return deletedChat;
  }

  render() {
    return this.compile(template, this.props);
  }
}
