export interface SlowactNode<T extends keyof HTMLElementTagNameMap> {
	type: T;
	props: MergedProps<T>;
}

type PropsDependsOnTag<T extends keyof HTMLElementTagNameMap> =
	SlowactNode<T> extends { type: T } ? Props : never;

type Props = {
	className?: string;
	onClick?: EventListenerOrEventListenerObject;
	children?: SlowactNode<keyof HTMLElementTagNameMap>[] | string;
};

type MergedProps<T extends keyof HTMLElementTagNameMap> = Props &
	PropsDependsOnTag<T>;
