import '@/styles/login.css';
import Button from '@/templates/button/button';
import FormWrapper from '@/components/form';
import { render } from '@/utils/render';
import TitleWithText from '@/components/titleWithText';
import InputWrapper from '@/templates/input/inputWrapper';
import LoginForm from './templates/form';
import { getDataFromForm } from './templates/form/utils';

const form = new LoginForm({
	justText: 'Text',
	type: 'login',
	submitButton: new Button({
		type: 'submit',
		className: 'submitButton',
		child: 'Войти',
	}),
	emailInput: new InputWrapper({
		className: 'email',
		labelFor: 'email',
		inputType: 'email',
		labelText: 'Email',
		placeholder: 'Введите почту',
		required: true,
	}),
	passwordInput: new InputWrapper({
		className: 'password',
		labelFor: 'password',
		placeholder: 'Введите пароль',
		inputType: 'password',
		labelText: 'Пароль',
		required: true,
	}),
	events: {
		submit: getDataFromForm,
		blur: (e) => {
			if (e.target instanceof HTMLInputElement && e.target.value) {
				e.target.setAttribute('value', e.target.value);
			}
		},
	},
});

const loginForm = new FormWrapper({
	form,
	formTitle: new TitleWithText({
		formTitle: 'Вход',
		formText: 'Новый участник? ',
		linkHref: '/signup',
		linkText: 'Зарегистрируйся бесплатно',
	}),
});

document.addEventListener('DOMContentLoaded', () => {
	render('#app', loginForm);

	setTimeout(() => {
		form.setProps({
			justText: 'Changed'
		})
	}, 1000);
});
