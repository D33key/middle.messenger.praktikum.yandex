import { Block } from '@/Block';
import Button from '@/templates/button/button';
import TitleWithText from '@/components/titleWithText';
import InputWrapper from '@/templates/input/inputWrapper';

interface FormProps {
	submitButton: Button;
	formTitle: TitleWithText;
	passwordInput: InputWrapper;
	emailInput: InputWrapper;
}

const template = /*html*/ `<div class='login-wrapper'>
{{ formTitle }}
<form class='form-wrapper'>
	{{ emailInput }}
	{{ passwordInput }}
	{{ submitButton }}
</form>
</div>`;

export default class LoginForm extends Block<FormProps> {
	constructor(props: FormProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
