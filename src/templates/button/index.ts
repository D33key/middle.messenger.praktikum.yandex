import { Block, BlockEvents } from '@/core/Block';
import { buttonTemplate } from './template';

export interface EventsProps {
	events?: BlockEvents;
}

export interface ButtonProps extends EventsProps {
	className?: string;
	child: string;
	type: 'submit' | 'reset' | 'button';
	isHide?: boolean;
}

export default class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super(props);
		props.isHide && this.hide();
	}

	render() {
		return this.compile(buttonTemplate, this.props);
	}
}
