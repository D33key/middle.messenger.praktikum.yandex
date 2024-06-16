import { Block } from '@/core/Block';
import { EventsProps } from '../templates/button/index';

const template = /*html*/ `
  <div class='change-photo'>
    <div>•••</div>
  </div>
`;

export class ChangePhoto extends Block<object> {
  constructor(props?: EventsProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
