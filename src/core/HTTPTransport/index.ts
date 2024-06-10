import { METHOD, Options } from './type';
import { queryStringify } from './utils';

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  private corePath: string;

  constructor(
    corePath: string,
    baseUrl: string = import.meta.env.VITE_HOST_URL,
  ) {
    this.corePath = baseUrl + corePath;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  patch: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PATCH });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  private request(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<XMLHttpRequest> {
    const {
      method,
      data,
      headers = {},
      timeout = 5000,
      withCredentials = false,
    } = options;

    const isGet = method === METHOD.GET;

    let query = '';

    if (isGet) {
      query = queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method!, this.corePath + url + query);

      if (withCredentials) {
        xhr.withCredentials = withCredentials;
      }

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, String(value));
      });

      xhr.addEventListener('load', () => {
        resolve(xhr);
      });

      xhr.addEventListener('abort', reject);
      xhr.addEventListener('error', reject);
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
