import { Block } from '@/core/Block';
import { InputWrapperProps } from './types';

const template = /*html*/ `
<div class="input-wrapper {{classNameInput}}">
	<label for="{{labelFor}}"  class="input-label">{{labelText}}</label>
	<div class='input-with-error'>
		<input name={{labelFor}} class='input {{className}}' id="{{labelFor}}" type="{{inputType}}" required="{{required}}" placeholder="{{placeholder}}" value="{{ value }}"/>
		<div class='error {{labelFor}}-error'>{{ errorText }}</div>
	</div>
</div>
`;

export default class InputWrapper extends Block<InputWrapperProps> {
	constructor(props: InputWrapperProps) {
		props.errorText = props.errorText ?? '';
		props.value = props.value ?? '';
		props.classNameInput = props.classNameInput ?? '';

		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
