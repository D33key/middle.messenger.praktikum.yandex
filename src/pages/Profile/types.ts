import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/changeButtons';
import UserInfo from '@/components/userInfo';

export interface ProfilePageProps {
  userAvatar: AvatarWithName;
  userInfo: UserInfo | null;
  changeButtons: ButtonsWrapper | null;
}
