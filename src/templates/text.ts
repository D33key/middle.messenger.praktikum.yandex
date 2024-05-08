import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface Text {
	variant: 'p' | 'span' | 'strong' | 'em' | 'q';
	key: string;
	children: SlowactProps<'div', unknown, unknown>['props']['children'][];
	className?: string;
	onClick?: EventListener;
}

const Text = ({ variant, key, className, onClick, children }: Text) => {
	return Slowact.createElement(
		variant,
		{
			key,
			className,
			onClick,
		},
		...children,
	);
};

export default Text;
