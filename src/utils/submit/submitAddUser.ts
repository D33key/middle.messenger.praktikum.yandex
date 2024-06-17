import ChatInfo from '@/components/ChatInfo';
import { Modal } from '@/components/Modal';
import { Toaster } from '@/components/Toaster';
import chatControl from '@/core/api/Chat';
import userControl from '@/core/api/User';
import { getDataFromForm } from '@/templates/form/utils';

export default async function submitAddUser(
  event: SubmitEvent,
  chatInfo: ChatInfo,
  chatId: number,
) {
  const formData = getDataFromForm(event);

  if (!formData) return;

  try {
    const { user, convertFormData } = await userControl.searchForUser(formData);

    const userExist = user.find(({ login }) => login === convertFormData.login);

    if (!userExist) {
      new Toaster({
        text: 'Такого пользователя нет',
        title: 'Ошибка',
      }).renderInRoot();
      return;
    }

    await chatControl.addUsersToChat(userExist.id, chatId);

    const userInChat = await chatControl.getChatUsers(chatId);

    chatInfo.setProps({
      count: userInChat.length,
    });
  } catch (error) {
    new Toaster({
      text: error as string,
      title: 'Ошибка',
    }).renderInRoot();
  } finally {
    Modal.close();
  }
}
