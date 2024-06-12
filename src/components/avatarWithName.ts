import { Block } from '@/core/Block';
import Avatar from '@/templates/avatar';
import { EventsProps } from '@/templates/button';
import InputWrapper from '@/templates/input';

interface AvatarWithNameProps extends EventsProps {
  avatar: Avatar;
  username: string;
  inputFile: InputWrapper;
}

const template = /*html*/ `<div class='avatar-wrapper'>
{{ avatar }}
<p class='username'>{{ username }}</p>
{{ inputFile }}
</div>`;

export default class AvatarWithName extends Block<AvatarWithNameProps> {
  constructor(props: AvatarWithNameProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
