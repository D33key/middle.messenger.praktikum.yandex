import { Block } from '@/core/Block';
import { EventsProps } from '../templates/button/index';

const template = /*html*/ `
  <div class='delete-chat'>
    <div>X</div>
  </div>
`;

export class DeleteChat extends Block<object> {
  constructor(props?: EventsProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
