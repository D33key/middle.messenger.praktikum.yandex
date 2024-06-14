import Button, { EventsProps } from '../button';
import InputWrapper from '../input';

type BaseFormProps = {
  type: 'login' | 'signup';
  submitButton: Button;
} & EventsProps;

type LoginFormProps = {
  type: 'login';
  passwordInput: InputWrapper;
  loginInput: InputWrapper;
} & BaseFormProps;

type Signup = {
  type: 'signup';
  passwordInput: InputWrapper;
  emailInput: InputWrapper;
  loginInput: InputWrapper;
  firstNameInput: InputWrapper;
  secondNameInput: InputWrapper;
  phoneInput: InputWrapper;
} & BaseFormProps;

export type FormProps = LoginFormProps | Signup;
