import ChatMessages, { NewMessageSpan } from '@/components/ChatMessages';
import { Toaster } from '@/components/Toaster';
import formatDateTime from '@/utils/formatDateTime';

export interface ConnectionOptions {
  userId: number;
  chatId: number;
  token: string;
}

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
    const data = JSON.parse(event.data);

    if (data.user_id) {
      window.currentChatMessages.push(data);

      const convertedData = formatDateTime(data.time);

      this.triggerBlock({
        text: data.content,
        time: convertedData,
        fromWho: data.user_id === window.userInfo.id ? 'user' : 'other',
      });
    }
  }

  private onOpen() {
    this.getMessages('10');
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

  private triggerBlock(newItem: NewMessageSpan) {
    this.chatBlock?.updateArray('add', newItem);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MessageControl();
