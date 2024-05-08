import { Block, BlockEvents } from '@/Block';
import { buttonTemplate } from './template';

export interface EventsProps {
	events?: BlockEvents;
}

export interface ButtonProps extends EventsProps{
	className?: string;
	child: string;
	type: 'submit' | 'reset' | 'button';
}

export default class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super('button', props);
	}

	render() {
		return this.compile(buttonTemplate, this.props);
	}
}
