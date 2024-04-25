import { Slowact } from './Templater/newVersion';
import './style.css';

const slowact = new Slowact('.app', '');

slowact.createElement('div', { className: 'wrapper' }, [
	slowact.createElement('h1', { className: 'title' }, [
		slowact.createElement('span', { className: 'spanFirst' }, 'Privet'),
		slowact.createElement('span', { className: 'spanSecond' }, ', Dima'),
	]),
]);

slowact.render();
