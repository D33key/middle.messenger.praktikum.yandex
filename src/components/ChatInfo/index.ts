import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import { template } from './tmpl';

interface ChatInfoProps extends EventsProps {
  avatar: string;
  title: string;
  count: number;
  addButton: Button;
}

export default class ChatInfo extends Block<Partial<ChatInfoProps>> {
  constructor(props: Partial<ChatInfoProps>) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
