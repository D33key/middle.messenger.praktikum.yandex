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
}

export default class ChatMessages extends Block<Partial<ChatMessagesProps>> {
  private ping?: NodeJS.Timeout;
  private isConnected = false;

  constructor(props: Partial<ChatMessagesProps>) {
    super(props);

    // this.waitForGettingMessages();
  }

  componentDidUpdate() {
    if (!this.isConnected) {
      this.createConnection({
        userId: window.userInfo.id,
        chatId: window.currentChatId,
        token: window.token,
      });

      this.isConnected = true;
    }
    return true;
  }

  private createConnection(options: ConnectionOptions) {
    messageControl.connect(options);
    messageControl.setBlock(this);
  }

  waitForGettingMessages() {
    this.ping = setInterval(() => {
      if (window.currentChatMessages?.length > 0) {
        console.log(window.currentChatMessages);
        this.setChildren({
          messages: window.currentChatMessages.map(
            (chatMessage) =>
              new MessageSpan({
                text: chatMessage.content,
                className:
                  chatMessage?.user.login === window.userInfo.login
                    ? 'user'
                    : 'other',
              }),
          ),
        });
      }
    }, 1000);
  }

  updateArray(type: 'add' | 'clear', newItem?: NewMessageSpan) {
    if (type === 'add' && newItem) {
      (this.getChildren().messages as MessageSpan[]).push(
        new MessageSpan({
          text: newItem.text as string,
          className: newItem.fromWho,
        }),
      );

      this.setChildren({
        messages: this.getChildren().messages,
      });
    }
  }

  remove() {
    this.isConnected = false;
    super.remove();
  }

  render() {
    return this.compile(template, this.props);
  }
}
