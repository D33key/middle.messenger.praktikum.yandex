import { Block } from '@/core/Block';
import messageControl from '@/core/WebSocket/Message';
import { ChatPage } from '@/pages/Chat/chatPage';
import { EventsProps } from '@/templates/button';
import { getDataFromForm } from '@/templates/form/utils';
import sanitizeInput from '@/utils/sanitizeInput';
import { template } from './tmpl';

export class MessageForm extends Block<EventsProps> {
  constructor(chatPage: ChatPage) {
    super({
      events: {
        submit: async (event) => {
          const formData = Object.fromEntries(
            getDataFromForm(event)!.entries(),
          );

          const message = sanitizeInput(formData.message as string);

          messageControl.sendMessage(message);

          (event.target as HTMLFormElement)?.reset();

          const now = new Date();
          const hours = now.getHours();
          let minutes: string | number = now.getMinutes();
          minutes = minutes < 10 ? '0' + minutes : minutes;
          const currentTime = hours + ':' + minutes;
          chatPage.curentChatComp?.setProps({
            last_message: {
              time: currentTime,
              content: message,
              user: window.userInfo,
            },
          });
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
