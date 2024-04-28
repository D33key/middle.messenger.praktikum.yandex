import { Slowact } from '@/Templater/Slowact';
import Div from '@/templates/div';
import Link from '@/templates/link';
import Text from '@/templates/text';
import Title from '@/templates/title';

interface FormWrapper {
	key: string;
	className: string;
	titleText: string;
	textText: string;
	isLinkInclude: boolean;
	linkText?: string;
	linkHref?: string;
	linkLeadToNewPage?: boolean;
	children?: Div['children'];
}

const FormWrapper = ({
	key,
	className,
	titleText,
	textText,
	isLinkInclude,
	linkText,
	linkHref,
	linkLeadToNewPage,
	children,
}: FormWrapper) => {
	const addLink =
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
	return Slowact.createElement(
		'form',
		{
			key,
			className,
		},
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
			children: [textText, addLink],
		}),
		...(children as string[]),
	);
};

export default FormWrapper;
