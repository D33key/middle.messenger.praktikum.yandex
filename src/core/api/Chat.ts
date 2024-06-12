import { BaseAPI, ErrorAPI, OKResponse } from '../HTTPTransport/BaseAPI';
import { isErrorAPI } from '../HTTPTransport/utils';
import { UserInfo } from './Auth';

export interface LastMessage {
  user: Omit<UserInfo, 'id' | 'display_name'>;
  time: string;
  content: string;
}

export interface Role {
  role: 'adimin' | 'regular';
}

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage;
}

export interface Restriction {
  offset: number;
  limit: number;
}

class ChatAPI extends BaseAPI {
  constructor() {
    super({
      path: '/chats',
    });
  }

  async getChats(data?: Partial<Restriction> & { title?: string }) {
    const response = (await this.get('', {
      data,
      withCredentials: true,
    })) as Chat[] | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async createChat(data: { title: string }) {
    const response = (await this.post('', {
      data,
      withCredentials: true,
    })) as { id: number } | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async deleteChat(data: { chatId: number }) {
    const response = (await this.delete('', {
      data,
      withCredentials: true,
    })) as OKResponse | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async addUsersToChat(userId: number, chatId: number) {
    const response = (await this.put('/users', {
      data: {
        users: [userId],
        chatId,
      },
      withCredentials: true,
    })) as OKResponse | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async deleteUsersFromChat(data: { users: number[]; chatId: number }) {
    const response = (await this.delete('/users', {
      data,
      withCredentials: true,
    })) as OKResponse | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async getChatUsers(
    chatId: number,
    data?: Partial<Restriction> & {
      name?: string;
      email?: string;
    },
  ) {
    const response = (await this.get(`/${chatId}/users`, {
      data,
      withCredentials: true,
    })) as (UserInfo & Role)[] | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ChatAPI();
