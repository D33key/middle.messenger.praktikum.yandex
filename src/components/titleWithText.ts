import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import Link from './link';

export interface TitleWithTextProps extends EventsProps {
  formTitle: string;
  formText: string;
  link: Link;
}

const template = /*html*/ `<div class='form-title-wrapper'>
<h2 class='form-title'>{{formTitle}}</h2>
<p class='form-text'>{{formText}} {{link}}</p>
</div>
`;

export default class TitleWithText extends Block<TitleWithTextProps> {
  constructor(props: TitleWithTextProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
