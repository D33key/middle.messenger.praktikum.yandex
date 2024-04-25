import { Slowact } from './Templater';
import './style.css';
import Button from './templates/button';

Slowact.createRoot('.app');

Button({ children: 'click me', className: 'big-button' });

Slowact.render();
