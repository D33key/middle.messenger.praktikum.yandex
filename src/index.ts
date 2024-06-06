import { ChatPage } from './pages/Chat/chatPage';
import { ErrorPage } from './pages/Error';
import { LoginPage } from './pages/Login/login';
import { ProfilePage } from './pages/Profile/changeUser';
import { router } from './pages/router';
import { SingupPage } from './pages/Signup/signup';

router
  .allowPaths(['/signup', '/login', '/505', '/404'])
  .use('/404', ErrorPage)
  .use('/', ChatPage)
  .use('/profile', ProfilePage)
  .use('/login', LoginPage)
  .use('/signup', SingupPage)
  .start();
