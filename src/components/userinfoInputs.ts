import { Block } from '@/core/Block';
import InputWrapper from '@/templates/input';

interface ChangePasswordProps {
  email: InputWrapper;
  login: InputWrapper;
  firstName: InputWrapper;
  secondName: InputWrapper;
  nickname: InputWrapper;
  phone: InputWrapper;
}

const template = /*html*/ `<div class='inputs-wrapper userinfo-inputs'>
{{ email }}
{{ login }}
{{ firstName }}
{{ secondName }}
{{ nickname }}
{{ phone }}
</div>`;

export default class UserInfoInputs extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
