import { Slowact, createElement, createState } from '../Templater';

interface ButtonProps {
	className?: string;
	children?: string[];
}

const Button = ({ className, children }: ButtonProps) => {
	const [value, changeValue] = createState<string>('button', '123');
	console.log('init',Slowact.state)

	const handleClick = (e: Event) => {
		changeValue(() => '25');
		console.log('after click', Slowact.state)
	};

	return createElement(
		'button',
		{
			key: 'button',
			className: `button ${className ?? ''}`,
			onClick: handleClick,
		},
		value,
	);
};

export default Button;
