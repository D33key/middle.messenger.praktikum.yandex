import { InputWrapperProps } from '@/templates/input/types';

type InputName =
  | 'login'
  | 'password'
  | 'email'
  | 'firstName'
  | 'secondName'
  | 'phone'
  | 'nicknameInput';

export const inputsVariation: Record<InputName, InputWrapperProps> = {
  login: {
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
  },
  password: {
    className: 'password',
    labelFor: 'password',
    placeholder: 'Введите пароль',
    inputType: 'password',
    labelText: 'Пароль',
    required: true,
    validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
    validationErrorText:
      'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },
  email: {
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
  },
  firstName: {
    className: 'firstName',
    labelFor: 'first_name',
    inputType: 'text',
    labelText: 'Имя',
    placeholder: 'Введите имя',
    required: true,
    validationPattern: new RegExp(/^[A-ZА-ЯЁa-zа-яё]+(?:-[A-ZА-ЯЁa-zа-яё]+)*$/),
    validationErrorText: 'Имя содержит недопустимый символ',
  },
  secondName: {
    className: 'secondName',
    labelFor: 'second_name',
    inputType: 'text',
    labelText: 'Фамилия',
    placeholder: 'Введите фамилию',
    required: true,
    validationPattern: new RegExp(/^[A-ZА-ЯЁa-zа-яё]+(?:-[A-ZА-ЯЁa-zа-яё]+)*$/),
    validationErrorText: 'Фамилия содержит недопустимый символ',
  },
  phone: {
    className: 'phone',
    labelFor: 'phone',
    inputType: 'tel',
    labelText: 'Телефон',
    placeholder: 'Введите телефон',
    required: true,
    validationPattern: new RegExp(/^\+?\d{10,15}$/),
    validationErrorText: 'Не валидный номер',
  },
  nicknameInput: {
    classNameInput: 'userinfo',
    className: 'usernickname',
    labelFor: 'display_name',
    inputType: 'text',
    labelText: 'Имя в чате',
    placeholder: 'Введите имя в чате',
    required: true,
    validationPattern: new RegExp(/^[A-ZА-ЯЁa-zа-яё]+(?:-[A-ZА-ЯЁa-zа-яё]+)*$/),
    validationErrorText: 'Имя в чате содержит недопустимый символ',
  },
};
