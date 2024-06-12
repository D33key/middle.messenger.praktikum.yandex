import { Chat as IChat } from '@/core/api/Chat';
import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';

export interface ChatProps extends IChat, EventsProps {}

const template = /*html*/ `
  <div class='chat'>
    <img class='chat-avatar' src="{{ avatar }}" alt='Аватар {{title}}'/>
    <div class='user-info'>
      <p class='chat-username'>{{title}}</p>
      {{if last_message.content}}
        <p class='last-message'>{{last_message.content}}</p>
      {{endif}}
    </div>
    <div class='user-message-info'>
      {{if last_message.time}}
        <span class='message-time'>{{last_message.time}}</span>
      {{endif}}
      {{if unread_count}}
      <p class='new-messsage'>
        {{unread_count}}
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
