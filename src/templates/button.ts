interface ButtonProps {
	btnText: string;
	btnVariant: 'ghost' | 'primary' | 'secondary';
	btnType: 'submit' | 'button';
}

export const Button = ({ btnText, btnVariant, btnType }: ButtonProps) =>
	`<button type="${btnType}" class="${btnVariant}">${btnText}</button>`;

export const Div = () => {
	return `
    <div>
      <h1>Hello custom Div</h1>
      ${Button({
				btnText: 'Custom button',
				btnType: 'submit',
				btnVariant: 'primary',
			})}
    </div>
  `;
};

export const DivInsideDiv = () => {
	return `
    <div>
      ${Div()}
      <div> This is footer</div>
    </div>
  `;
};
