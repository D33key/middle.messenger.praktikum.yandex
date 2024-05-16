import { Block } from '@/core/Block';
import SendFileIcon from '@/public/sendFile.png';
import { EventsProps } from '@/templates/button';
import MessageSpan from '@/templates/message';

export interface ConversationProps extends EventsProps {
  dialog:
    | {
        userImg: string;
        userName: string;
        messages: MessageSpan[][];
      }
    | false;
}

const template = /*html*/ `
    {{if dialog}}
      <div class='conversation'>
        <div class='user-info-chat'>
          <img src="{{dialog.userImg}}" alt="Аватар {{dialog.userName}}"/>
          <p class="userFullname">{{dialog.userName}}</p>
          <span>*</span>
        </div>
        <div class='chat-tape'>
        {{each dialog.messages}}
          {{dialog.messages}}
        {{endeach}}
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
