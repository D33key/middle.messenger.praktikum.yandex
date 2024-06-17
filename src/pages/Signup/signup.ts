import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import Link from '@/components/link';
import TitleWithText from '@/components/titleWithText';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import { checkInput } from '@/templates/input/utils';
import submitAuth from '@/utils/submit/submitAuth';
import { signupInputObj } from '../../components/Inputs/signupInputArray';
import { template } from '../Login/template';

export class SingupPage extends Block<LoginPageProps> {
  private isErrorExist = true;

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
            const isErrorExist = checkInput(event, formChildren);

            this.isErrorExist = isErrorExist;
          },
          submit: async (event) => {
            if (!this.isErrorExist) {
              await submitAuth(event, 'signup');
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
