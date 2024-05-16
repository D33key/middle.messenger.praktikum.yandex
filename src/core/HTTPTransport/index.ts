import { METHOD, Options } from './type';
import { queryStringify } from './utils';

export class HTTPTransport {
  get(url: string, options: Options['data'] = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: Options['data'] = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: Options['data'] = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  patch(url: string, options: Options['data'] = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PATCH });
  }

  delete(url: string, options: Options['data'] = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  private request(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<XMLHttpRequest> {
    const { method, data, headers = {}, timeout = 5000 } = options;

    const isGet = method === METHOD.GET;

    const query = ((isGet && queryStringify(data)) as string) ?? '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + query);

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
