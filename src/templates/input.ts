import { Slowact } from '@/Templater/Slowact';

interface Input {
	key: string;
	className?: string;
	attributes: {
		type: 'text' | 'password' | 'email' | 'tel' | 'number';
		autocomplete: boolean;
		disabled: boolean;
		minLength: string;
		maxLength: string;
		placeholder: string;
		name: string;
		required: boolean;
	};
	// onChange
	// onBlur
}

const Input = ({ key, className, attributes }: Input) => {
	return Slowact.createElement('input', {
		key,
		className: `input ${className ?? ''}`,
		attributes,
	});
};

export default Input;
