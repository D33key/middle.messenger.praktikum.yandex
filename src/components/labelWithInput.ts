import Div from '@/templates/div';
import Input from '@/templates/input';
import Label from '@/templates/label';

interface LabelWithInput {
	wrapper: {
		wrapperKey: string;
		wrapperClassName?: Div['className'];
	};
	label: {
		labelKey: string;
		labelText: string;
		labelAttributes: Label['attributes'];
		labelClassName?: Label['className'];
	};
	input: {
		inputKey: string;
		inputAttributes: Input['attributes'];
		inputClassname?: Input['className'];
	};
}

const LabelWithInput = ({ wrapper, label, input }: LabelWithInput) => {
	return Div({
		key: wrapper.wrapperKey,
		className: wrapper.wrapperClassName,
		children: [
			Label({
				key: label.labelKey,
				className: label.labelClassName,
				children: [label.labelText],
				attributes: label.labelAttributes,
			}),
			Input({
				key: input.inputKey,
				className: input.inputClassname,
				attributes: input.inputAttributes,
			}),
		],
	});
};

export default LabelWithInput;
