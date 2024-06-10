import { Block } from '@/core/Block';

export function render<T extends Block<any> | Element>(
  query: string,
  block: T,
) {
  const root = document.querySelector(query);

  if (!root) throw new Error('There is no such root');

  if (block instanceof Element) {
    root.append(block);
    return root;
  }

  root.append((block as Block<any>).getContent()!);

  (block as Block<any>).dispatchComponentDidMount();

  return root;
}
