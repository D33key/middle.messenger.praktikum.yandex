import { CreateElementProps, SlowactProps } from './types';

export class Slowact {
	private static root: HTMLElement | null = null;
	private static rootMap = new Map<
		string,
		SlowactProps<keyof HTMLElementTagNameMap>
	>();

	static state = new Map<string, { prevState: any; newState: any }>();

	static createState<T>(componentKey: string, value: T) {
		Slowact.state.set(componentKey, {
			prevState: value,
			newState: value,
		});
		const changeValue = Slowact.changeState(componentKey);
		const valueToSend = Slowact.state.get(componentKey)!;

		return [valueToSend.newState, changeValue] as [
			typeof value,
			typeof changeValue,
		];
	}

	private static changeState(componentKey: string) {
		if (!Slowact.state.has(componentKey)) {
			throw new Error('There is no such key.');
		}
		const componentInState = componentKey;
		const prevState = Slowact.state.get(componentKey)?.prevState;

		return function (fn: any) {
			const resultFromFunc = fn();
			Slowact.state.set(componentInState, {
				prevState,
				newState: resultFromFunc,
			});
		};
	}

	//make rerender after changeState!

	static createRoot(root: HTMLElement | string) {
		if (this.root) {
			throw new Error('Root already exists!');
		}

		if (!root) {
			throw new Error('The root should be a HTML Element.');
		}

		if (typeof root === 'string') {
			Slowact.root = document.querySelector(root);
		} else {
			Slowact.root = root;
		}

		return this;
	}

	static createElement<T extends keyof HTMLElementTagNameMap>(
		type: T,
		props: CreateElementProps,
		...children: string[]
	) {
		this.rootMap.set(props.key, {
			type,
			props: {
				...props,
				children: children,
			},
		});

		return props.key;
	}

	private static findWrapper() {
		const childKeys = new Set();
		this.rootMap.forEach((value, key) => {
			if (value.props && value.props.children) {
				value.props.children.forEach((childKey) => {
					childKeys.add(childKey);
				});
			}
		});
		for (const [key] of this.rootMap) {
			if (!childKeys.has(key)) {
				return key;
			}
		}
		return null;
	}

	private static createElementFromMap(key: string) {
		const item = this.rootMap.get(key);

		if (!item) {
			return null;
		}

		const { type, props } = item;
		const element = document.createElement(type);

		if (props?.className) {
			element.className = props.className;
		}

		if (props?.onClick) {
			// TODO stop propagation
			element.addEventListener('click', props.onClick);
		}

		if (props.children) {
			props.children.forEach((childKey) => {
				if (this.rootMap.has(childKey)) {
					const childElement = Slowact.createElementFromMap(childKey);
					if (childElement) {
						element.appendChild(childElement);
					}
				} else {
					element.textContent = childKey;
				}
			});
		}

		return element;
	}

	static render() {
		const wrapperKey = Slowact.findWrapper();

		if (!wrapperKey) {
			throw new Error('Root element not found.');
		}

		const wrapperElement = Slowact.createElementFromMap(wrapperKey);

		if (!wrapperElement) {
			throw new Error('Cannot create wrapper element');
		}

		Slowact.root?.append(wrapperElement);
	}
}

export function createElement<T extends keyof HTMLElementTagNameMap>(
	type: T,
	props: CreateElementProps,
	...children: string[]
) {
	return Slowact.createElement(type, props, ...children);
}

export function createState<T>(componentKey: string, value: T) {
	return Slowact.createState(componentKey, value);
}
