interface StateValue {
	// remove any later
	value: any;
	condition?: {
		falseStatment: string | Function;
		trueStatment: string | Function;
	};
}

interface ChildrenProps {
	children?: string | StateValue;
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
	variables?: Variables;
	attributes?: Attributes;
}
