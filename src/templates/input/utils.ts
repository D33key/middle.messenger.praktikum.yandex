import checkValidity from '@/utils/checkValidity';
import InputWrapper from '.';

export const checkInput = <T extends Record<string, unknown>>(
  event: FocusEvent,
  formChildren: T,
) => {
  const target = event.target as HTMLInputElement;
  const inputName = target.getAttribute('name');

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
          errorText,
          value: inputValue,
        });

        return true;
      }
      formChild.setProps({
        errorText: '',
        value: inputValue,
      });

      return false;
    }
  }
  return true;
};
