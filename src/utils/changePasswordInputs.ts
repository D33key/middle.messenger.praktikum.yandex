import InputWrapper from '@/templates/input';

export const changePasswordInputTmpl = {
  passwordInput: new InputWrapper({
    classNameInput: 'userinfo',
    className: 'password',
    labelFor: 'oldPassword',
    placeholder: 'Введите старый пароль',
    inputType: 'password',
    labelText: 'Старый пароль',
    required: true,
    validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
    validationErrorText:
      'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  }),
  repeatPasswordInput: new InputWrapper({
    classNameInput: 'userinfo',
    className: 'password',
    labelFor: 'newPassword',
    placeholder: 'Введите новый пароль',
    inputType: 'password',
    labelText: 'Новый пароль',
    required: true,
    validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
    validationErrorText:
      'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  }),
};
