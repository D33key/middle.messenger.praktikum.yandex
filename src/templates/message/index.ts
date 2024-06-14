import { Block } from '@/core/Block';
import { EventsProps } from '../button';

interface MessageProps extends EventsProps {
  className: 'user' | 'other';
  text: string;
}

const template = /* html */ `
  <span class='message-text {{className}}'>{{text}}</span>
`;

export default class MessageSpan extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
