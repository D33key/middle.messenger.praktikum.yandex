import Button, { EventsProps } from '../button';

export interface InputWrapperProps extends EventsProps {
  labelFor: string;
  labelText?: string;
  required?: boolean;
  inputType: 'text' | 'password' | 'email' | 'tel' | 'number' | 'file';
  minLength?: string;
  maxLength?: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  errorText?: string;
  value?: string;
  validationPattern?: RegExp;
  validationErrorText?: string;
  addResetBtn?: boolean;
  button?: Button;
}
