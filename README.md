## Figma дизайн

1. Ссылка на прототип - https://www.figma.com/file/9eoZMOD7E2RUeCKyFWNbNF/Untitled?type=design&node-id=0-1&mode=design&t=ArAVyHG4znK8KrrW-0

2. Попробовал создать свой шаблонизатор. Немного перемудрил с ним, поэтому скорее всего буду его править. Глаз немного замылился, поэтому было бы классно услышать какие-нибудь комментарии и ошибки, которые могут возникнуть в будущем.

Расположение:
**src**/**Templater**/**Slowact.ts**

Попробовал сделать что-то а-ля стейта в **State.ts** (в этой же папке). Это прям мега-супер-дупер демо.
Явная проблема - если я обновляю стейт, то у меня перерендеривается сам компонент и его дети, что логично, но и теряется все манипуляции, которые были сделаны с этим элементом.

P.S. Например, проверял смену видимости у пароля путем изменения с type='text' на type="password". Если ввести какие-то буквы, затем сменить видимость - текст сбрасывается, что логично. Пока не понимаю, как мне сохранять значение, чтобы перерендер сохранял их.

P.S.S. Изначально я делал шаблонизатор а-ля через DOMparser и поиск переменных через RegExp, но захотелось сделать немного по-другому (возможно по-глупому получилось :D).

3. Страницы сделаны так:
- **index.html** - страница Логина
- **signup.html** - страница Регистрации
- **not-found.html** - 404
- **server-error.html** - 505

4. Express настроил, но как-то костыльно получилось.
Что я имею в виду: если открыть package.json, то в "dev:server" можно увидеть строчку: **"nodemon -I --exec node --loader ts-node/esm ./src/server/server.ts"**. По каким-то неведомым причиным ts-node ./src/server/server.ts вообще никак не работал. Перерыл интернет, везде писали, что можно заменить type на commonjs либо еще что-то, но это вообще не помогало. То есть, строчка, которая выше, почему-то починило - честно, так и не понял, в чем причина. Предположу, что из-за --loader. Было бы классно, услышать мнение, почему ts-node не сработал, хотя должен был :/

5. Чтобы запустить проект:
- yarn
- yarn start (сформировать папку dist)

6. Ссылки из Netlify
- Login Page - https://deploy--resilient-profiterole-7280c9.netlify.app/pages/index.html
- Signup Page - https://deploy--resilient-profiterole-7280c9.netlify.app/pages/signup.html
- 404 - https://deploy--resilient-profiterole-7280c9.netlify.app/pages/not-found.html
- 505 - https://deploy--resilient-profiterole-7280c9.netlify.app/pages/505.html
- Изменить пользователя - https://deploy--resilient-profiterole-7280c9.netlify.app/pages/change-user.html
