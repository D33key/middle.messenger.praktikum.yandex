import chatControl from '@/core/api/Chat';
import { Block } from '@/core/Block';
import messageControl from '@/core/WebSocket/Message';
import { creatingChat } from '@/pages/Chat/utils';
import { EventsProps } from '@/templates/button';
import Chat from './chat';
import ChatInfo from './ChatInfo';
import ChatMessages from './ChatMessages';
import { Conversation } from './conversation';
import { Toaster } from './Toaster';

export interface AvailableChatsProps extends EventsProps {
  chatArray: Chat[] | string;
}

interface RefBlocks {
  chatInfo: ChatInfo | null;
  chatMessages: ChatMessages | null;
  conversation: Conversation | null;
}

const template = /*html*/ `
  <div class='available-chats'>
    {{each chatArray}}
      {{ chatArray }}
    {{endeach}}
  </div>`;

export default class AvailableChats extends Block<AvailableChatsProps> {
  private refBlocks: RefBlocks = {
    chatInfo: null,
    chatMessages: null,
    conversation: null,
  };

  constructor(props: RefBlocks) {
    super({
      chatArray: 'Ищем доступные чаты...',
    });

    this.refBlocks = props;
  }

  async componentDidMount() {
    try {
      const chats = await this.requestExtistingChats();
      this.setChildren({
        chatArray: creatingChat(chats, this),
      });
    } catch (error) {
      this.setChildren({
        chatArray: 'Нет доступных чатов',
      });
    }
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
    const userInChat = await chatControl.getChatUsers(chatId);
    const token = await chatControl.getUserToken(chatId);

    if (!choosenChat) return;

    window.currentChatMessages = [choosenChat.last_message];
    window.token = token.token;

    this.refBlocks.conversation?.setProps({
      render: true,
    });

    this.refBlocks.chatInfo?.triggerUpdateBlock(
      choosenChat,
      chatId,
      userInChat.length,
    );

    this.refBlocks.chatMessages?.showChoosenChat(window.currentChatMessages);
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
