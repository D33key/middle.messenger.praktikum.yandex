import Chat from '@/components/chat';
import { Chat as ChatProps } from '@/core/api/Chat';
import DefaultImg from '@/public/defaultUserImg.png';
import { ChatPage } from './chatPage';

export function creatingChat(chats: ChatProps[], chatPage: ChatPage) {
  return chats.map(
    (props) =>
      new Chat({
        ...props,
        avatar: props.avatar ?? DefaultImg,
        events: {
          click: async () => {
            await chatPage.displayChat(props.id);
          },
        },
      }),
  );
}
