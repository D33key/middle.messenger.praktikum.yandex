import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import Link from '@/components/link';
import TitleWithText from '@/components/titleWithText';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import { checkInput } from '@/templates/input/utils';
import submitAuth from '@/utils/submitAuth';
import { signupInputObj } from '../../utils/signupInputArray';
import { template } from '../Login/template';

export class SingupPage extends Block<LoginPageProps> {
  constructor() {
    super({
      formTitle: new TitleWithText({
        formTitle: 'Регистрация',
        formText: 'Или у вас есть логин? ',
        link: new Link({
          linkClass: 'login-link',
          linkText: 'Войти в систему',
          linkHref: '/',
        }),
      }),
      form: new Form({
        type: 'signup',
        ...signupInputObj,
        submitButton: new Button({
          child: 'Регистрация',
          type: 'submit',
          className: 'submit-button',
        }),
        events: {
          blur: (event) => {
            const formChildren = (this.children.form as Form).children;
            checkInput(event, formChildren);
          },
          submit: async (event) => {
            await submitAuth(event, 'signup');
          },
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
