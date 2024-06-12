import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';
import Chat from './availableChats';
import Link from './link';

export interface ChatsProps extends EventsProps {
  chatLink: Link;
  searchChat: InputWrapper;
  createChat: Button;
  existingChats?: Chat | string;
}

const template = /*html*/ `
  <div class='chats-wrapper'>
    {{ chatLink }}
    <div class='chat-actions'>
      {{ searchChat }}
      {{ createChat }}
    </div>
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
