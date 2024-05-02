import { Slowact } from '@/Templater/Slowact';
import Div from '@/templates/div';
import { getCookie } from '@/utils/getUserCookie';
import Img from '@/templates/img';
import Text from '@/templates/text';
import DefaultUserImage from '@/public/defaultUserImg.png';
import UserInfoForm from './components/userInfoForm';
import Button from './templates/button';

export const isDisabled = Slowact.createState(true);
export const setIsDisabled = Slowact.changeState(isDisabled, 'userInfo-form');

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
					Img({
						key: 'userImage',
						attributes: {
							src: getUserImage,
							alt: 'Фото Пользователя',
						},
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
			Button({
				key: 'user-change-profile',
				className: 'btn-change',
				attributes: {
					type: 'button',
				},
				children: ['Изменить данные'],
				onClick: () => {
					setIsDisabled(false);
				},
			}),
		],
	});
	Slowact.render();
});
