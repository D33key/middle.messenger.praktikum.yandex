import '@/styles/global.css';
import '@/styles/profile.css';

import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/changeButtons';
import ChangePassword from '@/components/userChangePassword';
import UserInfo, { UserInfoProps } from '@/components/userInfo';
import UserInfoInputs from '@/components/userinfoInputs';
import { Block } from '@/core/Block';
import defaultUseravatar from '@/public/defaultUserImg.png';
import Avatar from '@/templates/avatar';
import Button from '@/templates/button';
import { getDataFromObject } from '@/templates/form/utils';
import getCookie from '@/utils/getCookie';
import { render } from '@/utils/render';
import { changePasswordInput } from './../../utils/changePasswordInputs';
import { userInfoInputsObj } from './../../utils/userInfoInputs';

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

							(this.children.userInfo as Block<UserInfoProps>).setProps({
								className: 'pointer-none',
							});
							(this.children.changeButtons as Block<any>).show();
							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.userInfoInputs as Block<any>
							).show();

							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.saveButton as Block<any>
							).hide();
							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.changePassword as Block<any>
							).hide();
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
							(this.children.userInfo as Block<UserInfoProps>).setProps({
								className: '',
							});
							(this.children.changeButtons as Block<any>).hide();

							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.saveButton as Block<any>
							).show();
						},
					},
				}),
				changePassword: new Button({
					child: 'Изменить пароль',
					type: 'button',
					className: 'changeButton',
					events: {
						click: () => {
							(this.children.userInfo as Block<UserInfoProps>).setProps({
								className: '',
							});
							(this.children.changeButtons as Block<any>).hide();
							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.userInfoInputs as Block<any>
							).hide();

							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.changePassword as Block<any>
							).show();
							(
								(this.children.userInfo as Block<UserInfoProps>).children
									.saveButton as Block<any>
							).show();
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
