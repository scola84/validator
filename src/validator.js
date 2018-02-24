import { Worker } from '@scola/worker';
import check from './check';

export default class Validator extends Worker {
  constructor(options = {}) {
    super(options);

    this._structure = null;
    this.setStructure(options.structure);
  }

  setStructure(value = null) {
    this._structure = value;
    return this;
  }

  act(box, data, callback) {
    const result = this.filter(box, data);

    for (let i = 0; i < this._structure.length; i += 1) {
      if (this._structure[i].fields) {
        this._validateFields(this._structure[i].fields, result);
      }
    }

    this.merge(box, data, result);
    this.pass(box, data, callback);
  }

  decide(box, data) {
    if (this._decide) {
      return this._decide(box, data);
    }

    return Array.isArray(this._structure);
  }

  _checkArray(field, value) {
    if (Array.isArray(value) === false) {
      return this._throwError(field, 'array');
    }

    for (let i = 0; i < value.length; i += 1) {
      value[i] = this._checkType(field, value[i]);
    }

    return value;
  }

  _checkLength(field, value) {
    value = String(value);
    const [min, max] = String(field.length).split('-');

    if (typeof max === 'undefined' && value.length !== Number(min)) {
      this._throwError(field, 'length');
    }

    if (min && value.length < Number(min)) {
      this._throwError(field, 'length');
    }

    if (max && value.length > Number(max)) {
      this._throwError(field, 'length');
    }
  }

  _checkRange(field, value) {
    value = String(value);
    const [min, max] = String(field.range).split('-');

    if (min && Number(value) < Number(min)) {
      this._throwError(field, 'range');
    }

    if (max && Number(value) > Number(max)) {
      this._throwError(field, 'range');
    }
  }

  _checkRegexp(field, value) {
    if (field.regexp.test(value) === false) {
      this._throwError(field, 'regexp');
    }
  }

  _checkRequired(field, value) {
    if (typeof value === 'undefined' || value.length === 0) {
      this._throwError(field, 'empty');
    }
  }

  _checkType(field, value) {
    if (field.length) {
      this._checkLength(field, value);
    }

    if (field.range) {
      this._checkRange(field, value);
    }

    if (field.regexp) {
      this._checkRegexp(field, value);
    }

    const result = check[field.type].check(field, value);

    if (result === false) {
      return this._throwError(field, 'type');
    }

    return field.cast === true ? result : value;
  }

  _isEmpty(value) {
    return typeof value === 'undefined' ||
      value === null ||
      value === '';
  }

  _throwError(field, reason) {
    const error = new Error('400');

    error.field = field;
    error.reason = reason;

    if (field.type === 'checkbox' || field.type === 'radio') {
      delete error.reason;
    }

    throw error;
  }

  _validateField(field, data) {
    const value = data[field.name];

    if (this._isEmpty(value) === true) {
      if (field.required === true) {
        this._checkRequired(field, value);
      } else if (typeof field.default !== 'undefined') {
        data[field.name] = field.default;
      }

      return;
    }

    if (field.array === true) {
      data[field.name] = this._checkArray(field, value);
      return;
    }

    data[field.name] = this._checkType(field, value);
  }

  _validateFields(fields, data) {
    for (let i = 0; i < fields.length; i += 1) {
      this._validateField(fields[i], data);
    }
  }
}
