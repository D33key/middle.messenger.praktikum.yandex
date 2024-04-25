import { SlowactNode } from './types';

export class Slowact {
	private root: HTMLElement | null = null;

	constructor(root: HTMLElement | string, component: any) {
		if (!root) {
			throw new Error('The root should be a HTML Element.');
		}

		if (typeof root === 'string') {
			this.root = document.querySelector(root);
		} else {
			this.root = root;
		}
	}

	public createElement<T extends keyof HTMLElementTagNameMap>(
		type: SlowactNode<T>['type'],
		props: SlowactNode<T>['props'],
		children: SlowactNode<T>['props']['children'],
		isChild?: boolean,
	) {
		const headNode = document.createElement(type);

		if (props?.className) {
			headNode.classList.add(props.className);
		}

		if (props?.onClick) {
			headNode.addEventListener('click', props.onClick);
		}

		if (Array.isArray(children)) {
			children.forEach((child) => {
				const childNode = this.createElement(
					child.type,
					child.props,
					child.props.children,
					true,
				);

				headNode.append(childNode!);
			});
		}

		if (typeof children === 'string') {
			headNode.textContent = children;
		}

		if (isChild) {
			return headNode;
		} else {
			this.root?.append(headNode);
		}
	}
}
