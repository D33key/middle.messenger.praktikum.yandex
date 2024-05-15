import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import Chat from './chat';

export interface AvailableChatsProps extends EventsProps {
	chatArray: Chat[];
}

const template = /*html*/ `
  <div class='available-chats'>
		{{each chatArray}}
			{{ chatArray }}
		{{endeach}}
  </div>`;

export default class AvailableChats extends Block<AvailableChatsProps> {
	constructor(props: AvailableChatsProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
