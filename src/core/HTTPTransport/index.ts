import { METHOD, Options } from './type';
import { queryStringify } from './utils';

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout,
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
      options.timeout,
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
      options.timeout,
    );
  };

  patch: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.PATCH },
      options.timeout,
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options.timeout,
    );
  };

  private request(
    url: string,
    options: Options = { method: METHOD.GET },
    timeout: number = 5000 as number,
  ): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;

    const isGet = method === METHOD.GET;

    const query = ((isGet && queryStringify(data)) as string) ?? '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method!, url + query);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.addEventListener('load', () => {
        resolve(xhr);
      });

      xhr.addEventListener('abort', reject);
      // eslint-disable-next-line unicorn/prefer-add-event-listener
      xhr.onerror = reject;
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
