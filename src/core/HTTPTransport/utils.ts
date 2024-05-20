export function queryStringify(data?: Record<string, string | number>) {
  if (typeof data !== 'object') {
    throw new TypeError('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
