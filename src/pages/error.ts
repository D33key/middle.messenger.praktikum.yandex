import '@/styles/global.css';
import TitleWithText from '@/components/titleWithText';
import { render } from '@/utils/render';

declare global {
	interface Window {
		errorNumber: number;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	render(
		'#app',
		new TitleWithText({
			formTitle: window.errorNumber.toString(),
			formText: 'Упс, произошла ошибка! ',
			linkHref: '/login',
			linkText: 'Вернуться обратно',
		}),
	);
});
