import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import Link from '@/components/link';
import TitleWithText from '@/components/titleWithText';
import { Toaster } from '@/components/Toaster';
import authControl from '@/core/api/Auth';
import { Block } from '@/core/Block';
import { OKResponse } from '@/core/HTTPTransport/BaseAPI';
import Button from '@/templates/button';
import Form from '@/templates/form';
import { FormProps } from '@/templates/form/type';
import { getDataFromForm } from '@/templates/form/utils';
import InputWrapper from '@/templates/input';
import { checkInput } from '@/templates/input/utils';
import { router } from '../router';
import { template } from './template';

export class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      formTitle: new TitleWithText({
        formTitle: 'Вход',
        formText: 'Новый участник? ',
        link: new Link({
          linkClass: 'login-link',
          linkText: 'Зарегистрироваться',
          events: {
            click: () => router.go('/sign-up'),
          },
        }),
      }),
      form: new Form({
        type: 'login',
        emailInput: new InputWrapper({
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
        passwordInput: new InputWrapper({
          className: 'password',
          labelFor: 'password',
          placeholder: 'Введите пароль',
          inputType: 'password',
          labelText: 'Пароль',
          required: true,
          validationPattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/),
          validationErrorText:
            'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        }),
        submitButton: new Button({
          child: 'Вход',
          type: 'submit',
          className: 'submit-button',
        }),
        events: {
          blur: (event) => {
            const formChildren = (this.children.form as Block<FormProps>)
              .children;
            checkInput(event, formChildren);
          },
          submit: async (event) => {
            const formData = getDataFromForm(event);

            if (!formData) return;

            try {
              const isAllowed = await authControl.logIn<OKResponse>(formData);

              if (isAllowed.ok) {
                router.go('/');
              }
            } catch (error) {
              new Toaster({
                title: 'Ошибка',
                text: error as string,
              }).renderInRoot();
            }
          },
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
