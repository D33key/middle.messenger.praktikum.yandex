import { Templator } from './Templater';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    Hello
  </div>
`;

const templateString = `
  <div class='{{wrapper}}'>
    <p>Privet, {{name}}</p>
    <button>{{btnText}}</button>
  </div>
`;

const templator = new Templator(templateString, {
	wrapper: 'wrapper',
	name: 'Dima',
	btnText: 'Click me',
});


const smt = templator.compile();
