import '@/styles/login.css';
import { LoginPageProps } from '@/components/form';
import Link from '@/components/link';
import TitleWithText from '@/components/titleWithText';
import authControl from '@/core/api/Auth';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import Form from '@/templates/form';
import { getDataFromForm } from '@/templates/form/utils';
import { checkInput } from '@/templates/input/utils';
import { signupInputObj } from '../../utils/signupInputArray';
import { template } from '../Login/template';
import { router } from '../router';

const form = new Form({
  type: 'signup',
  ...signupInputObj,
  submitButton: new Button({
    child: 'Регистрация',
    type: 'submit',
    className: 'submit-button',
  }),
  events: {
    blur: (event) => {
      const formChildren = form.children;
      checkInput(event, formChildren);
    },
    submit: async (event) => {
      const formData = getDataFromForm(event);

      if (!formData) return;

      try {
        const response = await authControl.signup<{ id: number }>(formData);

        if (response.id) {
          router.go('/');
        }
      } catch (error) {
        console.log('heeeeloooo', error);
      }
    },
  },
});

export class SingupPage extends Block<LoginPageProps> {
  constructor() {
    super({
      formTitle: new TitleWithText({
        formTitle: 'Регистрация',
        formText: 'Или у вас есть логин? ',
        link: new Link({
          linkClass: 'login-link',
          linkText: 'Войти в систему',
          events: {
            click: () => router.go('/login'),
          },
        }),
      }),
      form,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
