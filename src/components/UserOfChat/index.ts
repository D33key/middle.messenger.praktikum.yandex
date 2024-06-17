import { Block } from '@/core/Block';
import Button, { EventsProps } from '@/templates/button';
import { template } from './tmpl';

interface UserOfChatProps extends EventsProps {
  avatar: string;
  login: string;
  name: string;
  removeBtn: Button | false;
}

export default class UserOfChat extends Block<UserOfChatProps> {
  constructor(props: UserOfChatProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
