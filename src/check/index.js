import CheckboxCheck from './checkbox';
import DateCheck from './date';
import EmailCheck from './email';
import FileCheck from './file';
import FloatCheck from './float';
import IntegerCheck from './integer';
import PasswordCheck from './password';
import RadioCheck from './password';
import SelectCheck from './select';
import TextCheck from './text';
import TextareaCheck from './textarea';

export default {
  date: new DateCheck(),
  checkbox: new CheckboxCheck(),
  email: new EmailCheck(),
  file: new FileCheck(),
  float: new FloatCheck(),
  integer: new IntegerCheck(),
  password: new PasswordCheck(),
  radio: new RadioCheck(),
  select: new SelectCheck(),
  text: new TextCheck(),
  textarea: new TextareaCheck()
};
