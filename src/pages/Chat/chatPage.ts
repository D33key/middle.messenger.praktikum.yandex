import '@/styles/chat.css';
import '@/styles/global.css';
import AvailableChats from '@/components/availableChats';
import Chat from '@/components/chat';
import Chats from '@/components/chats';
import { Conversation } from '@/components/conversation';
import { Block } from '@/core/Block';
import DefaultImg from '@/public/defaultUserImg.png';
import Button from '@/templates/button';
import InputWrapper from '@/templates/input';
import MessageSpan from '@/templates/message';
import { render } from '@/utils/render';
import { conversationWithUser, testChatsArray } from './testChats';
import { template } from './tmpl';
import { ChatPageProps } from './types';

const conversation = new Conversation({
  dialog: false,
  events: {
    submit: (event) => {
      event.preventDefault();

      if (event.target && event.target instanceof HTMLFormElement) {
        console.log(event.target.querySelector('input')?.getAttribute('value'));
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

class ChatPage extends Block<ChatPageProps> {
  constructor() {
    super({
      chats: new Chats({
        searchChat,
        existingChats: new AvailableChats({
          chatArray: testChatsArray.map(
            ({
              chatId,
              lastMessageDate,
              userImg,
              userLastMessage,
              userName,
              isNewMessage,
            }) =>
              new Chat({
                chatId,
                userImg: userImg ?? DefaultImg,
                userName,
                userLastMessage,
                lastMessageDate,
                isNewMessage,
                events: {
                  click: () => {
                    this.displayChat(chatId);
                  },
                },
              }),
          ),
        }),
      }),
      conversation,
    });
  }

  displayChat(chatId: number) {
    const getChatInfo = conversationWithUser.find(
      (item) => item.chatId === chatId,
    );

    if (!getChatInfo) return;

    const getMessages = getChatInfo.messages;
    const displayMessages = getMessages.map((message) => {
      let addClass = '';
      if (message.user) {
        addClass = 'user';
        const messagesArray = message.user.map(
          (span) =>
            new MessageSpan({
              className: addClass,
              text: span,
            }),
        );
        return messagesArray;
      }
      addClass = 'other';
      const messagesArray = message.other.map(
        (span) =>
          new MessageSpan({
            className: addClass,
            text: span,
          }),
      );
      return messagesArray;
    });

    conversation.setProps({
      dialog: {
        userImg: getChatInfo.userImg ?? DefaultImg,
        userName: getChatInfo.userName,
        messages: displayMessages,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const chatPage = new ChatPage();

  render('#app', chatPage);
});
