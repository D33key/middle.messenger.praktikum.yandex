import { SlowactNode } from './types';

export class Slowact {
	private static root: HTMLElement | null = null;
	private static rootObj: any = {};

	static createRoot(root: HTMLElement | string) {
		if (!root) {
			throw new Error('The root should be a HTML Element.');
		}

		if (this.root) {
			throw new Error('Root already exists!');
		}

		if (typeof root === 'string') {
			Slowact.root = document.querySelector(root);
		} else {
			Slowact.root = root;
		}

		return this;
	}

	// TODO If tag is self closing - should not include children!!!
	static createElement<T extends keyof HTMLElementTagNameMap>(
		type: SlowactNode<T>['type'],
		props: Omit<SlowactNode<T>['props'], 'children'>,
		children: SlowactNode<T>['props']['children'],
	) {
		this.rootObj = {
			type,
			props: {
				...props,
			},
		};

		if (Array.isArray(children) && children.length > 0) {
			this.rootObj.props.children = children.map((child) =>
				this.createChildElement(child),
			);
		} else {
			this.rootObj.props.children = children;
		}

		return this.rootObj;
	}

	private static createChildElement<T extends keyof HTMLElementTagNameMap>({
		type,
		props,
	}: SlowactNode<T>) {
		return {
			type,
			props: { ...props },
		};
	}

	private static convertObjToHtml<T extends keyof HTMLElementTagNameMap>(
		type: SlowactNode<T>['type'],
		props: SlowactNode<T>['props'],
	) {
		const node = document.createElement(type);

		if (props?.className) {
			const splited = props.className
				.split(' ')
				.filter((splitedClass) => Boolean(splitedClass));
			node.classList.add(...splited);
		}
		if (props?.onClick) {
			node.addEventListener('click', props.onClick);
		}

		if (Array.isArray(props.children) && props.children.length > 0) {
			props.children.forEach((child) => {
				const childNode = this.convertObjToHtml(child.type, child.props);
				node.append(childNode);
			});
		}

		if (typeof props.children === 'string') {
			node.textContent = props.children;
		}

		return node;
	}

	static render() {
		const { type, props } = this.rootObj;
		const headNode = this.convertObjToHtml(type, props);

		this.root?.append(headNode);
	}
}

export function createElement<T extends keyof HTMLElementTagNameMap>(
	type: SlowactNode<T>['type'],
	props: Omit<SlowactNode<T>['props'], 'children'>,
	children: SlowactNode<T>['props']['children'],
) {
	return Slowact.createElement(type, props, children);
}
