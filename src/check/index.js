import CheckboxCheck from './checkbox';
import DateCheck from './date';
import EmailCheck from './email';
import FileCheck from './file';
import FloatCheck from './float';
import IbanCheck from './iban';
import IntegerCheck from './integer';
import PasswordCheck from './password';
import RadioCheck from './radio';
import SelectCheck from './select';
import TelCheck from './tel';
import TextCheck from './text';
import TextareaCheck from './textarea';
import ZipCheck from './zip';

export default {
  date: new DateCheck(),
  checkbox: new CheckboxCheck(),
  email: new EmailCheck(),
  file: new FileCheck(),
  float: new FloatCheck(),
  iban: new IbanCheck(),
  integer: new IntegerCheck(),
  password: new PasswordCheck(),
  radio: new RadioCheck(),
  select: new SelectCheck(),
  tel: new TelCheck(),
  text: new TextCheck(),
  textarea: new TextareaCheck(),
  zip: new ZipCheck()
};
