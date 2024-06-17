import ChatMessages, { NewMessageSpan } from '@/components/ChatMessages';
import { Toaster } from '@/components/Toaster';
import { MessageProps } from '@/templates/message';
import convertOldMessages from '@/utils/convertOldMessages';
import formatDateTime from '@/utils/formatDateTime';

export interface ConnectionOptions {
  userId: number;
  chatId: number;
  token: string;
}

export interface OldMessagesFromSocket {
  content: string;
  id: number;
  time: string;
  type: 'message' | 'file';
  user_id: number;
  chat_id: number;
  file: unknown;
  is_read: boolean;
}

export type NewMessagesFromSocket = Omit<
  OldMessagesFromSocket,
  'chat_id' | 'file' | 'is_read'
>;

class MessageControl {
  private socket?: WebSocket;
  private userId?: number;
  private chatId?: number;
  private token?: string;
  private ping?: NodeJS.Timeout;
  public isDataSet = false;
  private chatBlock: ChatMessages | null = null;

  constructor() {
    this.onError = this.onError.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  private addEvents() {
    this.socket?.addEventListener('open', this.onOpen);
    this.socket?.addEventListener('message', this.onMessage);
    this.socket?.addEventListener('error', this.onError);
    this.socket?.addEventListener('close', this.onClose);
  }

  private removeEvents() {
    this.socket?.removeEventListener('open', this.onOpen);
    this.socket?.removeEventListener('message', this.onMessage);
    this.socket?.removeEventListener('error', this.onError);
    this.socket?.removeEventListener('close', this.onClose);
  }

  private onMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data) as
        | NewMessagesFromSocket
        | OldMessagesFromSocket[];
      if (Array.isArray(data)) {
        if (data.length === 0) {
          const lastMessage = window.currentChatMessages[0];
          if (lastMessage) {
            this.triggerBlock({
              text: lastMessage.content,
              time: lastMessage.time,
              fromWho:
                lastMessage.user.login === window.userInfo.login
                  ? 'user'
                  : 'other',
            });
          }
        } else {
          const convertMessages = convertOldMessages(data);
          this.triggerBlock(convertMessages, 'array');
        }
      } else if ('user_id' in data) {
        window.currentChatMessages.push(data as any);

        const convertedData = formatDateTime(data.time);

        this.triggerBlock({
          text: data.content,
          time: convertedData,
          fromWho: data.user_id === window.userInfo.id ? 'user' : 'other',
        });
      }
    } catch (error) {
      new Toaster({
        title: 'Что-то пошло не так...',
        text: error as string,
      }).renderInRoot();
    }
  }

  private onOpen() {
    this.getMessages('0');
    this.ping = setInterval(() => this.socket?.send(''), 5_000);
  }

  private onError(event: Event) {
    console.error('Error in WebSocket', (event as ErrorEvent).message);
  }

  private onClose(event: CloseEventInit) {
    this.removeEvents();
    if (event.code === 1006) {
      this.reconnect();

      return;
    }

    new Toaster({
      title: 'Ошибка',
      text: 'Соединение оборвалось',
    }).renderInRoot();
  }

  connect(options?: ConnectionOptions) {
    if (!options && !this.userId) {
      new Toaster({
        title: 'Ошибка',
        text: 'Невозможно установить соединение без данных юзера.',
      }).renderInRoot();

      return;
    }

    if (options) {
      this.userId = options.userId;
      this.chatId = options.chatId;
      this.token = options.token;
    }

    this.socket = new WebSocket(
      `${import.meta.env.VITE_HOST_URL_SOCKET}/chats/${this.userId}/${this.chatId}/${this.token}`,
    );
    this.addEvents();
  }

  private reconnect() {
    this.connect();
  }

  sendMessage(message: string) {
    this.socket?.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  getMessages(offset: string = '0' as string) {
    this.socket?.send(
      JSON.stringify({
        content: offset,
        type: 'get old',
      }),
    );
  }

  leave() {
    clearInterval(this.ping);
    this.socket?.close();
    this.removeEvents();
  }

  setBlock(block: ChatMessages) {
    this.chatBlock = block;
  }

  private triggerBlock(
    newItem: NewMessageSpan | MessageProps[],
    type: 'add' | 'array' = 'add',
  ) {
    this.chatBlock?.updateArray(type, newItem);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MessageControl();
