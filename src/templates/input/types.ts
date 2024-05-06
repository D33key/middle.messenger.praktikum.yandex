export interface InputWrapperProps {
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
