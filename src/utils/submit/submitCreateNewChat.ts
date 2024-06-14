import AvailableChats from '@/components/availableChats';
import { Modal } from '@/components/Modal';
import { Toaster } from '@/components/Toaster';
import { Chat } from '@/core/api/Chat';
import { creatingChat } from '@/pages/Chat/utils';
import { getDataFromForm } from '@/templates/form/utils';

export default async function submitCreateNewChat(
  event: SubmitEvent,
  createChatCb: (data: FormData) => Promise<{
    id: number;
  }>,
  requestExtistingChatsCb: () => Promise<Chat[]>,
  existingChat: AvailableChats,
) {
  const formData = getDataFromForm(event);

  if (!formData) {
    new Toaster({
      title: 'Ошибка',
      text: 'Не удалось создать чат! Неверно введенный заголовок.',
    }).renderInRoot();

    return;
  }

  try {
    await createChatCb(formData);
    const updatedChats = await requestExtistingChatsCb();

    existingChat.setChildren({
      chatArray: creatingChat(updatedChats, existingChat),
    });

    new Toaster({
      title: 'Успешно',
      text: 'Новый чат создан!',
      reason: 'info',
    }).renderInRoot();
  } catch (error) {
    new Toaster({
      title: 'Ошибка',
      text: `Не удалось создать чат! ${error}`,
      reason: 'info',
    }).renderInRoot();
  } finally {
    Modal.close();
  }
}
