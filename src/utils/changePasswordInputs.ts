import InputWrapper from '@/templates/input';

export const changePasswordInput = {
	password: new InputWrapper({
		classNameInput: 'userinfo',
		className: 'password',
		labelFor: 'password',
		placeholder: 'Введите пароль',
		inputType: 'password',
		labelText: 'Пароль',
		required: true,
		validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
		validationErrorText:
			'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		events: {
			blur: (event) => {
				if ((event.target as HTMLInputElement).value === '') {
					return;
				}
				const getWrapper = (event.target as HTMLInputElement).closest(
					'.userinfo-wrapper',
				);

				const getSubmitButton = getWrapper?.querySelector('.submitButton');

				getSubmitButton?.classList.add('reject');
			},
		},
	}),
	repeatPassword: new InputWrapper({
		classNameInput: 'userinfo',
		className: 'password',
		labelFor: 'password-repeat',
		placeholder: 'Введите пароль повторно',
		inputType: 'password',
		labelText: 'Повторите пароль',
		required: true,
		validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
		validationErrorText:
			'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
		events: {
			blur: (event) => {
				const passwordValue = (event.target as HTMLInputElement).value;
				const getInputsWrapper = (event.target as HTMLInputElement).closest(
					'.userinfo-change-password',
				);

				if (getInputsWrapper) {
					const password = getInputsWrapper.querySelector(
						'#password',
					) as HTMLInputElement;

					if (password) {
						const isSimilar = passwordValue === password.value;

						const getSubmitButton =
							getInputsWrapper.parentElement?.querySelector('.submitButton');

						if (!isSimilar) {
							getSubmitButton?.classList.add('reject');
						} else {
							getSubmitButton?.classList.remove('reject');
						}
					}
				}
			},
		},
	}),
};
