import '@/styles/login.css';
import Shaft from '@/Templater/Shaft';
import { InputWrapper } from '@/templates/input/inputWrapper';
import { FormTitle } from '@/templates/titleAndText/titleAndText';
import { Button } from '@/templates/button/button';

const template = new Shaft(`
	<div class='login-wrapper'>
	${FormTitle({
		formTitle: 'Вход',
		formText: 'Новый участник? ',
		linkHref: '/signup',
		linkText: 'Зарегистрируйся бесплатно',
	})}
		<form class='form-wrapper'>
			${InputWrapper({
				className: 'email',
				labelFor: 'email',
				inputType: 'email',
				labelText: 'Email',
				placeholder: 'Введите почту',
				required: true,
			})}
			${InputWrapper({
				className: 'password',
				labelFor: 'password',
				placeholder: 'Введите пароль',
				inputType: 'password',
				labelText: 'Пароль',
				required: true,
			})}
			${Button({
				btnText: 'Войти',
				className: 'submitButton',
				type: 'submit',
			})}
		</form>
	</div>
`);

document.addEventListener('DOMContentLoaded', () => {
	template.render('#app');
});
