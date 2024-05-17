import '@/styles/global.css';
import '@/styles/profile.css';
import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/changeButtons';
import ChangePassword from '@/components/userChangePassword';
import UserInfo from '@/components/userInfo';
import UserInfoInputs from '@/components/userinfoInputs';
import { Block } from '@/core/Block';
import defaultUseravatar from '@/public/defaultUserImg.png';
import Avatar from '@/templates/avatar';
import Button from '@/templates/button';
import { getDataFromObject } from '@/templates/form/utils';
import getCookie from '@/utils/getCookie';
import { render } from '@/utils/render';
import { changePasswordInputTmpl } from '../../utils/changePasswordInputs';
import { userInfoInputsObj } from '../../utils/userInfoInputs';
import { template } from './tmpl';
import { ProfilePageProps } from './types';

const changePasswordInput = new ChangePassword({
  ...changePasswordInputTmpl,
});

const changePassword = new Button({
  child: 'Изменить пароль',
  type: 'button',
  className: 'changeButton',
  events: {
    click: () => {
      userInfo.setProps({
        className: '',
      });

      signupPage.hideAndShow(
        [changeButtons, userInfoInputs],
        [changePasswordInput, saveButton],
      );
    },
  },
});

const changeButtons = new ButtonsWrapper({
  changeInfo: new Button({
    child: 'Изменить данные',
    type: 'button',
    className: 'changeButton',
    events: {
      click: () => {
        userInfo.setProps({
          className: '',
        });

        signupPage.hideAndShow([changeButtons], [saveButton]);
      },
    },
  }),
  changePassword,
  Logout: new Button({
    child: 'Выйти',
    type: 'button',
    className: 'logoutButton',
  }),
});

const userInfoInputs = new UserInfoInputs({
  ...userInfoInputsObj,
});

const saveButton = new Button({
  child: 'Сохранить',
  type: 'button',
  className: 'submitButton',
  isHide: true,
  events: {
    click: (event) => {
      const getWrapper = (event.target as HTMLElement).parentElement!;
      const getInputs = [
        ...getWrapper.querySelectorAll('.inputs-wrapper'),
      ].filter((input) => (input as HTMLElement).style.display !== 'none')[0];
      const getInputsVal = [...getInputs.querySelectorAll('input')].reduce<
        Record<string, string>
      >((acc, cur) => {
        const inputName = cur.name;
        const inputValue = cur.value;

        if (inputValue) {
          acc[inputName] = inputValue;
        }

        return acc;
      }, {});
      getDataFromObject(getInputsVal);

      userInfo.setProps({
        className: 'pointer-none',
      });

      signupPage.hideAndShow(
        [saveButton, changePasswordInput],
        [changeButtons, userInfoInputs],
      );
    },
  },
});

const userInfo = new UserInfo({
  className: 'pointer-none',
  userInfoInputs,
  changePasswordInput,
  saveButton,
});

class ProfilePage extends Block<ProfilePageProps> {
  constructor() {
    const getUserAvatar = getCookie('avatar') ?? defaultUseravatar;
    const getUsername = getCookie('username') ?? 'Аноним';
    super({
      userAvatar: new AvatarWithName({
        avatar: new Avatar({
          avatar: getUserAvatar,
          events: {
            click: (event) => {
              const getWrapper = (event.target as HTMLElement).parentElement;
              const getInput = getWrapper?.querySelector('input');

              getInput?.click();
            },
          },
        }),
        username: getUsername,
      }),
      userInfo,
      changeButtons,
    });
  }

  hideAndShow(hide: unknown[], show: unknown[]) {
    hide.forEach((block) => (block as Block<Record<string, any>>).hide());
    show.forEach((block) => (block as Block<Record<string, any>>).show());
  }

  render() {
    return this.compile(template, this.props);
  }
}

const signupPage = new ProfilePage();

document.addEventListener('DOMContentLoaded', () => {
  render('#app', signupPage);
});
