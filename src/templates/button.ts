import { createElement } from '../Templater';
import { SlowactNode } from '../Templater/types';

interface ButtonProps {
	className?: string;
	children: SlowactNode<keyof HTMLElementTagNameMap>[] | string;
}

const Button = ({ className, children }: ButtonProps) => {
	const handleClick = (e: Event) => {
		console.log('Clicked!');
	};
	return createElement(
		'button',
		{ className: `button ${className ?? ''}`, onClick: handleClick },
		children,
	);
};

export default Button;
