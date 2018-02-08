import CheckboxCheck from './checkbox';
import DateCheck from './date';
import EmailCheck from './email';
import IntegerCheck from './integer';
import PasswordCheck from './password';
import RadioCheck from './password';
import RegexpCheck from './regexp';
import SelectCheck from './select';
import TextCheck from './text';

export default {
  date: new DateCheck(),
  checkbox: new CheckboxCheck(),
  email: new EmailCheck(),
  integer: new IntegerCheck(),
  password: new PasswordCheck(),
  radio: new RadioCheck(),
  regexp: new RegexpCheck(),
  select: new SelectCheck(),
  text: new TextCheck()
};
