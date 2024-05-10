import { Block } from '@/Block';
import TitleWithText from '@/components/titleWithText';
import Form from '@/templates/form';

interface FormWrapperProps {
	formTitle: TitleWithText;
	form: Form;
}

const template = /*html*/ `<div class='login-wrapper'>
{{ formTitle }}
{{form}}
</div>`;

export default class FormWrapper extends Block<FormWrapperProps> {
	constructor(props: FormWrapperProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
