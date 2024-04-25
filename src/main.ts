import { Slowact } from './Templater/newVersion';
import './style.css';

const slowact = new Slowact('#app', '');

slowact.createElement('div', { className: 'wrapper' }, [
	{
    type: 'h1',
    props: {
      className: 'title',
      children: [
        {
          type: 'span',
          props: {
            className: 'span',
            children: 'Privet'
          }
        },
        {
          type: 'span',
          props: {
            className: 'secondSpan',
            children: ', Dima'
          }
        }
      ]
    },
  },
]);


