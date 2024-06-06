import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';

export interface LinkProps extends EventsProps {
  linkClass: string;
  linkText: string;
}

const template = /* html*/ `<a class="{{linkClass}}">{{linkText}}</a>`;

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
