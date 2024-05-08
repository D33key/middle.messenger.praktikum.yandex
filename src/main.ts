import '@/styles/login.css';
import Button from '@/templates/button/button';
import LoginForm from '@/components/form';
import { render } from '@/utils/render';
import TitleWithText from '@/components/titleWithText';
import InputWrapper from '@/templates/input/inputWrapper';

const loginForm = new LoginForm({
	submitButton: new Button({
		type: 'button',
		child: 'Войти',
		className: '',
		events: {
			click: (event) => console.log('HELLO'),
		},
	}),
	formTitle: new TitleWithText({
		formTitle: 'Вход',
		formText: 'Новый участник? ',
		linkHref: '/signup',
		linkText: 'Зарегистрируйся бесплатно',
		events: {
			click: (e) => console.log('Click on title')
		}
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
});

document.addEventListener('DOMContentLoaded', () => {
	render('#app', loginForm);
});
