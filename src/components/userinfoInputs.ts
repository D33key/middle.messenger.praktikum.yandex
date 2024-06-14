import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import { userInfoInputsObj } from '@/components/Inputs/userInfoInputs';

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
  constructor(props: EventsProps) {
    const propsWithInputs = {
      ...props,
      emailInput: new InputWrapper({
        ...userInfoInputsObj.emailInput,
        value: window.userInfo?.email,
      }),
      loginInput: new InputWrapper({
        ...userInfoInputsObj.loginInput,
        value: window.userInfo?.login,
      }),
      firstNameInput: new InputWrapper({
        ...userInfoInputsObj.firstNameInput,
        value: window.userInfo?.first_name,
      }),
      secondNameInput: new InputWrapper({
        ...userInfoInputsObj.secondNameInput,
        value: window.userInfo?.second_name,
      }),
      nicknameInput: new InputWrapper({
        ...userInfoInputsObj.nicknameInput,
        value: window.userInfo?.display_name,
      }),
      phoneInput: new InputWrapper({
        ...userInfoInputsObj.phoneInput,
        value: window.userInfo?.phone,
      }),
    };

    super(propsWithInputs);
  }

  render() {
    return this.compile(template, this.props);
  }
}
