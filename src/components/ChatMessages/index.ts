import { Block } from '@/core/Block';
import messageControl, { ConnectionOptions } from '@/core/WebSocket/Message';
import MessageSpan, { MessageProps } from '@/templates/message';
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

  triggerCreateConnection() {
    this.createConnection({
      userId: window.userInfo.id,
      chatId: window.currentChatId,
      token: window.token,
    });
  }

  removeAllMessages() {
    this.setChildren({
      messages: [],
    });
  }

  updateArray(
    type: 'add' | 'array',
    newItem?: NewMessageSpan | MessageProps[],
  ) {
    if (newItem) {
      if (type === 'add' && !Array.isArray(newItem)) {
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
      } else if (type === 'array' && Array.isArray(newItem)) {
        this.setChildren({
          messages: newItem.map((item) => new MessageSpan(item)),
        });
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
