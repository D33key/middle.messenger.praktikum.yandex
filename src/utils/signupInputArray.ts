import InputWrapper from '@/templates/input';
import { inputsVariation } from './inputsVariation/inputsVariation';

export const signupInputObj = {
  emailInput: new InputWrapper(inputsVariation.email),
  loginInput: new InputWrapper(inputsVariation.login),
  firstNameInput: new InputWrapper(inputsVariation.firstName),
  secondNameInput: new InputWrapper(inputsVariation.secondName),
  phoneInput: new InputWrapper(inputsVariation.phone),
  passwordInput: new InputWrapper(inputsVariation.password),
};
