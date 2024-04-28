import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface Link {
	key: string;
	children: SlowactProps<
		'div',
		unknown,
		Record<string, string>
	>['props']['children'][];
	className?: string;
	attributes: Record<string, string>;
	onClick?: EventListener;
}

const Link = ({ key, children, className, onClick, attributes }: Link) => {
	return Slowact.createElement(
		'a',
		{
			key,
			className,
			attributes,
			onClick,
		},
		...children,
	);
};

export default Link;
