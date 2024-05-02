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
	onChange?: EventListener;
	onBlur?: EventListener;
}

const Input = ({ key, className, attributes, onChange, onBlur }: Input) => {
	return Slowact.createElement('input', {
		key,
		className: `input ${className ?? ''}`,
		attributes,
		onChange,
		onBlur
	});
};

export default Input;
