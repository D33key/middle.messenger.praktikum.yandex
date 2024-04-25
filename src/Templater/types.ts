export interface SlowactProps<T extends keyof HTMLElementTagNameMap> {
	type: T;
	props: CreateElementProps & { children: string[] };
	state?: any;
}

export interface CreateElementProps {
	key: string;
	className?: string;
	onClick?: EventListener;
}
