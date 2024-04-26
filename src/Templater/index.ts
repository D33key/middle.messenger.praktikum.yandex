import { StateI, effect, state } from './State';
import { SlowactProps } from './types';

//TODO replace children with object ,
//     cuz right now its complicated to add childrens

export class Slowact {
	private static root: HTMLElement | null = null;
	private static rootMap = new Map<
		string,
		SlowactProps<keyof HTMLElementTagNameMap>
	>();

	static createState<T>(initialValue: T) {
		return state(initialValue);
	}

	static changeState<T>(state: StateI<T>, rootKey: string) {
		const root = rootKey;
		return (newValue: T) => {
			state.value = newValue;
			const { type, props } = this.rootMap.get(root)!;
			const oldElement = document.querySelector(`[data-key=${root}]`);
			const newElementKey = Slowact.createElement(type, props);

			const newElement = Slowact.createElementFromMap(newElementKey);
			oldElement?.replaceWith(newElement);
		};
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
		props: SlowactProps<T>['props'],
		...children: string[]
	) {
		const isChildrenIncludes = children.length > 0 ? children : props.children;

		const correctObj = {
			type,
			props: {
				...props,
				children: isChildrenIncludes,
			},
		};
		this.rootMap.set(props.key, correctObj);
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
		element.setAttribute('data-key', key);
		//TODO make classNames static and dynamic?
		if (props?.className) {
			element.className = props.className;
		}

		if (props?.onClick) {
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
					if (typeof childKey === 'object') {
						if (childKey.value.value && childKey?.render) {
							const childElementRender = Slowact.createElementFromMap(
								childKey?.render({}),
							)!;

							element.appendChild(childElementRender);
						}
					} else {
						element.append(childKey);
					}
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
