import '@/styles/global.css';
import '@/styles/profile.css';

import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/changeButtons';
import ChangePassword from '@/components/userChangePassword';
import UserInfo from '@/components/userInfo';
import { Block } from '@/core/Block';
import defaultUseravatar from '@/public/defaultUserImg.png';
import Avatar from '@/templates/avatar';
import Button from '@/templates/button';
import { getDataFromForm, getDataFromObject } from '@/templates/form/utils';
import getCookie from '@/utils/getCookie';
import { render } from '@/utils/render';
import { changePasswordInput } from './../../utils/changePasswordInputs';
import { userInfoInputsObj } from './../../utils/userInfoInputs';
import UserInfoInputs from '@/components/userinfoInputs';

interface ProfilePageProps {
	userAvatar: AvatarWithName;
	userInfo: UserInfo;
	changeButtons: ButtonsWrapper;
}

const template = /* html */ `<div class='profile-page'>
  {{ userAvatar }}
	{{ userInfo }}
	{{ changeButtons }}
  </div>`;

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
			userInfo: new UserInfo({
				className: 'pointer-none',
				userInfoInputs: new UserInfoInputs({
					...userInfoInputsObj,
				}),
				changePassword: new ChangePassword({
					...changePasswordInput,
				}),
				saveButton: new Button({
					child: 'Сохранить',
					type: 'button',
					className: 'submitButton',
					isHide: true,
					events: {
						click: (event) => {
							const getWrapper = (event.target as HTMLElement).parentElement!;
							const getInputs = [
								...getWrapper.querySelectorAll('.inputs-wrapper'),
							].filter(
								(input) => (input as HTMLElement).style.display !== 'none',
							)[0];

							const getInputsVal = [
								...getInputs.querySelectorAll('input'),
							].reduce<Record<string, string>>((acc, cur) => {
								const inputName = cur.name;
								const inputValue = cur.value;

								if (inputValue) {
									acc[inputName] = inputValue;
								}

								return acc;
							}, {});

							getDataFromObject(getInputsVal);

							this.children.userInfo.setProps({
								className: 'pointer-none',
							});
							this.children.changeButtons.show();
							this.children.userInfo.children.userInfoInputs.show();

							this.children.userInfo.children.saveButton.hide();
							this.children.userInfo.children.changePassword.hide();
						},
					},
				}),
			}),
			changeButtons: new ButtonsWrapper({
				changeInfo: new Button({
					child: 'Изменить данные',
					type: 'button',
					className: 'changeButton',
					events: {
						click: () => {
							this.children.userInfo.setProps({
								className: '',
							});
							this.children.changeButtons.hide();

							this.children.userInfo.children.saveButton.show();
						},
					},
				}),
				changePassword: new Button({
					child: 'Изменить пароль',
					type: 'button',
					className: 'changeButton',
					events: {
						click: () => {
							this.children.userInfo.setProps({
								className: '',
							});
							this.children.changeButtons.hide();
							this.children.userInfo.children.userInfoInputs.hide();

							this.children.userInfo.children.changePassword.show();
							this.children.userInfo.children.saveButton.show();
						},
					},
				}),
				Logout: new Button({
					child: 'Выйти',
					type: 'button',
					className: 'logoutButton',
				}),
			}),
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const signupPage = new ProfilePage();
	render('#app', signupPage);
});
