import '@/styles/chat.css';
import '@/styles/global.css';
import AvailableChats from '@/components/availableChats';
import ChatInfo from '@/components/ChatInfo';
import ChatMessages from '@/components/ChatMessages';
import Chats from '@/components/chats';
import { Conversation } from '@/components/conversation';
import Link from '@/components/link';
import { MessageForm } from '@/components/MessageForm';
import { Modal } from '@/components/Modal';
import { Toaster } from '@/components/Toaster';
import chatControl, { Restriction } from '@/core/api/Chat';
import userControl from '@/core/api/User';
import { Block } from '@/core/Block';
import messageControl from '@/core/WebSocket/Message';
import DefaultImg from '@/public/defaultUserImg.png';
import SettingIcon from '@/public/settings.svg';
import Button from '@/templates/button';
import { getDataFromForm } from '@/templates/form/utils';
import InputWrapper from '@/templates/input';
import MessageSpan from '@/templates/message';
import { router } from '../router';
import { template } from './tmpl';
import { ChatPageProps } from './types';
import { creatingChat, displayUsersOfChat } from './utils';

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
    click: () => router.go('/settings'),
  },
});

export class ChatPage extends Block<ChatPageProps> {
  private chatMessages = new ChatMessages({
    messages: [],
  });

  private chatInfo = new ChatInfo({
    events: {
      click: async (event) => {
        if ((event.target as HTMLElement).closest('.user-info')) {
          const userInChat = await this.getChatUsers(window.currentChatId);

          new Modal({
            wrapperType: 'div',
            title: 'Список участников чата',
            inputs: displayUsersOfChat(userInChat, this, this.chatInfo),
          }).renderInRoot();
        }
      },
    },
  });

  private messageForm = new MessageForm({
    events: {
      submit: async (event) => {
        const formData = Object.fromEntries(getDataFromForm(event)!.entries());
        messageControl.sendMessage(formData.message as string);

        (event.target as HTMLFormElement)?.reset();
      },
    },
  });

  private conversation = new Conversation({
    render: false,
    chatInfo: this.chatInfo,
    messageForm: this.messageForm,
    chatMessages: this.chatMessages,
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
    new Toaster({
      text: 'Пытаемся подключиться к чату',
      title: 'Инфо',
      reason: 'info',
    }).renderInRoot(1000);

    messageControl.leave();
    window.currentChatId = chatId;
    const choosenChat = window.chats.find((item) => item.id === chatId);
    const userInChat = await this.getChatUsers(chatId);
    const token = await chatControl.getUserToken(chatId);
    messageControl.getMessages();

    if (!choosenChat) return;

    window.currentChatMessages = [choosenChat.last_message];
    window.token = token.token;

    this.conversation.setProps({
      render: true,
    });

    (this.chatInfo as ChatInfo).setProps({
      ...choosenChat,
      avatar: choosenChat.avatar ?? DefaultImg,
      count: userInChat.length,
    });

    (this.chatInfo as ChatInfo).setChildren({
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

                    (this.chatInfo as ChatInfo).setProps({
                      count: userInChat.length,
                    });
                  } catch (error) {
                    new Toaster({
                      text: error as string,
                      title: 'Ошибка',
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
    });

    this.chatMessages.setChildren({
      messages: window.currentChatMessages.map(
        (chat) =>
          new MessageSpan({
            text: chat.content,
            className:
              chat.user.login === window.userInfo.login ? 'user' : 'other',
          }),
      ),
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

  remove() {
    messageControl.leave();
    super.remove();
  }

  render() {
    return this.compile(template, this.props);
  }
}
