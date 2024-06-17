import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import { checkInput } from '@/templates/input/utils';
import { changePasswordInputTmpl } from '@/utils/changePasswordInputs';
import ChangePassword from './userChangePassword';
import UserInfoInputs from './userinfoInputs';

export interface UserInfoProps extends EventsProps {
  className: string;
  userInfoInputs: UserInfoInputs;
  changePasswordInput: ChangePassword;
  saveButton: Button;
}

const template = /*html*/ `
<form class='userinfo-wrapper {{ className }}' novalidate>
  {{ userInfoInputs }}
  {{ changePasswordInput }}
  {{ saveButton }}
</form>`;

export default class UserInfo extends Block<UserInfoProps> {
  constructor(props: EventsProps) {
    const updatedProps: UserInfoProps = {
      ...props,
      className: 'pointer-none',
      userInfoInputs: new UserInfoInputs({
        events: {
          blur: (event) => {
            const formChildren = (
              this.children.userInfoInputs as UserInfoInputs
            ).children;
            checkInput(event, formChildren);
          },
        },
      }),
      changePasswordInput: new ChangePassword({
        ...changePasswordInputTmpl,
        events: {
          blur: (event) => {
            const formChildren = (
              this.children.changePasswordInput as ChangePassword
            ).children;
            checkInput(event, formChildren);
          },
        },
      }),
      saveButton: new Button({
        child: 'Сохранить',
        type: 'submit',
        className: 'submit-button',
        isHide: true,
      }),
    };
    super(updatedProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
