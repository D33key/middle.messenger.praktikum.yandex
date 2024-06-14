import '@/styles/global.css';
import '@/styles/profile.css';
import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/changeButtons';
import Link from '@/components/link';
import UserInfo from '@/components/userInfo';
import authControl from '@/core/api/Auth';
import { Block } from '@/core/Block';
import Button from '@/templates/button';
import submitProfileChange from '@/utils/submit/submitProfileChange';
import { router } from '../router';
import { template } from './tmpl';
import { ProfilePageProps } from './types';

export class ProfilePage extends Block<ProfilePageProps> {
  private typeOfChange: 'userInfo' | 'password' = 'userInfo';
  constructor() {
    super({
      backLink: new Link({
        linkClass: 'profile-link',
        linkHref: '/messenger',
        linkText: '<',
      }),
      userAvatar: new AvatarWithName(),
      userInfo: new UserInfo({
        events: {
          submit: async (event) => {
            await submitProfileChange(event, this.typeOfChange);

            (this.children.userInfo as UserInfo).setProps({
              className: 'pointer-none',
            });

            this.hideAndShow(
              [
                (this.children.userInfo as UserInfo).children.saveButton,
                (this.children.userInfo as UserInfo).children
                  .changePasswordInput,
              ],
              [
                this.children.changeButtons,
                (this.children.userInfo as UserInfo).children.userInfoInputs,
              ],
            );
          },
        },
      }),
      changeButtons: new ButtonsWrapper({
        changeInfo: new Button({
          child: 'Изменить данные',
          type: 'button',
          className: 'change-button',
          events: {
            click: () => {
              this.typeOfChange = 'userInfo';
              (this.children.userInfo as UserInfo).setProps({
                className: '',
              });

              this.hideAndShow(
                [this.children.changeButtons],
                [(this.children.userInfo as UserInfo).children.saveButton],
              );
            },
          },
        }),
        changePassword: new Button({
          child: 'Изменить пароль',
          type: 'button',
          className: 'change-button',
          events: {
            click: () => {
              this.typeOfChange = 'password';
              (this.children.userInfo as UserInfo).setProps({
                className: '',
              });

              this.hideAndShow(
                [
                  this.children.changeButtons,
                  (this.children.userInfo as UserInfo).children.userInfoInputs,
                ],
                [
                  (this.children.userInfo as UserInfo).children
                    .changePasswordInput,
                  (this.children.userInfo as UserInfo).children.saveButton,
                ],
              );
            },
          },
        }),
        Logout: new Button({
          child: 'Выйти',
          type: 'button',
          className: 'logout-button',
          events: {
            click: async () => {
              await authControl.logout();
              window.userInfo = {} as typeof window.userInfo;
              router.go('/');
            },
          },
        }),
      }),
    });
  }

  hideAndShow(hide: unknown[], show: unknown[]) {
    hide.forEach((block) => (block as Block<object>).hide());
    show.forEach((block) => (block as Block<object>).show());
  }

  render() {
    return this.compile(template, this.props);
  }
}
