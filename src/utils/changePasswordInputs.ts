import InputWrapper from '@/templates/input';

export const changePasswordInputTmpl = {
  passwordInput: new InputWrapper({
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

        const wrapper = (event.target as HTMLInputElement).closest(
          '.userinfo-wrapper',
        );

        const submit-button = wrapper?.querySelector('.submit-button');

        submit-button?.classList.add('reject');
      },
    },
  }),
  repeatPasswordInput: new InputWrapper({
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
        const inputsWrapper = (event.target as HTMLInputElement).closest(
          '.userinfo-change-password',
        );

        if (inputsWrapper) {
          const password = inputsWrapper.querySelector('#password');

          if (password && password instanceof HTMLInputElement) {
            const isSimilar = passwordValue === password.value;

            const submit-button =
              inputsWrapper.parentElement?.querySelector('.submit-button');

            if (!isSimilar) {
              submit-button?.classList.add('reject');
            } else {
              submit-button?.classList.remove('reject');
            }
          }
        }
      },
    },
  }),
};
