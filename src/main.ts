import { Templator } from './Templater';
import './style.css';

const TestDiv = () => {
	return `
  <div>
    <h1>Example</h1>
    ${TestBtn1()}
    ${TestBtn2()}
  </div>`;
};

const TestBtn1 = () => {
	const handleClick = (e: Event) => {
		console.log('CLICK WORKS in TestBtn1!');
	};
	return `
  <div>
    <p>Wow test1!</p>
    <button data-event="click" data-event-function='${handleClick}'>Click</button>
  </div>`;
};

const TestBtn2 = () => {
	const handleClick = (e: Event) => {
		console.log('CLICK WORKS in TestBtn2!');
	};
	return `
  <div>
    <p>Wow test2!</p>
    <button data-event="click" data-event-function='${handleClick}'>Click</button>
  </div>`;
};

const templator = new Templator(TestDiv, {});

templator.compile();
