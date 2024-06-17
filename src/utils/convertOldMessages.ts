import { OldMessagesFromSocket } from '@/core/WebSocket/Message';
import { MessageProps } from '@/templates/message';
import formatDateTime from './formatDateTime';

export default function convertOldMessages(
  data: OldMessagesFromSocket[],
): MessageProps[] {
  return data
    .map((oldMessage) => ({
      text: oldMessage.content,
      time: formatDateTime(oldMessage.time),
      className: oldMessage.user_id === window.userInfo.id ? 'user' : 'other',
    }))
    .reverse() as MessageProps[];
}
