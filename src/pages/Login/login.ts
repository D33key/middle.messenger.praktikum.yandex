import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import Link from '@/components/link';
import TitleWithText from '@/components/titleWithText';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import { FormProps } from '@/templates/form/type';
import InputWrapper from '@/templates/input';
import { checkInput } from '@/templates/input/utils';
import { inputsVariation } from '@/utils/inputsVariation/inputsVariation';
import submitAuth from '@/utils/submitAuth';
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
          linkHref: '/sign-up',
        }),
      }),
      form: new Form({
        type: 'login',
        loginInput: new InputWrapper(inputsVariation.login),
        passwordInput: new InputWrapper(inputsVariation.password),
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
            await submitAuth(event, 'login');
          },
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
