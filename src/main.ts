import { Templator } from './Templater';
import './style.css';
import { DivInsideDiv } from './templates/button';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="hello">
    Static Hello
  </div>
`;

const templator = new Templator(DivInsideDiv, {});

templator.compile();
