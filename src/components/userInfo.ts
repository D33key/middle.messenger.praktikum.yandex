import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import ChangePassword from './userChangePassword';
import UserInfoInputs from './userinfoInputs';

export interface UserInfoProps extends EventsProps {
  className: string;
  userInfoInputs: UserInfoInputs;
  changePasswordInput: ChangePassword;
  saveButton: Button;
}

const template = /*html*/ `<form class='userinfo-wrapper {{ className }}' novalidate>
{{ userInfoInputs }}
{{ changePasswordInput }}
{{ saveButton }}
</form>`;

export default class UserInfo extends Block<UserInfoProps> {
  constructor(props: UserInfoProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
