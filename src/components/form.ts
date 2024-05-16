import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import Form from '@/templates/form';
import TitleWithText from './titleWithText';

export interface LoginPageProps extends EventsProps {
  formTitle: TitleWithText;
  form: Form;
}

const template = /*html*/ `<div class='login-wrapper'>
{{ formTitle }}
{{form}}
</div>`;

export default class FormWrapper extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
