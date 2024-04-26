import { Slowact } from '../Templater';
import { state } from '../Templater/State';

interface ButtonProps {
	className?: string;
	children?: string[];
}

// {
// 	className: {
// 		static: 'button button-primary',
// 		dynamic: [someVarialbes]
// 	}
// }

const Button = ({ className, children }: ButtonProps) => {
	// const value = Slowact.createState('Click me');
	// const value1 = Slowact.createState('23');
	// const func = Slowact.changeState(value, 'btn');

	return Slowact.createElement(
		'button',
		{
			key: 'btn',
			className: `button ${className ?? ''}`,
			// onClick: () => {
			// 	func('You clicked');
			// }
		},
		// {
		// 	value,
		// },
		', Dima',
	);
};

export default Button;
