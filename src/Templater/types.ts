export interface SlowactNode<T extends keyof HTMLElementTagNameMap> {
	type: T;
	props: MergedProps<T>;
	children?: SlowactNode<keyof HTMLElementTagNameMap>[] | string;
}

type PropsDependsOnTag<T extends keyof HTMLElementTagNameMap> =
	SlowactNode<T> extends { type: T } ? Props : never;

type Props = {
	className?: string;
	//TODO strange type
	onClick?: EventListener;
	children?: SlowactNode<keyof HTMLElementTagNameMap>[] | string;
};

type MergedProps<T extends keyof HTMLElementTagNameMap> = Props &
	PropsDependsOnTag<T>;
