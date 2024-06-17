import { BaseAPI, ErrorAPI } from '@/core/HTTPTransport/BaseAPI';
import { isErrorAPI } from '../HTTPTransport/utils';

export interface UserInfo {
  id: number;
  display_name: string;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

class AuthAPI extends BaseAPI {
  constructor() {
    super({ path: '/auth' });
  }

  async logIn<Data>(data: FormData) {
    const response = (await this.post('/signin', {
      data: Object.fromEntries(data.entries()),
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    })) as Data | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async signup<Data>(data: FormData) {
    const response = (await this.post('/signup', {
      data: Object.fromEntries(data.entries()),
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    })) as Data | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async checkAccess() {
    const response = (await this.get('/user', {
      withCredentials: true,
    })) as UserInfo | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    if (!window.userInfo) {
      window.userInfo = response;
    }

    return response;
  }

  async logout() {
    const response = (await this.post('/logout', {
      withCredentials: true,
    })) as unknown | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI();
