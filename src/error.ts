import { Slowact } from './Templater/Slowact';
import TitleWithText from './templates/titleWithText';

declare global {
	interface Window {
		errorNumber: number;
	}
}

Slowact.createRoot('#app');

TitleWithText({
	key: '404-page',
	titleText: String(window.errorNumber),
	textText: 'Не туда попали',
	isLinkInclude: true,
	linkText: 'Назад к чатам',
	linkHref: '/',
	linkLeadToNewPage: false,
});

Slowact.render();
