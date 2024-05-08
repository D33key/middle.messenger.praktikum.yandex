import { isDisabled, showChangePassword } from '@/changeUser';
import FormWrapper from '@/templates/formWrapper';
import LabelWithInput from '@/templates/labelWithInput';
import { userInfoInputs } from '@/utils/arrayOfElement';
import { getCookie } from '@/utils/getUserCookie';

interface UserInfoForm {
	firstName: string;
	secondName: string;
	email: string;
	nickname: string;
	phone: string;
}
const UserInfoForm = () => {
	const getUser = getCookie('userName') ?? null;
	const getUserFirstName = getUser?.firstName ?? 'Аноним';
	const getUserSecondName = getUser?.secondName ?? 'Не устанолвено';
	const getUserEmail = getCookie('userEmail') ?? 'Не устанолвено';
	const getUserLogin = getCookie('userEmail') ?? 'Не устанолвено';
	const getUserNickname = getCookie('userNickname') ?? 'Не устанолвено';
	const getUserPhone = getCookie('phone') ?? 'Не устанолвено';

	const arrayOfInputs = userInfoInputs({
		isDisabled: isDisabled,
		userEmail: getUserEmail,
		userFirstName: getUserFirstName,
		userLogin: getUserLogin,
		userNickname: getUserNickname,
		userPhone: getUserPhone,
		userSecondName: getUserSecondName,
	});
	return FormWrapper({
		key: 'userInfo-form',
		//@ts-ignore
		className: {
			static: 'userInfo-wrapper',
			dynamic: {
				value: showChangePassword,
				trueStatement: 'show-password',
				falseStatement: ''
			},
		},
		isTitleExist: false,
		children: [
			...arrayOfInputs.map((item) =>
				LabelWithInput({
					wrapper: item.wrapper,
					//@ts-ignore
					input: item.input,
					label: item.label,
				}),
			),
		],
	});
};

export default UserInfoForm;
