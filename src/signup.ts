import '@/styles/login.css';
import FormWrapper from './components/form';
import TitleWithText from './components/titleWithText';
import { render } from './utils/render';
import LoginForm from './templates/form';
import Button from './templates/button/button';
import { signupInputObj } from './utils/signupInputArray';
import { getDataFromForm } from './templates/form/utils';

const btn = new Button({
	type: 'submit',
	className: 'submitButton',
	child: 'Зарегистрироваться',
});

const signUpForm = new FormWrapper({
	formTitle: new TitleWithText({
		formTitle: 'Регистрация',
		formText: 'Все же есть логин? ',
		linkHref: '/',
		linkText: 'Вернуться на форму входа',
	}),
	form: new LoginForm({
		type: 'signup',
		btnText: 'Зарегистрироваться',
		...signupInputObj,
		events: {
			submit: getDataFromForm,
			blur: (e) => {
				if (e.target instanceof HTMLInputElement && e.target.value) {
					e.target.setAttribute('value', e.target.value);
				}
			},
		},
	}),
});

document.addEventListener('DOMContentLoaded', () => {
	render('#app', signUpForm);

	setTimeout(() => {
		btn.setProps({
			child: 'Время вышло',
		});
	}, 1000);
});
