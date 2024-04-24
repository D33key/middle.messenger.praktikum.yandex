interface ButtonProps {
	btnText: string;
	btnType: 'submit' | 'button';
	btnVariant?: 'ghost' | 'primary' | 'secondary';
	classNames?: string;
}

export const Button = ({
	btnText,
	btnVariant,
	btnType,
	classNames,
}: ButtonProps) => {
	return `<button type="${btnType}" class="button ${btnVariant ?? ''} ${
		classNames ?? ''
	}">${btnText}</button>`;
};
