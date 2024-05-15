import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';

export interface ChatProps extends EventsProps {
  chatId: number;
	userImg: string | null;
	userName: string;
	userLastMessage: string;
	lastMessageDate: string;
	isNewMessage?: string | false;
}

const template = /*html*/ `
  <div class='chat'>
    <img class='chat-avatar' src="{{ userImg }}" alt='Аватар {{userName}}'/>
    <div class='user-info'>
      <p class='chat-username'>{{userName}}</p>
      <p class='last-message'>{{userLastMessage}}</p>
    </div>
    <div class='user-message-info'>
      <span class='message-time'>{{lastMessageDate}}</span>
      {{if isNewMessage}}
      <p class='new-messsage'>
        {{isNewMessage}}
      </p>
      {{endif}}
    </div>
  </div>`;

export default class Chat extends Block<ChatProps> {
	constructor(props: ChatProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
