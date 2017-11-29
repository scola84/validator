import { Worker } from '@scola/worker';
import CheckboxValidator from './validator/checkbox';
import EmailValidator from './validator/email';
import IntegerValidator from './validator/integer';
import PasswordValidator from './validator/password';
import TextValidator from './validator/text';

const validators = {
  checkbox: new CheckboxValidator(),
  email: new EmailValidator(),
  integer: new IntegerValidator(),
  password: new PasswordValidator(),
  text: new TextValidator()
};

export default class Validator extends Worker {
  constructor(methods) {
    super(methods);
    this._structure = null;
  }

  setStructure(value) {
    this._structure = value;
    return this;
  }

  act(box, data, callback) {
    this._structure
      .filter((section) => section.fields)
      .forEach((section) => {
        this._validateFields(section.fields, this.filter(box, data));
      });

    this.pass(box, data, callback);
  }

  _throwError(reason, field) {
    const error = new Error('400');
    error.field = field;
    error.reason = reason;

    throw error;
  }

  _validateField(field, value) {
    if (field.required === true) {
      this._validateRequired(field, value);
    } else if (typeof value === 'undefined') {
      return;
    }

    this._validateType(field, value);
  }

  _validateFields(fields, data) {
    fields.forEach((field) => {
      this._validateField(field, data[field.name]);
    });
  }

  _validateRequired(field, value) {
    if (typeof value !== 'string' || value.length === 0) {
      this._throwError('empty', field);
    }
  }

  _validateType(field, value) {
    if (validators[field.type]) {
      if (validators[field.type].validate(field, value) === false) {
        this._throwError('type', field);
      }
    }
  }
}
