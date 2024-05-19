import AvatarWithName from '@/components/avatarWithName';
import ButtonsWrapper from '@/components/change-buttons';
import UserInfo from '@/components/userInfo';

export interface ProfilePageProps {
  userAvatar: AvatarWithName;
  userInfo: UserInfo;
  change-buttons: ButtonsWrapper;
}
