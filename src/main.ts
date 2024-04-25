import { Slowact } from './Templater';
import './style.css';
import Button from './templates/button';

Slowact.createRoot('.app');

Slowact.createElement(
	'div',
	{
		key: 'wrapper-bigger',
		className: 'wrapper-bigger',
	},
	'Privet',
	Button({}),
);

Slowact.render();
