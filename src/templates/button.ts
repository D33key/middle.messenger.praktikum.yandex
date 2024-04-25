import { Slowact } from '../Templater';

interface ButtonProps {
	className?: string;
	children?: string[];
}

const Button = ({ className, children }: ButtonProps) => {
	const [value, changeValue] = Slowact.createState<string>(
		'button',
		'btn-value',
		'123',
	);
	const [value1, changeValue1] = Slowact.createState<string>(
		'button',
		'title-value',
		'Privet',
	);

	function handleClick(e: Event) {
		changeValue(() => '25');
	}

	return Slowact.createElement(
		'button',
		{
			key: 'button',
			className: `button ${className ?? ''}`,
			onClick: handleClick,
		},
		'123',
	);
};

export default Button;
