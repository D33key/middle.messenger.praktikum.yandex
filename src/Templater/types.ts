export interface SlowactProps<T extends keyof HTMLElementTagNameMap> {
	type: T;
	props: CreateElementProps & { children?: string[] };
}

export interface CreateElementProps {
	key: string;
	className?: string;
	onClick?: EventListener;

	variables?: Record<string, any>;
}
