import { Slowact } from '@/Templater/Slowact';
import { SlowactProps } from '@/Templater/types';

interface Label {
	key: string;
	children: SlowactProps<
		'label',
		unknown,
		{
			for: string;
		}
	>['props']['children'][];
	className?: string;
	attributes?: {
		for: string;
	};
}

const Label = ({ key, children, className, attributes }: Label) => {
	return Slowact.createElement(
		'label',
		{
			key,
			className,
			attributes,
		},
		...children,
	);
};

export default Label;
