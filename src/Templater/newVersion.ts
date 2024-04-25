import { SlowactNode } from './types';

export class Slowact {
	private root: HTMLElement | null = null;
	private rootObj: any = {};

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
			this.rootObj.props.children = [];
			children.forEach((child) => {
				const childObject = this.createChildElement(child);
				this.rootObj.props.children.push(childObject);
			});
		} else {
			this.rootObj.props.children = children;
		}

		return this.rootObj;
	}

	private createChildElement<T extends keyof HTMLElementTagNameMap>({
		type,
		props,
	}: SlowactNode<T>) {
		// TODO remove any
		const childObj: any = {};
		childObj.type = type;
		childObj.props = props;

		return childObj;
	}

	private convertObjToHtml<T extends keyof HTMLElementTagNameMap>(
		type: SlowactNode<T>['type'],
		props: SlowactNode<T>['props'],
	) {
		const node = document.createElement(type);

		if (props?.className) {
			node.classList.add(props.className);
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

	public render() {
		const { type, props } = this.rootObj;
		const headNode = this.convertObjToHtml(type, props);

		this.root?.append(headNode);
	}
}
