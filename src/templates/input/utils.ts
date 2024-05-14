import checkValidity from '@/utils/checkValidity';
import InputWrapper from '.';
import { Block } from '@/core/Block';

export const checkInput = (
	event: FocusEvent,
	formChildren: Record<string, Block<object>>,
) => {
	const target = event.target as HTMLInputElement;
	const inputName = target?.getAttribute('name');

	if (inputName) {
		const inputValue = target.value;
		const formChildName = inputName + 'Input';

		const formChild = formChildren[formChildName];

		if (formChild instanceof InputWrapper) {
			const childProps = formChild.getProps();
			const isInputValid = checkValidity(
				inputValue,
				childProps.validationPattern,
			);

			if (!isInputValid) {
				const errorText = childProps.validationErrorText;
				formChild.setProps({
					errorText: errorText,
					value: inputValue,
				});
			} else {
				formChild.setProps({
					errorText: '',
					value: inputValue,
				});
			}
		}
	}
};
