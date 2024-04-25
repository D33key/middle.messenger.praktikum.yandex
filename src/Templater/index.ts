import { CreateElementProps, SlowactProps } from './types';

// TODO replace state in other MAP?
export class Slowact {
	private static root: HTMLElement | null = null;
	private static rootMap = new Map<
		string,
		SlowactProps<keyof HTMLElementTagNameMap> & { state?: any }
	>();
	private static dependencies: Map<
		string,
		{
			state: any;
		}
	> = new Map();

	static createState<T>(componentKey: string, valueName: string, value: T) {
		const mapElement = Slowact.rootMap.get(componentKey);

		if (!mapElement) {
			const anotherDeps = Slowact.dependencies.get(componentKey)?.state;
			Slowact.dependencies.set(componentKey, {
				state: {
					...anotherDeps,
					[valueName]: value,
				},
			});

			return [value];
		}

		if (!mapElement.state) {
			mapElement.state = {};
		}

		mapElement.state[valueName] = value;

		const changeState = Slowact.changeState(componentKey, valueName);

		console.log(valueName, [mapElement.state[valueName], changeState]);
		return [mapElement.state[valueName], changeState];
	}

	private static changeState(componentKey: string, valueName: string) {
		if (
			!Slowact.rootMap.has(componentKey) &&
			!Slowact.rootMap.get(componentKey)?.state[valueName]
		) {
			throw new Error('There is no such key.');
		}
	}

	static createRoot(root: HTMLElement | string) {
		if (this.root) {
			throw new Error('Root already exists!');
		}

		if (!root) {
			throw new Error('The root should be the HTML Element.');
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

		if (Slowact.dependencies.has(props.key)) {
			const { state } = Slowact.dependencies.get(props.key)!;
			Object.entries(state).map(([valueName, value]) => {
				Slowact.createState(props.key, valueName, value);
			});
		}

		return props.key;
	}

	private static findWrapperInMap(rootMap = this.rootMap) {
		const childKeys = new Set();
		rootMap.forEach((value) => {
			if (value.props && value.props.children) {
				value.props.children.forEach((childKey) => {
					childKeys.add(childKey);
				});
			}
		});
		for (const [key] of rootMap) {
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
		const wrapperKey = Slowact.findWrapperInMap();

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
