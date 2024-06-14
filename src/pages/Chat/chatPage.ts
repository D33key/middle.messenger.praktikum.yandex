import '@/styles/chat.css';
import '@/styles/global.css';
import AvailableChats from '@/components/availableChats';
import ChatInfo from '@/components/ChatInfo';
import ChatMessages from '@/components/ChatMessages';
import Chats from '@/components/chats';
import { Conversation } from '@/components/conversation';
import { MessageForm } from '@/components/MessageForm';
import chatControl from '@/core/api/Chat';
import { Block } from '@/core/Block';
import messageControl from '@/core/WebSocket/Message';
import { template } from './tmpl';
import { ChatPageProps } from './types';

export class ChatPage extends Block<ChatPageProps> {
  private chatMessages = new ChatMessages();

  private chatInfo = new ChatInfo();

  private messageForm = new MessageForm();

  private conversation = new Conversation({
    render: false,
    chatInfo: this.chatInfo,
    messageForm: this.messageForm,
    chatMessages: this.chatMessages,
  });

  private existingChats = new AvailableChats({
    chatInfo: this.chatInfo,
    chatMessages: this.chatMessages,
    conversation: this.conversation,
  });

  private chats = new Chats({
    existingChats: this.existingChats,
  });

  constructor() {
    super({
      chats: null,
      conversation: null,
    });

    this.setChildren({
      chats: this.chats,
      conversation: this.conversation,
    });
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
