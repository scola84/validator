import CheckboxCheck from './checkbox';
import EmailCheck from './email';
import IntegerCheck from './integer';
import PasswordCheck from './password';
import RadioCheck from './password';
import RegexpCheck from './regexp';
import TextCheck from './text';

export default {
  checkbox: new CheckboxCheck(),
  email: new EmailCheck(),
  integer: new IntegerCheck(),
  password: new PasswordCheck(),
  radio: new RadioCheck(),
  regexp: new RegexpCheck(),
  text: new TextCheck()
};
