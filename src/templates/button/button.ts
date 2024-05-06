interface Button {
	className?: string;
	btnText: string;
	type: 'submit' | 'reset' | 'button';
}
export const Button = ({ className = '', btnText, type }: Button) => /*html*/ `
  <button type=${type} class='button ${className}'>${btnText}</button>
`;
