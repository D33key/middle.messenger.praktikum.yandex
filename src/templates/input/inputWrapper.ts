import { Block } from '@/Block';
import { EventsProps } from '../button/button';

interface InputWrapperProps extends EventsProps {
	labelFor: string;
	labelText: string;
	required: boolean;
	inputType: 'text' | 'password' | 'email' | 'tel' | 'number' | 'file';
	minLength?: string;
	maxLength?: string;
	placeholder?: string;
	autocomplete?: 'on' | 'off';
	className?: string;
}

const template = /*html*/ `
<div class="input-wrapper">
	<label for="{{labelFor}}" class="input-label">{{labelText}}</label>
	<input class='input {{className}}' id="{{labelFor}}" type="{{inputType}}" required="{{required}}" minlength="{{minLength}}" placeholder="{{placeholder}}" autocomplete="{{autocomplete}}" />
</div>
`;

export default class InputWrapper extends Block<InputWrapperProps> {
	constructor(props: InputWrapperProps) {
		// TODO useless firstArg
		super('div', props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
