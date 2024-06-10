import { HTTPTransport } from '.';
import { Options } from './type';

type Path = `/${string}`;

interface BaseAPIConfig {
  path?: Path;
  baseUrl?: string;
}

export interface ErrorAPI {
  reason: string;
}

type APIMethod = (endpoint: Path, options: Options) => Promise<unknown>;

export abstract class BaseAPI {
  private http: HTTPTransport;
  private defaultHeaders: Record<string, string>;

  constructor(config: BaseAPIConfig) {
    this.http = new HTTPTransport(config.path ?? '');
    this.defaultHeaders = {
      'Content-type': 'application/json; charset=UTF-8',
    };
  }

  private checkOptions(installedOptions?: Options) {
    const options = installedOptions ?? {};

    options.headers = installedOptions?.headers ?? this.defaultHeaders;

    return options;
  }

  private handleReponse(response: XMLHttpRequest) {
    if (response.response === 'OK') {
      return {
        ok: true,
      };
    }

    const parsedResponse = JSON.parse(response.response);

    return parsedResponse;
  }

  protected post: APIMethod = async (endpoint, options?: Options) => {
    const response = await this.http.post(endpoint, this.checkOptions(options));
    const data = this.handleReponse(response);

    return data;
  };
}
