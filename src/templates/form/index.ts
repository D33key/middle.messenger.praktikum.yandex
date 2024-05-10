import { Block } from '@/Block';
import Button, { EventsProps } from '../button/button';
import InputWrapper from '../input/inputWrapper';

type BaseFormProps = {
	type: 'login' | 'signup';
	submitButton: Button;
} & EventsProps;

type LoginFormProps = {
	type: 'login';
	passwordInput: InputWrapper;
	emailInput: InputWrapper;
} & BaseFormProps;

type Signup = {
	type: 'signup';
	passwordInput: InputWrapper;
	emailInput: InputWrapper;
	loginInput: InputWrapper;
	firstNameInput: InputWrapper;
	secondNameInput: InputWrapper;
	phoneInput: InputWrapper;
} & BaseFormProps;

type Form = LoginFormProps | Signup;

const templateSignup = /*html*/ `
<form class='form-wrapper'>
	{{ emailInput }}
	{{ loginInput }}
	{{ firstNameInput }}
	{{ secondNameInput }}
	{{ phoneInput }}
	{{ passwordInput }}
	{{ submitButton }}
</form>
`;

const templateLogin = /*html*/ `
<form class='form-wrapper'>
	{{justText}}
	{{ emailInput }}
	{{ passwordInput }}
	{{ submitButton }}
</form>
`;

export default class LoginForm extends Block<Form> {
	constructor(props: Form) {
		super(props);
	}

	componentDidUpdate(newProps) {
		return true;
	}

	render() {
		if (this.props.type === 'login') {
			console.log('Render');
			return this.compile(templateLogin, this.props);
		} else {
			return this.compile(templateSignup, this.props);
		}
	}
}
