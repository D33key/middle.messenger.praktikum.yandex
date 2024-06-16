import { Toaster } from '@/components/Toaster';
import chatControl from '@/core/api/Chat';
import { getDataFromForm } from '@/templates/form/utils';

export default async function submitUpdateChatPhoto(
  event: SubmitEvent,
  chatId: number,
) {
  new Toaster({
    title: 'Инфо',
    text: 'Отправляем запрос на смену фото',
    reason: 'info',
  }).renderInRoot();

  const formData = getDataFromForm(event);

  if (!formData) return;
  formData.append('chatId', String(chatId));
  console.log(Object.fromEntries(formData.entries()));

  try {
    const { avatar } = await chatControl.uploadChatAvatar(formData);

    return avatar;
  } catch (error) {
    new Toaster({
      title: 'Ошибка',
      text: 'Не удалось загрузить фото ' + error,
    }).renderInRoot();
  }
}
