import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import TitleWithText from '@/components/titleWithText';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import InputWrapper from '@/templates/input';
import { checkInput } from '@/templates/input/utils';
import { render } from '@/utils/render';
import { template } from './template';
import { getDataFromForm } from '@/templates/form/utils';

class LoginPage extends Block<LoginPageProps> {
	constructor() {
		super({
			formTitle: new TitleWithText({
				formTitle: 'Вход',
				formText: 'Новый участник? ',
				linkHref: '/signup',
				linkText: 'Зарегистрируйся бесплатно',
			}),
			form: new Form({
				type: 'login',
				emailInput: new InputWrapper({
					className: 'email',
					labelFor: 'email',
					inputType: 'email',
					labelText: 'Email',
					placeholder: 'Введите почту',
					required: true,
					validationPattern: new RegExp(
						/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
					),
					validationErrorText: 'Не валидная почта',
				}),
				passwordInput: new InputWrapper({
					className: 'password',
					labelFor: 'password',
					placeholder: 'Введите пароль',
					inputType: 'password',
					labelText: 'Пароль',
					required: true,
					validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
					validationErrorText:
						'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
				}),
				submitButton: new Button({
					child: 'Вход',
					type: 'submit',
					className: 'submitButton',
				}),
				events: {
					blur: (event) => {
						const formChildren = this.children.form.children;
						checkInput(event, formChildren);
					},
					submit: getDataFromForm,
				},
			}),
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const loginPage = new LoginPage();

	render('#app', loginPage);
});
