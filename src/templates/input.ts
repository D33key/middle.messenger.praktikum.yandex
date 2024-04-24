export interface InputProps {
	inputType: HTMLInputElement['type'];
	inputId: string;
	labelText: string;
	placeholder: string;
	defaultValue?: string;
}

export const Input = ({
	inputType,
	inputId,
	labelText,
	placeholder,
	defaultValue,
}: InputProps) => {
	return `
    <div class="input-wrapper">
      <label class="input-label" for="${inputId}">${labelText}</label>
      <input class="input" type="${inputType}" id="${inputId}" placeholder="${placeholder}" ${
		defaultValue && `value="${defaultValue}"`
	}/>
    </div>
  `;
};
