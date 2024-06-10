import { BaseAPI, ErrorAPI } from '@/core/HTTPTransport/BaseAPI';
import { isErrorAPI } from '../HTTPTransport/utils';

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
    })) as Data | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI();
