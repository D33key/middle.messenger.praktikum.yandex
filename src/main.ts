import { Slowact } from '@/Templater/Slowact';
import FormWrapper from '@/components/divWithHeaderAndText';
import LabelWithInput from '@/components/labelWithInput';
import Button from '@/templates/button';
import Div from '@/templates/div';
import '@/style.css';
import { formInputs } from '@/utils/arrayOfElement';

Slowact.createRoot('#app');

Div({
	key: 'login-wrapper',
	className: 'login-wrapper',
	children: [
		FormWrapper({
			key: 'form-div-with-title',
			className: 'form-wrapper column',
			titleText: 'Вход',
			textText: 'Новый участник? ',
			isLinkInclude: true,
			linkText: 'Зарегистрируйся бесплатно',
			linkHref: '/signup',
			linkLeadToNewPage: false,
			children: [
				...formInputs.map((input) =>
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
					children: ['Войти'],
				}),
			],
		}),
	],
});

Slowact.render();
