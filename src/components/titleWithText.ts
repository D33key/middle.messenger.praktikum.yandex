import { Block } from '@/Block';
import { EventsProps } from '@/templates/button/button';

interface TitleWithTextProps extends EventsProps {
	formTitle: string;
	formText: string;
	linkHref: string;
	linkText: string;
}

const template = /*html*/ `<div class='form-title-wrapper'>
<h2 class='form-title'>{{formTitle}}</h2>
<p class='form-text'>{{formText}} <a class='login-link' href="{{linkHref}}">{{linkText}}</a></p>
</div>
`;

export default class TitleWithText extends Block<TitleWithTextProps> {
	constructor(props: TitleWithTextProps) {
		// TODO useless firstArg
		super('div', props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
