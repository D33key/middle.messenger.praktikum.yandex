interface FormTitle {
	formTitle: string;
	formText: string;
	linkHref: string;
	linkText: string;
}

export const FormTitle = ({
	formTitle,
	formText,
	linkHref,
	linkText,
}: FormTitle) => /*html*/ `
  <h2 class='form-title'>${formTitle}</h2>
  <p class='form-text'>${formText} <a class='login-link' href=${linkHref}>${linkText}</a></p>
`;
