import { Block } from '@/Block';

export function render<T extends Block<any>>(query: string, block: T) {
	const root = document.querySelector(query);

	if (!root) throw new Error('There is no such root');

	root.appendChild(block.getContent()!);

	// block.dispatchComponentDidMount();

	return root;
}
