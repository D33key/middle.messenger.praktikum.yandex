import { inputsVariation } from '../../utils/inputsVariation/inputsVariation';

export const userInfoInputsObj = {
  emailInput: {
    ...inputsVariation.email,
    classNameInput: 'userinfo',
  },
  loginInput: {
    ...inputsVariation.login,
    classNameInput: 'userinfo',
  },
  firstNameInput: {
    ...inputsVariation.firstName,
    classNameInput: 'userinfo',
  },
  secondNameInput: {
    ...inputsVariation.secondName,
    classNameInput: 'userinfo',
  },
  nicknameInput: {
    ...inputsVariation.nicknameInput,
    classNameInput: 'userinfo',
  },
  phoneInput: {
    ...inputsVariation.phone,
    classNameInput: 'userinfo',
  },
};
