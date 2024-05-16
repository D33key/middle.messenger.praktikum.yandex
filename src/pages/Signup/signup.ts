import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import TitleWithText from '@/components/titleWithText';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import { FormProps } from '@/templates/form/type';
import { getDataFromForm } from '@/templates/form/utils';
import { checkInput } from '@/templates/input/utils';
import { render } from '../../utils/render';
import { signupInputObj } from '../../utils/signupInputArray';
import { template } from '../Login/template';

class SingupPage extends Block<LoginPageProps> {
  constructor() {
    super({
      formTitle: new TitleWithText({
        formTitle: 'Регистрация',
        formText: 'Или у вас есть логин? ',
        linkHref: '/login',
        linkText: 'Войти в систему',
      }),
      form: new Form({
        type: 'signup',
        ...signupInputObj,
        submitButton: new Button({
          child: 'Регистрация',
          type: 'submit',
          className: 'submitButton',
        }),
        events: {
          blur: (event) => {
            const formChildren = (this.children.form as Block<FormProps>)
              .children;
            checkInput(event, formChildren);
          },
          submit: getDataFromForm,
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const signupPage = new SingupPage();
  render('#app', signupPage);
});
