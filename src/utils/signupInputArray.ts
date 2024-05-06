import { InputWrapperProps } from '@/templates/input/types';

export const signupInputArray: InputWrapperProps[] = [
	{
		className: 'email',
		labelFor: 'email',
		inputType: 'email',
		labelText: 'Email',
		placeholder: 'Введите почту',
		required: true,
	},
	{
		className: 'login',
		labelFor: 'login',
		inputType: 'text',
		labelText: 'Логин',
		placeholder: 'Введите логин',
		required: true,
	},
	{
		className: 'firstName',
		labelFor: 'firstName',
		inputType: 'text',
		labelText: 'Имя',
		placeholder: 'Введите имя',
		required: true,
	},
	{
		className: 'secondName',
		labelFor: 'secondName',
		inputType: 'text',
		labelText: 'Фамилия',
		placeholder: 'Введите фамилию',
		required: true,
	},
	{
		className: 'phone',
		labelFor: 'phone',
		inputType: 'tel',
		labelText: 'Телефон',
		placeholder: 'Введите телефон',
		required: true,
	},
	{
		className: 'password',
		labelFor: 'password',
		inputType: 'password',
		labelText: 'Пароль',
		placeholder: 'Введите пароль',
		required: true,
	},
];
