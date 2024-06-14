import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import Link from '@/components/link';
import TitleWithText from '@/components/titleWithText';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import InputWrapper from '@/templates/input';
import { checkInput } from '@/templates/input/utils';
import { inputsVariation } from '@/utils/inputsVariation/inputsVariation';
import submitAuth from '@/utils/submit/submitAuth';
import { template } from './template';

export class LoginPage extends Block<LoginPageProps> {
  private isErrorExist = true;
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
            const formChildren = (this.children.form as Form).children;
            const isErrorExist = checkInput(event, formChildren);

            this.isErrorExist = isErrorExist;
          },
          submit: async (event) => {
            if (!this.isErrorExist) {
              await submitAuth(event, 'login');
            } else {
              event.preventDefault();
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
