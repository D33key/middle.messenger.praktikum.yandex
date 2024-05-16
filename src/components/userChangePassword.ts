import { Block } from '@/core/Block';
import InputWrapper from '@/templates/input';

interface ChangePasswordProps {
  password: InputWrapper;
  repeatPassword: InputWrapper;
}

const template = /*html*/ `<div class='inputs-wrapper userinfo-change-password'>
{{ password }}
{{ repeatPassword }}
</div>`;

export default class ChangePassword extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super(props);
    this.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
