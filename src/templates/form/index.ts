import { Block } from '@/core/Block';
import { FormProps } from './type';

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
	{{ emailInput }}
	{{ passwordInput }}
	{{ submitButton }}
</form>
`;

export default class Form extends Block<FormProps> {
	constructor(props: FormProps) {
		super(props);
	}

	render() {
		if (this.props.type === 'login') {
			return this.compile(templateLogin, this.props);
		} else {
			return this.compile(templateSignup, this.props);
		}
	}
}
