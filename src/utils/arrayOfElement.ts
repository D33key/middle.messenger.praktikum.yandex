import { StateI } from '@/Templater/State';

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
				maxLength: '100',
				minLength: '3',
				placeholder: 'Введите пароль',
				type: 'password' as const,
				required: true,
			},
		},
	},
];

export const userInfoInputs = ({
	isDisabled,
	userFirstName,
	userSecondName,
	userEmail,
	userNickname,
	userPhone,
	userLogin,
}: {
	isDisabled: StateI<boolean>;
	userFirstName: string;
	userSecondName: string;
	userEmail: string;
	userNickname: string;
	userPhone: string;
	userLogin: string;
}) => [
	{
		wrapper: {
			wrapperKey: 'label-email-user',
			wrapperClassName: 'user-input-wrapper show',
		},
		label: {
			labelKey: 'email-label',
			labelText: 'Почта',
			labelAttributes: {
				for: 'email',
			},
		},
		input: {
			inputKey: 'email-input',
			inputClassname: 'email',
			inputAttributes: {
				name: 'email',
				id: 'email',
				autocomplete: true,
				disabled: {
					value: isDisabled,
					condition: {
						trueStatement: true,
						falseStatement: false,
					},
				},
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите почту',
				type: 'email' as const,
				required: true,
				value: userEmail,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-login-user',
			wrapperClassName: 'user-input-wrapper show',
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
				id: 'login',
				autocomplete: true,
				disabled: {
					value: isDisabled,
					condition: {
						trueStatement: true,
						falseStatement: false,
					},
				},
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите логин',
				type: 'text' as const,
				required: true,
				value: userLogin,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-name-user',
			wrapperClassName: 'user-input-wrapper show',
		},
		label: {
			labelKey: 'name-label',
			labelText: 'Имя',
			labelAttributes: {
				for: 'name',
			},
		},
		input: {
			inputKey: 'name-input',
			inputClassname: 'name',
			inputAttributes: {
				name: 'first_name',
				id: 'name',
				autocomplete: true,
				disabled: {
					value: isDisabled,
					condition: {
						trueStatement: true,
						falseStatement: false,
					},
				},
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите имя',
				type: 'text' as const,
				required: true,
				value: userFirstName,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-secondName-user',
			wrapperClassName: 'user-input-wrapper show',
		},
		label: {
			labelKey: 'secondName-label',
			labelText: 'Фамилия',
			labelAttributes: {
				for: 'secondName',
			},
		},
		input: {
			inputKey: 'secondName-input',
			inputClassname: 'secondName',
			inputAttributes: {
				name: 'second_name',
				id: 'secondName',
				autocomplete: true,
				disabled: {
					value: isDisabled,
					condition: {
						trueStatement: true,
						falseStatement: false,
					},
				},
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите фамилию',
				type: 'text' as const,
				required: true,
				value: userSecondName,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-nickname-user',
			wrapperClassName: 'user-input-wrapper show',
		},
		label: {
			labelKey: 'nickname-label',
			labelText: 'Имя в чате',
			labelAttributes: {
				for: 'nickname',
			},
		},
		input: {
			inputKey: 'nickname-input',
			inputClassname: 'nickname',
			inputAttributes: {
				name: 'display_name',
				autocomplete: true,
				id: 'nickname',
				disabled: {
					value: isDisabled,
					condition: {
						trueStatement: true,
						falseStatement: false,
					},
				},
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите имя в чате',
				type: 'text' as const,
				required: true,
				value: userNickname,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-phone-user',
			wrapperClassName: 'user-input-wrapper show',
		},
		label: {
			labelKey: 'phone-label',
			labelText: 'Телефон',
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
				disabled: {
					value: isDisabled,
					condition: {
						trueStatement: true,
						falseStatement: false,
					},
				},
				id: 'phone',
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите телефон',
				type: 'text' as const,
				required: true,
				value: userPhone,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-oldPassword-user',
			wrapperClassName: 'user-input-wrapper hide',
		},
		label: {
			labelKey: 'oldPassword-label',
			labelText: 'Старый пароль',
			labelAttributes: {
				for: 'oldPassword',
			},
		},
		input: {
			inputKey: 'oldPassword-input',
			inputClassname: 'oldPassword',
			inputAttributes: {
				name: 'oldPassword',
				autocomplete: true,
				id: 'oldPassword',
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите старый пароль',
				type: 'text' as const,
				required: true,
			},
		},
	},
	{
		wrapper: {
			wrapperKey: 'label-newPassword-user',
			wrapperClassName: 'user-input-wrapper hide',
		},
		label: {
			labelKey: 'newPassword-label',
			labelText: 'Новый пароль',
			labelAttributes: {
				for: 'newPassword',
			},
		},
		input: {
			inputKey: 'newPassword-input',
			inputClassname: 'newPassword',
			inputAttributes: {
				name: 'newPassword',
				autocomplete: true,
				id: 'newPassword',
				maxLength: '50',
				minLength: '2',
				placeholder: 'Введите новый пароль',
				type: 'text' as const,
				required: true,
			},
		},
	},
];
