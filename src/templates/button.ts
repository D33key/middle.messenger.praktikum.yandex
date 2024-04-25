import { createElement } from '../Templater';
import { SlowactNode } from '../Templater/types';

interface ButtonProps {
	className?: string;
	children: SlowactNode<keyof HTMLElementTagNameMap>[] | string;
}

const Button = ({ className, children }: ButtonProps) => {
	return createElement(
		'button',
		{ className: `button ${className ?? ''}` },
		children,
	);
};

export default Button;
