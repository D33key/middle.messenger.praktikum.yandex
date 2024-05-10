import InputWrapper from '@/templates/input/inputWrapper';

export const signupInputObj = {
	emailInput: new InputWrapper({
		className: 'email',
		labelFor: 'email',
		inputType: 'email',
		labelText: 'Email',
		placeholder: 'Введите почту',
		required: true,
	}),
	loginInput: new InputWrapper({
		className: 'login',
		labelFor: 'login',
		inputType: 'text',
		labelText: 'Логин',
		placeholder: 'Введите логин',
		required: true,
	}),
	firstNameInput: new InputWrapper({
		className: 'firstName',
		labelFor: 'firstName',
		inputType: 'text',
		labelText: 'Имя',
		placeholder: 'Введите имя',
		required: true,
	}),
	secondNameInput: new InputWrapper({
		className: 'secondName',
		labelFor: 'secondName',
		inputType: 'text',
		labelText: 'Фамилия',
		placeholder: 'Введите фамилию',
		required: true,
	}),
	phoneInput: new InputWrapper({
		className: 'phone',
		labelFor: 'phone',
		inputType: 'tel',
		labelText: 'Телефон',
		placeholder: 'Введите телефон',
		required: true,
	}),
	passwordInput: new InputWrapper({
		className: 'password',
		labelFor: 'password',
		inputType: 'password',
		labelText: 'Пароль',
		placeholder: 'Введите пароль',
		required: true,
	}),
};
