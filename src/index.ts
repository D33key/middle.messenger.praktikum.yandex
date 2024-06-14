import authControl, { UserInfo } from '@/core/api/Auth';
import { Chat, LastMessage } from './core/api/Chat';
import { ChatPage } from './pages/Chat/chatPage';
import { ErrorPage } from './pages/Error';
import { LoginPage } from './pages/Login/login';
import { ProfilePage } from './pages/Profile/changeUser';
import { router } from './pages/router';
import { SingupPage } from './pages/Signup/signup';

declare global {
  interface Window {
    userInfo: UserInfo;
    chats: Chat[];
    currentChatId: number;
    token: string;
    currentChatMessages: LastMessage[];
  }
}

router
  .setProtectedPaths(['/settings', '/messenger', '/chat'])
  .setAccessFunCheck(authControl.checkAccess.bind(authControl))
  .setDefaultPath('/')
  .use('/404', ErrorPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfilePage)
  .use('/', LoginPage)
  .use('/sign-up', SingupPage)
  .start();
