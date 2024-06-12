import '@/styles/global.css';
import '@/styles/profile.css';
import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/changeButtons';
import { Toaster } from '@/components/Toaster';
import ChangePassword from '@/components/userChangePassword';
import UserInfo from '@/components/userInfo';
import UserInfoInputs from '@/components/userinfoInputs';
import authControl from '@/core/api/Auth';
import userControl from '@/core/api/User';
import { Block } from '@/core/Block';
import defaultUseravatar from '@/public/defaultUserImg.png';
import Avatar from '@/templates/avatar';
import Button from '@/templates/button';
import { getDataFromForm } from '@/templates/form/utils';
import InputWrapper from '@/templates/input';
import { InputWrapperProps } from '@/templates/input/types';
import { checkInput } from '@/templates/input/utils';
import { changePasswordInputTmpl } from '../../utils/changePasswordInputs';
import { userInfoInputsObj } from '../../utils/userInfoInputs';
import { router } from '../router';
import { template } from './tmpl';
import { ProfilePageProps } from './types';

export class ProfilePage extends Block<ProfilePageProps> {
  private typeOfChange: 'password' | 'userInfo' = 'userInfo';
  private saveButton = new Button({
    child: 'Сохранить',
    type: 'submit',
    className: 'submit-button',
    isHide: true,
  });

  private userInfoInputs = new UserInfoInputs({
    ...Object.entries(userInfoInputsObj()).reduce(
      (acc, [key, value]) => {
        acc[key as keyof ReturnType<typeof userInfoInputsObj>] =
          new InputWrapper(value as InputWrapperProps);
        return acc;
      },
      {} as Record<keyof ReturnType<typeof userInfoInputsObj>, InputWrapper>,
    ),
    events: {
      blur: (event) => {
        const formChildren = this.userInfoInputs.children;
        checkInput(event, formChildren);
      },
    },
  });

  private changePassword = new Button({
    child: 'Изменить пароль',
    type: 'button',
    className: 'change-button',
    events: {
      click: () => {
        this.typeOfChange = 'password';
        this.userInfo.setProps({
          className: '',
        });

        signupPage.hideAndShow(
          [this.changeButtons, this.userInfoInputs],
          [this.changePasswordInput, this.saveButton],
        );
      },
    },
  });

  private changePasswordInput = new ChangePassword({
    ...changePasswordInputTmpl,
    events: {
      blur: (event) => {
        const formChildren = this.changePasswordInput.children;
        checkInput(event, formChildren);
      },
    },
  });

  private userInfo = new UserInfo({
    className: 'pointer-none',
    userInfoInputs: this.userInfoInputs,
    changePasswordInput: this.changePasswordInput,
    saveButton: this.saveButton,
    events: {
      submit: async (event) => {
        event.preventDefault();
        const formData = getDataFromForm(event);

        if (!formData) return;

        try {
          if (this.typeOfChange === 'userInfo') {
            const userInfo = await userControl.changeProfile(formData);

            window.userInfo = userInfo;
          } else {
            await userControl.changePassword(formData);
            new Toaster({
              title: 'Ошибка',
              text: 'Пароль успешно изменен',
              reason: 'info',
            }).renderInRoot();
          }
        } catch (error) {
          new Toaster({
            title: 'Ошибка',
            text: error as string,
          }).renderInRoot();
        } finally {
          this.userInfo.setProps({
            className: 'pointer-none',
          });

          signupPage.hideAndShow(
            [this.saveButton, this.changePasswordInput],
            [this.changeButtons, this.userInfoInputs],
          );
        }
      },
    },
  });

  private changeButtons = new ButtonsWrapper({
    changeInfo: new Button({
      child: 'Изменить данные',
      type: 'button',
      className: 'change-button',
      events: {
        click: () => {
          this.typeOfChange = 'userInfo';
          this.userInfo.setProps({
            className: '',
          });

          signupPage.hideAndShow([this.changeButtons], [this.saveButton]);
        },
      },
    }),
    changePassword: this.changePassword,
    Logout: new Button({
      child: 'Выйти',
      type: 'button',
      className: 'logout-button',
      events: {
        click: async () => {
          await authControl.logout();
          window.userInfo = {};
          router.go('/login');
        },
      },
    }),
  });

  private avatar = new Avatar({
    avatar: window.userInfo?.avatar
      ? import.meta.env.VITE_HOST_URL_RESOURCE + window.userInfo?.avatar
      : defaultUseravatar,
    events: {
      click: (event) => {
        const getWrapper = (event.target as HTMLElement).parentElement;
        const getInput = getWrapper?.querySelector('input');

        getInput?.click();
      },
    },
  });

  constructor() {
    super();

    const data = window.userInfo ?? {};
    const getUsername =
      data.display_name || data.first_name + data.second_name || 'Аноним';

    this.setChildren({
      userAvatar: new AvatarWithName({
        avatar: this.avatar,
        inputFile: new InputWrapper({
          inputType: 'file',
          labelFor: 'avatar',
          className: 'avatar-input',
          events: {
            change: async (event) => {
              const formData = new FormData();
              const file = (event.target as HTMLInputElement).files?.[0];

              if (file) {
                formData.append('avatar', file);
                try {
                  const userInfo = await userControl.changeAvatar(formData);

                  window.userInfo = userInfo;

                  this.avatar.setProps({
                    avatar:
                      import.meta.env.VITE_HOST_URL_RESOURCE + userInfo.avatar,
                  });
                } catch (error) {
                  new Toaster({
                    title: 'Ошибка',
                    text: error as string,
                  }).renderInRoot();
                }
              } else {
                new Toaster({
                  title: 'Ошибка',
                  text: 'Не удалось загрузить картинку!',
                }).renderInRoot();
              }
            },
          },
        }),
        username: getUsername,
      }),
      userInfo: this.userInfo,
      changeButtons: this.changeButtons,
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
