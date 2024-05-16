import '@/styles/global.css';
import '@/styles/chat.css';
import AvailableChats from '@/components/availableChats';
import Chat from '@/components/chat';
import Chats from '@/components/chats';
import { Conversation, ConversationProps } from '@/components/conversation';
import { Block } from '@/core/Block';
import DefaultImg from '@/public/defaultUserImg.png';
import Button from '@/templates/button';
import InputWrapper from '@/templates/input';
import { InputWrapperProps } from '@/templates/input/types';
import MessageSpan from '@/templates/message';
import { render } from '@/utils/render';
import { conversationWithUser, testChatsArray } from './testChats';

interface ChatPageProps {
  chats: Chats;
  conversation: Conversation;
}

const template = /*html*/ `
  <div class='chat-page'>
    {{chats}}
    {{ conversation }}
  </div>
`;

class ChatPage extends Block<ChatPageProps> {
  constructor() {
    super({
      chats: new Chats({
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
                (
                  (this.children.chats as Block<any>).children
                    .searchChat as Block<InputWrapperProps>
                ).setProps({
                  value: '',
                });
              },
            },
          }),
        }),
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
      conversation: new Conversation({
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
      }),
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

    (this.children.conversation as Block<ConversationProps>).setProps({
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
