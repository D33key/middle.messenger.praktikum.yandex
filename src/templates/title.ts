import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface Title {
	variant: 'h1' | 'h2' | 'h3';
	key: string;
	isChild?: boolean;
	children: SlowactProps<'div', unknown, unknown>['props']['children'][];
	className?: string;
	onClick?: EventListener;
}

const Title = ({ variant, key, className, isChild,  children, onClick }: Title) => {
	return Slowact.createElement(
		variant,
		{
			key,
			isChild,
			className,
			onClick,
		},
		...children,
	);
};

export default Title;
