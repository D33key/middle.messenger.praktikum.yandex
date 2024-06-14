import { Toaster } from '@/components/Toaster';
import userControl from '@/core/api/User';
import { getDataFromForm } from '@/templates/form/utils';

export default async function submitProfileChange(
  event: SubmitEvent,
  typeOfChange: 'userInfo' | 'password' | null,
) {
  new Toaster({
    title: 'Инфо',
    text: 'Отправляем запрос на смену данных',
    reason: 'info',
  }).renderInRoot();

  const formData = getDataFromForm(event);

  if (!formData) return;

  try {
    if (typeOfChange === 'userInfo') {
      const userInfo = await userControl.changeProfile(formData);

      window.userInfo = userInfo;
    } else {
      await userControl.changePassword(formData);
    }

    new Toaster({
      title: 'Инфо',
      text: 'Данные успешно изменены',
      reason: 'info',
    }).renderInRoot();
  } catch (error) {
    new Toaster({
      title: 'Ошибка',
      text: error as string,
    }).renderInRoot();
  }
}
