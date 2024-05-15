import { Block } from '@/core/Block';
import { InputWrapperProps } from './types';

const template = /*html*/ `
<div class="input-wrapper {{classNameInput}}">
	{{if labelText}}
		<label for="{{labelFor}}"  class="input-label">{{labelText}}</label>
	{{endif}}
	<div class='input-with-error'>
		<input name={{labelFor}} class='input {{className}}' id="{{labelFor}}" type="{{inputType}}" required="{{required}}" placeholder="{{placeholder}}" value="{{ value }}"/>
		<div class='error {{labelFor}}-error'>{{ errorText }}</div>
		{{if addResetBtn}}
		    {{ button }}
		{{endif}}
	</div>
</div>
`;

export default class InputWrapper extends Block<InputWrapperProps> {
	constructor(props: InputWrapperProps) {
		props.labelText = props.labelText ?? '';
		props.labelFor = props.labelFor ?? '';
		props.errorText = props.errorText ?? '';
		props.value = props.value ?? '';
		props.required = props.required ?? false;
		props.classNameInput = props.classNameInput ?? '';
		props.addResetBtn = props.addResetBtn ?? false;

		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
