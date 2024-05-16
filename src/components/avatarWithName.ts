import { Block } from '@/core/Block';
import Avatar from '@/templates/avatar';
import { EventsProps } from '@/templates/button';

interface AvatarWithNameProps extends EventsProps {
  avatar: Avatar;
  username: string;
}

const template = /*html*/ `<div class='avatar-wrapper'>
{{ avatar }}
<p class='username'>{{ username }}</p>
<input type='file' class='avatar-input'/>
</div>`;

export default class AvatarWithName extends Block<AvatarWithNameProps> {
  constructor(props: AvatarWithNameProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
