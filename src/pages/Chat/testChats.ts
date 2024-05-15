import { ChatProps } from '@/components/chat';

export const testChatsArray: ChatProps[] = [
	{
		chatId: 1,
		userImg: null,
		userName: 'Вася',
		userLastMessage: 'Пока',
		lastMessageDate: '17:20',
		isNewMessage: '2',
	},
	{
		chatId: 2,
		userImg: null,
		userName: 'Женя',
		userLastMessage: 'Привет',
		lastMessageDate: '16:20',
		isNewMessage: false,
	},
	{
		chatId: 3,
		userImg: null,
		userName: 'Паша',
		userLastMessage: 'Как дела?',
		lastMessageDate: '14:20',
		isNewMessage: false,
	},
	{
		chatId: 4,
		userImg: null,
		userName: 'Маша',
		userLastMessage: 'Привет',
		lastMessageDate: '13:20',
		isNewMessage: false,
	},
	{
		chatId: 5,
		userImg: null,
		userName: 'Гриша',
		userLastMessage: 'Как дела?',
		lastMessageDate: '12:20',
		isNewMessage: false,
	},
];

export const conversationWithUser = [
	{
		chatId: 1,
		userImg: null,
		userName: 'Вася',
		messages: [
			{
				user: ['Привет!', 'Давно не виделись! Как дела?']
			},
			{
				other: ['Привет! Все круто, ты как?'],
			}
		]
	},
	{
		chatId: 2,
		userImg: null,
		userName: 'Женя',
		messages: [
			{
				user: ['Привет!', 'Что делаешь?']
			},
			{
				other: ['Привет! Собираюсь пойти гулять', 'А ты?', 'Ау, чего молчишь?'],
			}
		]
	},
	{
		chatId: 3,
		userImg: null,
		userName: 'Паша',
		messages: [
			{
				other: ['Привет!', 'Занят?'],
			}
		]
	},
	{
		chatId: 4,
		userImg: null,
		userName: 'Маша',
		messages: [
			{
				other: ['Приветулики']
			}
		]
	},
	{
		chatId: 5,
		userImg: null,
		userName: 'Гриша',
		messages: [
			{
				user: ['Покачурики']
			}
		]
	},
]