import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import Chat from './availableChats';

export interface ChatsProps extends EventsProps {
  searchChat: InputWrapper;
  existingChats?: Chat | string;
}

const template = /*html*/ `
  <div class='chats-wrapper'>
    <a class="chat-link" href="/profile">Профиль ></a>
    {{ searchChat }}
		{{ existingChats }}
  </div>`;

export default class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    props.existingChats = props.existingChats ?? 'Нет доступных чатов';
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
