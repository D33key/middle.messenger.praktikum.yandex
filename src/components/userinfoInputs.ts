import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';

interface ChangePasswordProps extends EventsProps {
  emailInput: InputWrapper;
  loginInput: InputWrapper;
  firstNameInput: InputWrapper;
  secondNameInput: InputWrapper;
  nicknameInput: InputWrapper;
  phoneInput: InputWrapper;
}

const template = /*html*/ `<div class='inputs-wrapper userinfo-inputs'>
{{ emailInput }}
{{ loginInput }}
{{ firstNameInput }}
{{ secondNameInput }}
{{ nicknameInput }}
{{ phoneInput }}
</div>`;

export default class UserInfoInputs extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
