import { ErrorAPI } from './BaseAPI';

export interface FormDataEntries {
  [k: string]: FormDataEntryValue | number;
}

export function queryStringify(data?: FormDataEntries) {
  if (typeof data !== 'object') {
    throw new TypeError('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export function isErrorAPI(response: unknown): response is ErrorAPI {
  return (response as ErrorAPI).reason !== undefined;
}
