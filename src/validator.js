import { Worker } from '@scola/worker';
import CheckboxValidator from './validator/checkbox';
import EmailValidator from './validator/email';
import IntegerValidator from './validator/integer';
import PasswordValidator from './validator/password';
import RegexpValidator from './validator/regexp';
import TextValidator from './validator/text';

const validators = {
  checkbox: new CheckboxValidator(),
  email: new EmailValidator(),
  integer: new IntegerValidator(),
  password: new PasswordValidator(),
  regexp: new RegexpValidator(),
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
    data = this.filter(box, data);

    this._structure
      .filter((section) => section.fields)
      .forEach((section) => {
        this._validateFields(section.fields, data);
      });

    this.pass(box, data, callback);
  }

  _throwError(reason, field) {
    const error = new Error('400');
    error.field = field;
    error.reason = reason;

    throw error;
  }

  _validateField(field, data) {
    const value = data[field.name];

    if (typeof value === 'undefined') {
      if (field.required === true) {
        this._validateRequired(field, value);
      } else if (typeof field.default !== 'undefined') {
        data[field.name] = field.default;
      }

      return;
    }

    if (field.array === true) {
      data[field.name] = this._validateArray(field, value);
      return;
    }

    data[field.name] = this._validateType(field, value);
  }

  _validateArray(field, value) {
    if (Array.isArray(value) === false) {
      return this._throwError('array', field);
    }

    for (let i = 0; i < value.length; i += 1) {
      value[i] = this._validateType(field, value[i]);
    }

    return value;
  }

  _validateFields(fields, data) {
    fields.forEach((field) => {
      this._validateField(field, data);
    });
  }

  _validateRequired(field, value) {
    if (typeof value === 'undefined' || value.length === 0) {
      this._throwError('empty', field);
    }
  }

  _validateType(field, value) {
    const result = validators[field.type].validate(field, value);

    if (result === false) {
      return this._throwError('type', field);
    }

    return field.cast === true ? result : value;
  }
}
