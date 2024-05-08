import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface Title {
	variant: 'h1' | 'h2' | 'h3';
	key: string;
	children: SlowactProps<'div', unknown, unknown>['props']['children'][];
	className?: string;
	onClick?: EventListener;
}

const Title = ({ variant, key, className, children, onClick }: Title) => {
	return Slowact.createElement(
		variant,
		{
			key,
			className,
			onClick,
		},
		...children,
	);
};

export default Title;
