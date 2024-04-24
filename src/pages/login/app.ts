import { Templator } from '../../Templater';
import { FromWrapper } from './components/FormWrapper';
import '/src/style.css';

const template = new Templator(FromWrapper);

template.compile();
