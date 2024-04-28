import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface Div {
	key: string;
	children: SlowactProps<'div', unknown, unknown>['props']['children'][];
	className?: string;
	onClick?: EventListener;
}

const Div = ({ key, className, onClick, children }: Div) => {
	return Slowact.createElement(
		'div',
		{
			key,
			className,
			onClick,
		},
		...children,
	);
};

export default Div;
