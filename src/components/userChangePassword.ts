import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';

interface ChangePasswordProps extends EventsProps {
  passwordInput: InputWrapper;
  repeatPasswordInput: InputWrapper;
}

const template = /*html*/ `<div class='inputs-wrapper userinfo-change-password'>
{{ passwordInput }}
{{ repeatPasswordInput }}
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
