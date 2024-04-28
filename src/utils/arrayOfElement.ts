export const formInputs = [
	{
		wrapper: {
			wrapperKey: 'label-email-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'email-label',
			labelText: 'Email',
			labelAttributes: {
				for: 'email',
			},
		},
		input: {
			inputKey: 'email-input',
			inputClassname: 'email',
			inputAttributes: {
				name: 'email',
				autocomplete: true,
				disabled: false,
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите email',
				type: 'email' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-password-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'password-label',
			labelText: 'Пароль',
			labelAttributes: {
				for: 'password',
			},
		},
		input: {
			inputKey: 'password-input',
			inputClassname: 'password',
			inputAttributes: {
				name: 'password',
				autocomplete: true,
				disabled: false,
				maxLength: '100',
				minLength: '3',
				placeholder: 'Введите пароль',
				type: 'password' as const,
				required: true,
			},
		},
	},
];

export const formRegisterInputs = [
	{
		wrapper: {
			wrapperKey: 'label-email-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'email-label',
			labelText: 'Email',
			labelAttributes: {
				for: 'email',
			},
		},
		input: {
			inputKey: 'email-input',
			inputClassname: 'email',
			inputAttributes: {
				name: 'email',
				autocomplete: true,
				disabled: false,
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите email',
				type: 'email' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-login-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'login-label',
			labelText: 'Логин',
			labelAttributes: {
				for: 'login',
			},
		},
		input: {
			inputKey: 'login-input',
			inputClassname: 'login',
			inputAttributes: {
				name: 'login',
				autocomplete: true,
				disabled: false,
				maxLength: '100',
				minLength: '3',
				placeholder: 'Введите логин',
				type: 'text' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-first_name-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'first_name-label',
			labelText: 'Имя',
			labelAttributes: {
				for: 'first_name',
			},
		},
		input: {
			inputKey: 'first_name-input',
			inputClassname: 'first_name',
			inputAttributes: {
				name: 'first_name',
				autocomplete: true,
				disabled: false,
				maxLength: '100',
				minLength: '3',
				placeholder: 'Введите имя',
				type: 'text' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-second_name-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'second_name-label',
			labelText: 'Фамилия',
			labelAttributes: {
				for: 'second_name',
			},
		},
		input: {
			inputKey: 'second_name-input',
			inputClassname: 'second_name',
			inputAttributes: {
				name: 'second_name',
				autocomplete: true,
				disabled: false,
				maxLength: '100',
				minLength: '3',
				placeholder: 'Введите фамилию',
				type: 'text' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-phone-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'phone-label',
			labelText: 'Номер телефона',
			labelAttributes: {
				for: 'phone',
			},
		},
		input: {
			inputKey: 'phone-input',
			inputClassname: 'phone',
			inputAttributes: {
				name: 'phone',
				autocomplete: true,
				disabled: false,
				maxLength: '100',
				minLength: '8',
				placeholder: 'Введите номер',
				type: 'number' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-password-div',
			wrapperClassName: 'input-wrapper',
		},
		label: {
			labelKey: 'password-label',
			labelText: 'Пароль',
			labelAttributes: {
				for: 'password',
			},
		},
		input: {
			inputKey: 'password-input',
			inputClassname: 'password',
			inputAttributes: {
				name: 'password',
				autocomplete: true,
				disabled: false,
				maxLength: '100',
				minLength: '3',
				placeholder: 'Введите пароль',
				type: 'password' as const,
				required: true,
			},
		},
	},
];
