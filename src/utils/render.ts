import { Block } from '@/core/Block';

export function render<T extends Block<any>>(query: string, block: T) {
  const root = document.querySelector(query);

  if (!root) throw new Error('There is no such root');

  root.append(block.getContent()!);

  block.dispatchComponentDidMount();

  return root;
}
