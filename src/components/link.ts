import { Block } from '@/core/Block';
import { router } from '@/pages/router';
import { EventsProps } from '@/templates/button';

export interface LinkProps extends EventsProps {
  linkClass: string;
  linkText: string;
  linkHref: `/${string}`;
}

const template = /* html*/ `<a class="{{linkClass}}">{{linkText}}</a>`;

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    props.events = {
      ...props.events,
      click: () => router.go(props.linkHref),
    };
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
