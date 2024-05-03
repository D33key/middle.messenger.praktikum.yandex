import { StateI } from './State';

interface StateValue {
	//
	value: StateI<string | number | boolean>;
	condition?: {
		falseStatment: string | Function;
		trueStatment: string | Function;
	};
}

export interface ChildrenProps {
	children?:
		| string[]
		| StateValue[]
		| (string[] | StateValue[] | undefined)[]
		| string;
}

export interface SlowactProps<
	T extends keyof HTMLElementTagNameMap,
	Variables,
	Attributes,
> {
	type: T;
	props: CreateElementProps<Variables, Attributes> & ChildrenProps;
}
interface DynamicClass {
	static: string;
	dynamic: StateValue;
}

export interface CreateElementProps<Variables, Attributes> {
	key: string;
	className?: string | DynamicClass;
	onClick?: EventListener;
	onChange?: EventListener;
	onBlur?: EventListener;
	variables?: Variables;
	attributes?: Attributes;
	isChild?: boolean;
}
