import '@/style.css';
import { Slowact } from '@/Templater/Slowact';
import Div from '@/templates/div';
import { getCookie } from '@/utils/getUserCookie';
import Img from '@/templates/img';
import Text from '@/templates/text';
import DefaultUserImage from '@/public/defaultUserImg.png';
import UserInfoForm from '@/components/userInfoForm';
import Button from '@/templates/button';
import Input from '@/templates/input';

export const isDisabled = Slowact.createState(true);
export const showChangePassword = Slowact.createState(false);
export const setIsDisabled = Slowact.changeState(isDisabled, 'userInfo-form');
export const setShowChangePassword = Slowact.changeState(
	showChangePassword,
	'userInfo-form',
);

document.addEventListener('DOMContentLoaded', () => {
	const getUserImage = getCookie('userImage') ?? DefaultUserImage;

	const getUser = getCookie('userName') ?? null;
	const getUserFirstName = getUser?.firstName ?? 'Аноним';

	Slowact.createRoot('#app');

	Div({
		key: 'changeUser-key',
		className: 'changeUser-page-wrapper',
		children: [
			Div({
				key: 'userImage-wrapper',
				className: 'userImage-wrapper',
				children: [
					Div({
						key: 'image-wrapper',
						className: 'userImage',
						onClick: function () {
							//@ts-ignore
							this.querySelector('input').click();
						},
						children: [
							Img({
								key: 'userImage',
								attributes: {
									src: getUserImage,
									alt: 'Фото Пользователя',
								},
							}),
							Input({
								key: 'change-avatar-key',
								className: 'hide',
								attributes: {
									name: 'avatar',
									type: 'file',
								},
							}),
						],
					}),
					Text({
						key: 'UserName',
						className: 'username-text',
						variant: 'p',
						children: [getUserFirstName],
					}),
				],
			}),
			UserInfoForm(),
			Div({
				key: 'button-div-wrapper-key',
				className: 'buttonChange-wrapper',
				children: [
					Button({
						key: 'user-change-profile',
						className: 'btn-change',
						attributes: {
							type: 'button',
						},
						children: ['Изменить данные'],
						onClick: () => {
							setIsDisabled(!isDisabled.value);
						},
					}),
					Button({
						key: 'user-change-password',
						className: 'btn-change',
						attributes: {
							type: 'button',
						},
						children: ['Изменить пароль'],
						onClick: () => {
							setShowChangePassword(!showChangePassword.value);
						},
					}),
				],
			}),
		],
	});
	Slowact.render();
});
