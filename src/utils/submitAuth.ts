import { Toaster } from '@/components/Toaster';
import authControl from '@/core/api/Auth';
import { router } from '@/pages/router';
import { getDataFromForm } from '@/templates/form/utils';

export default async function submitAuth(
  event: SubmitEvent,
  type: 'login' | 'signup',
) {
  const formData = getDataFromForm(event);

  if (!formData) return;

  try {
    if (type === 'login') {
      await authControl.logIn(formData);
    }
    await authControl.signup(formData);

    router.go('/');
  } catch (error) {
    new Toaster({
      title: 'Ошибка',
      text: error as string,
    }).renderInRoot();
  }
}
