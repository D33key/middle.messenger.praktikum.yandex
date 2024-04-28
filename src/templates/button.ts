import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface ButtonProps {
	key: string;
	children: SlowactProps<'button', unknown, unknown>['props']['children'][];
	attributes: {
		type: 'submit' | 'reset' | 'button';
		name?: string;
		value?: string;
	};
	className?: string;
	onClick?: EventListener;
}

const Button = ({
	key,
	className,
	attributes,
	onClick,
	children,
}: ButtonProps) => {
	return Slowact.createElement(
		'button',
		{
			key,
			className: `button submitButton ${className ?? ''}`,
			attributes,
			onClick,
		},
		...children,
	);
};

export default Button;
