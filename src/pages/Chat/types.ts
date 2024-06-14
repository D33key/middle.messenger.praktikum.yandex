import Chats from '@/components/chats';
import { Conversation } from '@/components/conversation';

export interface ChatPageProps {
  chats: Chats | null;
  conversation: Conversation | null;
}
