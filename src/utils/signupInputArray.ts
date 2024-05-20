import InputWrapper from '@/templates/input';

export const signupInputObj = {
  emailInput: new InputWrapper({
    className: 'email',
    labelFor: 'email',
    inputType: 'email',
    labelText: 'Email',
    placeholder: 'Введите почту',
    required: true,
    validationPattern: new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ),
    validationErrorText: 'Не валидная почта',
  }),
  loginInput: new InputWrapper({
    className: 'login',
    labelFor: 'login',
    inputType: 'text',
    labelText: 'Логин',
    placeholder: 'Введите логин',
    required: true,
    validationPattern: new RegExp(
      /^(?=.*[a-zA-Z])(?!^\d+$)[a-zA-Z0-9-_]{3,20}$/,
    ),
    validationErrorText:
      'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  }),
  firstNameInput: new InputWrapper({
    className: 'firstName',
    labelFor: 'firstName',
    inputType: 'text',
    labelText: 'Имя',
    placeholder: 'Введите имя',
    required: true,
    validationPattern: new RegExp(/^[A-ZА-ЯЁa-zа-яё]+(?:-[A-ZА-ЯЁa-zа-яё]+)*$/),
    validationErrorText: 'Имя содержит недопустимый символ',
  }),
  secondNameInput: new InputWrapper({
    className: 'secondName',
    labelFor: 'secondName',
    inputType: 'text',
    labelText: 'Фамилия',
    placeholder: 'Введите фамилию',
    required: true,
    validationPattern: new RegExp(/^[A-ZА-ЯЁa-zа-яё]+(?:-[A-ZА-ЯЁa-zа-яё]+)*$/),
    validationErrorText: 'Фамилия содержит недопустимый символ',
  }),
  phoneInput: new InputWrapper({
    className: 'phone',
    labelFor: 'phone',
    inputType: 'tel',
    labelText: 'Телефон',
    placeholder: 'Введите телефон',
    required: true,
    validationPattern: new RegExp(/^\+?\d{10,15}$/),
    validationErrorText: 'Не валидный номер',
  }),
  passwordInput: new InputWrapper({
    className: 'password',
    labelFor: 'password',
    placeholder: 'Введите пароль',
    inputType: 'password',
    labelText: 'Пароль',
    required: true,
    validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
    validationErrorText:
      'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  }),
};
