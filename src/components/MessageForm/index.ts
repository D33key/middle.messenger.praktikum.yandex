import { Block } from '@/core/Block';
import messageControl from '@/core/WebSocket/Message';
import { EventsProps } from '@/templates/button';
import { getDataFromForm } from '@/templates/form/utils';
import sanitizeInput from '@/utils/sanitizeInput';
import { template } from './tmpl';

export class MessageForm extends Block<EventsProps> {
  constructor() {
    super({
      events: {
        submit: async (event) => {
          const formData = Object.fromEntries(
            getDataFromForm(event)!.entries(),
          );
          const message = sanitizeInput(formData.message as string);
          messageControl.sendMessage(message);
          (event.target as HTMLFormElement)?.reset();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
