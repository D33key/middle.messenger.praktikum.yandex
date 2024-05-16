import { Block } from '@/core/Block';
import Button from '@/templates/button';

interface ButtonsWrapperProps {
  changeInfo: Button;
  changePassword: Button | null;
  Logout: Button | null;
}

const template = /*html*/ `<div class='userinfo-buttons'>
{{ changeInfo }}
{{ changePassword }}
{{ Logout }}
</div>`;

export default class ButtonsWrapper extends Block<ButtonsWrapperProps> {
  constructor(props: ButtonsWrapperProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
