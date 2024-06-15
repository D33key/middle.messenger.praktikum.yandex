import { Block, TypeOfProps } from '@/core/Block';

export function render<T extends Block<TypeOfProps> | Element>(
  query: string,
  block: T,
) {
  const root = document.querySelector(query);

  if (!root) throw new Error('There is no such root');

  if (block instanceof Element) {
    root.append(block);
    return root;
  }

  root.append((block as Block<TypeOfProps>).getContent()!);

  (block as Block<TypeOfProps>).dispatchComponentDidMount();

  return root;
}
