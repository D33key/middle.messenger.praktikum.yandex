import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import { template } from './tmpl';

export class MessageForm extends Block<object> {
  constructor(props: EventsProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
