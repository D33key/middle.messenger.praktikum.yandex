import Title from '@/templates/title';
import Text from '@/templates/text';
import Div from '@/templates/div';
import Link from '@/templates/link';

interface TitleWithText {
	key: string;
	className?: string;
	titleText: string;
	textText: string;
	isLinkInclude: boolean;
	linkText?: string;
	linkHref?: string;
	linkLeadToNewPage?: boolean;
	children?: Div['children'];
}

const TitleWithText = ({
	key,
	titleText,
	textText,
	isLinkInclude,
	linkText,
	linkHref,
	linkLeadToNewPage,
	children,
}: TitleWithText) => {
	const addLink =
		isLinkInclude &&
		Link({
			key: 'page-link',
			attributes: {
				href: linkHref ?? '',
				target: linkLeadToNewPage ? '_blank' : '_self',
			},
			className: 'page-link',
			children: [linkText],
		});

	const isChildren = children ? children : '';
	return Div({
		key,
		children: [
			Title({
				key: 'page-title',
				className: 'title',
				variant: 'h1',
				children: [titleText],
			}),
			Text({
				key: 'page-text',
				variant: 'p',
				className: 'page-text',
				children: [textText],
			}),
			//@ts-ignore
			addLink,
			//@ts-ignore
			isChildren,
		],
	});
};

export default TitleWithText;
