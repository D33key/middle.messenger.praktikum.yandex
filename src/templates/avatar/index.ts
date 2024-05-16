import { Block } from '@/core/Block';
import { EventsProps } from '../button';
import { template } from './template';

export interface AvatarProps extends EventsProps {
  avatar: string;
  className?: string;
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    props.className = props.className ?? '';
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
