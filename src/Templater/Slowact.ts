import { StateI, state } from '@/Templater/State';
import { SlowactProps } from '@/Templater/types';

export class Slowact {
	private static root: HTMLElement | null = null;
	private static rootMap = new Map<
		string,
		SlowactProps<keyof HTMLElementTagNameMap, unknown, unknown>
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
			oldElement?.replaceWith(newElement!);
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

	static createElement<T extends keyof HTMLElementTagNameMap, U, E>(
		type: T,
		props: SlowactProps<T, U, E>['props'],
		...children: SlowactProps<T, U, E>['props']['children'][]
	) {
		const isChildrenIncludes = children.length > 0 ? children : props.children;

		const correctObj = {
			type,
			props: {
				...props,
				children: isChildrenIncludes,
			},
		};
		//@ts-ignore
		this.rootMap.set(props.key, correctObj);
		return props.key;
	}

	private static findWrapperInMap(rootMap = this.rootMap) {
		const childKeys = new Set();
		rootMap.forEach((value) => {
			if (value.props && value.props.children) {
				//@ts-ignore
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

		if (props?.className) {
			if (typeof props.className === 'string') {
				element.className = props.className;
			} else {
				const staticValue = props.className.static;
				const dynamicValue = props.className.dynamic.value.value;

				element.className = `${staticValue} ${dynamicValue}`;
			}
		}

		if (props.attributes) {
			const keyVal = Object.entries(props.attributes);

			keyVal.forEach(([key, value]) => {
				if (typeof value === 'object') {
					if (value.value.value) {
						//@ts-ignore
						element[key] = value.condition.trueStatement;
					} else {
						//@ts-ignore
						element[key] = value.condition.falseStatement;
					}
				} else {
					//@ts-ignore
					element[key] = value;
				}
			});
		}

		if (props?.onClick) {
			element.addEventListener('click', props.onClick);
		}

		if (props.children) {
			//@ts-ignore
			props.children.forEach((childKey) => {
				if (this.rootMap.has(childKey)) {
					const childElement = Slowact.createElementFromMap(childKey);
					if (childElement) {
						element.appendChild(childElement);
					}
				} else {
					Slowact.appendObjectOrText(childKey, element);
				}
			});
		}

		return element;
	}

	static appendObjectOrText(childKey: any, element: any) {
		if (typeof childKey === 'object') {
			if (childKey.value && childKey?.condition) {
				if (childKey.value.value) {
					if (typeof childKey.condition.trueStatment === 'string') {
						element.append(childKey.condition.trueStatment);
					} else {
						const childElementRender = Slowact.createElementFromMap(
							childKey.condition.trueStatment(),
						)!;

						element.appendChild(childElementRender);
					}
				} else {
					if (typeof childKey.condition.falseStatment === 'string') {
						element.append(childKey.condition.falseStatment);
					} else {
						const childElementRender = Slowact.createElementFromMap(
							childKey.condition.falseStatment(),
						)!;

						element.appendChild(childElementRender);
					}
				}
			}
		} else {
			element.append(childKey);
		}
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
