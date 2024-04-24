import { Button } from '../../../templates/button';
import { InputProps } from '../../../templates/input';
import { Title } from '../../../templates/title';

const inputs: InputProps[] = [
	{
		inputId: 'email',
		inputType: 'text',
		labelText: 'Email',
		placeholder: 'Введите вашу почту',
	},
	{
		inputId: 'password',
		inputType: 'password',
		labelText: 'Пароль',
		placeholder: 'Введите ваш пароль',
	},
];

export const FromWrapper = () => {
	return `
    <div>
      ${Title({
				titleText: 'Вход',
				children: `<p>Новый участник? <a>Зарегистрируйся бесплатно</a></p>`,
			})}

      <a>Забыли пароль?</a>
      ${Button({
				btnText: 'Войти',
				btnType: 'submit',
			})}
    </div>
  `;
};
