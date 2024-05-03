import { Slowact } from '@/Templater/Slowact';
import Div from '@/templates/div';
import Link from '@/templates/link';
import Text from '@/templates/text';
import Title from '@/templates/title';

interface FormWrapper {
	key: string;
	className: string;
	isTitleExist: boolean;
	titleText?: string;
	textText?: string;
	isLinkInclude?: boolean;
	linkText?: string;
	linkHref?: string;
	linkLeadToNewPage?: boolean;
	children?: Div['children'];
}

const FormWrapper = ({
	key,
	className,
	isTitleExist,
	titleText,
	textText,
	isLinkInclude,
	linkText,
	linkHref,
	linkLeadToNewPage,
	children,
}: FormWrapper) => {
	const addLink = () =>
		isLinkInclude &&
		Link({
			key: 'login-link',
			attributes: {
				href: linkHref ?? '',
				target: linkLeadToNewPage ? '_blank' : '_self',
			},
			className: 'login-link',
			children: [linkText],
		});

	const addTextAndTitle = () => {
		if (isTitleExist) {
			const array = [
				Title({
					key: 'form-title',
					className: 'title',
					variant: 'h2',
					children: [titleText],
				}),
				Text({
					key: 'form-text',
					variant: 'p',
					className: '',
					//@ts-ignore
					children: [textText, addLink()],
				}),
			];
			return array;
		}
		return [];
	};
	return Slowact.createElement(
		'form',
		{
			key,
			className,
		},
		//@ts-ignore
		...addTextAndTitle(),
		...(children as string[]),
	);
};

export default FormWrapper;
