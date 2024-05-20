## Web Chat

1. Ссылка на прототип - https://www.figma.com/file/9eoZMOD7E2RUeCKyFWNbNF/Untitled?type=design&node-id=0-1&mode=design&t=ArAVyHG4znK8KrrW-0

2. Я переписал шаблонизатор, так как предыдущая версия показалась мне слишком сложной и неудобной. В новой реализации структура папок организована следующим образом:

- utils — различные функции и объекты/массивы для инпутов.
- templates — переиспользуемые компоненты.
- styles — стили, разделенные на несколько файлов.
- server — остался без изменений.
- pages — содержит TypeScript файлы для каждой страницы.
- core — классы шаблонизатора, блока, автобуса и xhr.
- components — компоненты проекта.

Я подключил сборку на eslint

3. На текущий момент, тип children в классе Block имеет вид Record<string, any>. Я еще не нашел оптимальный способ типизации и пытался использовать дженерики, однако сталкивался с различными багами от TypeScript.

4. Также, я оставил дополнительную проверку полей на событие blur при смене пароля. Сейчас это реализовано через три обработчика: на враппер и на инпуты. Понимаю, что это не самое оптимальное решение, но пока оно работает таким образом.

5. Ссылки из Netlify

- Login Page - https://deploy--resilient-profiterole-7280c9.netlify.app/login
- Signup Page - https://deploy--resilient-profiterole-7280c9.netlify.app/signup
- 404 - https://deploy--resilient-profiterole-7280c9.netlify.app/404
- 505 - https://deploy--resilient-profiterole-7280c9.netlify.app/505
- Изменить пользователя - https://deploy--resilient-profiterole-7280c9.netlify.app/profile
- Чаты - https://deploy--resilient-profiterole-7280c9.netlify.app/chat

6. Вопросы:

1) Как лучше типизировать children у Block? Полагаю, что это нужно сделать с помощью дженериков, но пока не нашел правильного подхода. Был бы рад получить рекомендации или наводки по этому вопросу.
