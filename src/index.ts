import authControl, { UserInfo } from '@/core/api/Auth';
import { Chat } from './core/api/Chat';
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
  }
}

router
  .setProtectedPaths(['/profile', '/', '/chat'])
  .setAccessFunCheck(authControl.checkAccess.bind(authControl))
  .setDefaultPath('/login')
  .use('/404', ErrorPage)
  .use('/', ChatPage)
  .use('/profile', ProfilePage)
  .use('/login', LoginPage)
  .use('/signup', SingupPage)
  .start();
