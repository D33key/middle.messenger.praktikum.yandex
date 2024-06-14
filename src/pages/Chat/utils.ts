import DefaultImg from '@/assets/defaultUserImg.png';
import AvailableChats from '@/components/availableChats';
import Chat, { ChatProps } from '@/components/chat';
import ChatInfo from '@/components/ChatInfo';
import UserOfChat from '@/components/UserOfChat';
import { UserInfo } from '@/core/api/Auth';
import chatControl, { Role } from '@/core/api/Chat';
import Button from '@/templates/button';

export function creatingChat(chats: ChatProps[], chatPage: AvailableChats) {
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

export function displayUsersOfChat(
  users: (UserInfo & Role)[],
  chatInfo: ChatInfo,
) {
  return users.map((user) => {
    const userOfChat = new UserOfChat({
      avatar: user.avatar
        ? import.meta.env.VITE_HOST_URL_RESOURCE + user.avatar
        : DefaultImg,
      login: user.login,
      name: user.display_name ?? user.first_name + ' ' + user.second_name,
      removeBtn: new Button({
        child: 'X',
        type: 'button',
        className: 'chat-add',
        events: {
          click: async () => {
            await chatControl.deleteUsersFromChat({
              users: [user.id],
              chatId: window.currentChatId,
            });

            const userInChat = await chatControl.getChatUsers(
              window.currentChatId,
            );

            userOfChat.remove();

            chatInfo.setProps({
              count: userInChat.length,
            });
          },
        },
      }),
    });

    return userOfChat;
  });
}
