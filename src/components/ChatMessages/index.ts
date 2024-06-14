import { LastMessage } from '@/core/api/Chat';
import { Block } from '@/core/Block';
import messageControl, { ConnectionOptions } from '@/core/WebSocket/Message';
import MessageSpan from '@/templates/message';
import { EventsProps } from '../../templates/button/index';
import { template } from './tmpl';

interface ChatMessagesProps extends EventsProps {
  messages: MessageSpan[];
}

export interface NewMessageSpan {
  text: string;
  fromWho: 'user' | 'other';
  time: string;
}

export default class ChatMessages extends Block<Partial<ChatMessagesProps>> {
  constructor() {
    super({
      messages: [],
    });
  }

  private createConnection(options: ConnectionOptions) {
    messageControl.connect(options);
    messageControl.setBlock(this);
  }

  showChoosenChat(messages: LastMessage[]) {
    const nonNullMessages = messages.filter(Boolean);
    this.createConnection({
      userId: window.userInfo.id,
      chatId: window.currentChatId,
      token: window.token,
    });
    if (nonNullMessages.length > 0) {
      this.setChildren({
        messages: messages.map((chat) => {
          return new MessageSpan({
            text: chat?.content,
            time: chat.time,
            className:
              chat?.user.login === window.userInfo.login ? 'user' : 'other',
          });
        }),
      });
    } else {
      this.setChildren({
        messages: [],
      });
    }
  }

  updateArray(type: 'add' | 'clear', newItem?: NewMessageSpan) {
    if (type === 'add' && newItem) {
      (this.getChildren().messages as MessageSpan[]).push(
        new MessageSpan({
          text: newItem.text as string,
          time: newItem.time,
          className: newItem.fromWho,
        }),
      );

      this.setChildren({
        messages: this.getChildren().messages,
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
