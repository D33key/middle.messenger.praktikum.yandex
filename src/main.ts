import { Slowact } from './Templater';
import './style.css';

Slowact.createRoot('.app');
Slowact.createElement(
	'div',
	{
		key: 'wrapper-bigger',
		className: 'wrapper-bigger'
	},
	Slowact.createElement(
		'div',
		{
			key: 'div-custom',
			className: 'wrapper',
		},
		'Just Text ',
		Slowact.createElement(
			'h1',
			{
				key: 'h1-custom',
				className: 'title',
			},
			'Privet',
		),
		Slowact.createElement(
			'h1',
			{
				key: 'h1-custom-1',
				className: 'title',
			},
			'Poka',
		),
		Slowact.createElement(
			'button',
			{
				key: 'button',
				className: 'button',
        onClick: (e) => console.log('Clicked works!')
			},
			'Click me',
		),
	),
);

Slowact.render();
