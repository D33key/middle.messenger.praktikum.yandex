import { Chat } from '@/core/api/Chat';
import { Block } from '@/core/Block';
import SendFileIcon from '@/public/sendFile.png';
import Button, { EventsProps } from '@/templates/button';

export interface ConversationProps extends EventsProps {
  dialog: (Chat & { count: number }) | false;
  addButton?: Button;
}

const template = /*html*/ `
    {{if dialog}}
      <div class='conversation'>
        <div class='user-info-chat'>
          <div class='user-info'>
            <img src="{{dialog.avatar}}" alt="Аватар {{dialog.title}}"/>
            <p class="chat-info">{{dialog.title}} ({{dialog.count}} участников)</p>
          </div>
          {{addButton}}
        </div>

        <form class='message-input'>
          <img src="${SendFileIcon}" alt='choose file'/>
          <input name='message' type='text' placeholder='Введите сообщение...'/>
          <button type='submit'>Отправка</button>
        </form>
      </div>
    {{else}}
      <div class='empty-conversation'>
        'Выберите чат, чтобы отправить сообщение'
      </div>
    {{endif}}
`;

export class Conversation extends Block<ConversationProps> {
  constructor(props: ConversationProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
