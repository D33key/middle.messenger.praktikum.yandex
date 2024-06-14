export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type MethodKeys = (typeof METHOD)[keyof typeof METHOD];

export interface Options {
  method?: MethodKeys;
  timeout?: number;
  headers?: Record<string, string>;
  data?:
    | { [k: string]: FormDataEntryValue | number | Array<unknown> }
    | FormData;
  withCredentials?: boolean;
  isFileAttached?: boolean;
}
