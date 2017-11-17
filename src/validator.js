import { Worker } from '@scola/worker';
import EmailValidator from './validator/email';
import IntegerValidator from './validator/integer';
import TextValidator from './validator/text';

const validators = {
  email: new EmailValidator(),
  integer: new IntegerValidator(),
  text: new TextValidator()
};

export default class Validator extends Worker {
  constructor(methods) {
    super(methods);

    this._filter = (m, d) => d;
    this._structure = null;
  }

  setFilter(value) {
    this._filter = value;
    return this;
  }

  setStructure(value) {
    this._structure = value;
    return this;
  }

  act(message, data, callback) {
    this._structure
      .filter((section) => section.fields)
      .forEach((section) => {
        this._validateFields(section.fields,
          this._filter(message, data));
      });

    this.pass(message, data, callback);
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
      this._throwError('Field is empty', field);
    }
  }

  _validateType(field, value) {
    if (validators[field.type]) {
      if (validators[field.type].validate(field, value) === false) {
        this._throwError('Field is invalid', field);
      }
    }
  }
}
