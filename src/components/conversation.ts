import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import ChatInfo from './ChatInfo';
import ChatMessages from './ChatMessages';
import { MessageForm } from './MessageForm';

export interface ConversationProps extends EventsProps {
  render: boolean;
  chatInfo: ChatInfo;
  messageForm: MessageForm;
  chatMessages: ChatMessages;
}

const template = /*html*/ `
    {{if render}}
      <div class='conversation'>
        {{ chatInfo }}
        {{ chatMessages }}
        {{ messageForm }}
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
