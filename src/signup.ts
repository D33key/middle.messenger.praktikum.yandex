import { Slowact } from '@/Templater/Slowact';
import FormWrapper from '@/templates/formWrapper';
import LabelWithInput from '@/templates/labelWithInput';
import '@/style.css';
import Button from '@/templates/button';
import Div from '@/templates/div';
import { formRegisterInputs } from '@/utils/arrayOfElement';

Slowact.createRoot('#app');

Div({
	key: 'login-wrapper',
	className: 'login-wrapper',
	children: [
		FormWrapper({
			key: 'form-div-with-title',
			className: 'form-wrapper',
			isTitleExist: true,
			titleText: 'Регистрация',
			textText: 'Или у вас есть логин? ',
			isLinkInclude: true,
			linkText: 'Войти в систему',
			linkHref: '/',
			linkLeadToNewPage: false,
			children: [
				...formRegisterInputs.map((input) =>
					LabelWithInput({
						wrapper: input.wrapper,
						label: input.label,
						input: input.input,
					}),
				),
				Button({
					key: 'submit-button',
					attributes: {
						type: 'submit',
					},
					children: ['Зарегистрироваться'],
				}),
			],
		}),
	],
});

Slowact.render();
