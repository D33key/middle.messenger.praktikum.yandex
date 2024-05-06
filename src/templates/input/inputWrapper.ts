import { InputWrapperProps } from './types';

export const InputWrapper = ({
	labelFor,
	labelText,
	inputType,
	required,
	minLength,
	placeholder,
	autocomplete,
	className = ''
}: InputWrapperProps) => /*html*/ `
  <div class="input-wrapper">
    <label for="${labelFor}" class="input-label">${labelText}</label>
    <input class='input ${className}' id="${labelFor}" type="${inputType}" required="${required}" ${
	minLength ? `minlength="${minLength}"` : ''
} ${placeholder ? `placeholder="${placeholder}"` : ''} ${
	autocomplete ? `autocomplete="${autocomplete}"` : ''
} />
  </div>
  `;
