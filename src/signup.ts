import '@/styles/login.css';
import Shaft from '@/Templater/Shaft';
import { InputWrapper } from '@/templates/input/inputWrapper';
import { FormTitle } from '@/templates/titleAndText/titleAndText';
import { Button } from '@/templates/button/button';
import { signupInputArray } from './utils/signupInputArray';

const template = new Shaft(`
	<div class='login-wrapper'>
	${FormTitle({
		formTitle: 'Регистрация',
		formText: 'Все же есть логин? ',
		linkHref: '/',
		linkText: 'Вернуться на форму входа',
	})}
		<form class='form-wrapper'>
			${Shaft.convertArrayToString(signupInputArray, InputWrapper)}
			${Button({
				btnText: 'Зарегистрироваться',
				className: 'submitButton',
				type: 'submit',
			})}
		</form>
	</div>
`);

document.addEventListener('DOMContentLoaded', () => {
	template.render('#app');
});
