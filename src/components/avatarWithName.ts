import defaultUseravatar from '@/assets/defaultUserImg.png';
import userControl from '@/core/api/User';
import { Block } from '@/core/Block';
import Avatar from '@/templates/avatar';
import { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import { Toaster } from './Toaster';

interface AvatarWithNameProps extends EventsProps {
  avatar: Avatar;
  username: string;
  inputFile: InputWrapper;
}

const template = /*html*/ `
<div class='avatar-wrapper'>
  {{ avatar }}
  <p class='username'>{{ username }}</p>
  {{ inputFile }}
</div>`;

export default class AvatarWithName extends Block<AvatarWithNameProps> {
  constructor() {
    const userInfo = window.userInfo ?? {};

    const props: AvatarWithNameProps = {
      username:
        userInfo.display_name ||
        userInfo.first_name + userInfo.second_name ||
        'Аноним',
      avatar: new Avatar({
        avatar: userInfo.avatar
          ? import.meta.env.VITE_HOST_URL_RESOURCE + userInfo.avatar
          : defaultUseravatar,
      }),
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
                new Toaster({
                  title: 'Инфо',
                  text: 'Пытаемся сменить фото',
                  reason: 'info',
                }).renderInRoot(3000);

                const userInfo = await userControl.changeAvatar(formData);

                window.userInfo = userInfo;

                (this.children.avatar as Avatar).setProps({
                  avatar:
                    import.meta.env.VITE_HOST_URL_RESOURCE + userInfo.avatar,
                });

                new Toaster({
                  title: 'Инфо',
                  text: 'Вы успешно поменяли фото!',
                  reason: 'info',
                }).renderInRoot(3000);
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
      events: {
        click: () => {
          (this.children.inputFile as InputWrapper)
            .getContent()
            ?.querySelector('input')
            ?.click();
        },
      },
    };
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
