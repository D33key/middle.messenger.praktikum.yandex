import { BaseAPI, ErrorAPI } from '../HTTPTransport/BaseAPI';
import { isErrorAPI } from '../HTTPTransport/utils';
import { UserInfo } from './Auth';

class UserAPI extends BaseAPI {
  constructor() {
    super({
      path: '/user',
    });
  }

  async changeProfile(data: FormData) {
    const response = (await this.put('/profile', {
      data: Object.fromEntries(data.entries()),
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    })) as UserInfo | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async changeAvatar(data: FormData) {
    const response = (await this.put('/profile/avatar', {
      data,
      headers: {},
      isFileAttached: true,
      withCredentials: true,
    })) as UserInfo | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async changePassword(data: FormData) {
    const response = (await this.put('/password', {
      data: Object.fromEntries(data.entries()),
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    })) as unknown | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return response;
  }

  async searchForUser(data: FormData) {
    const convertFormData = Object.fromEntries(data.entries());
    const response = (await this.post('/search', {
      data: convertFormData,
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    })) as UserInfo[] | ErrorAPI;

    if (isErrorAPI(response)) {
      throw new Error(response.reason);
    }

    return { user: response, convertFormData };
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserAPI();
