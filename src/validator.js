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
        this._authorizeFields(this._structure[i].fields, box, data, result);
        this._validateFields(this._structure[i].fields, box, data, result);
      }
    }

    data = this.merge(box, data, result);

    this.pass(box, data, callback);
  }

  decide(box, data) {
    if (this._decide) {
      return this._decide(box, data);
    }

    return typeof this._structure !== 'function';
  }

  _authorizeFields(fields, box, data, result) {
    let add = null;
    let field = null;

    for (let i = 0; i < fields.length; i += 1) {
      field = fields[i];

      add = typeof field.permission !== 'undefined' ?
        box.user && box.user.may(field.permission, box, data) :
        true;

      if (add === false) {
        delete result[field.name];
      }
    }
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

  _checkCustom(field, value, result) {
    const checked = field.custom(value, result);

    if (checked === false) {
      this._throwError(field, 'custom');
    }
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
    const [min, max] = field.range;

    if (min !== null && Number(value) < min) {
      this._throwError(field, 'range');
    }

    if (max !== null && Number(value) > max) {
      this._throwError(field, 'range');
    }
  }

  _checkRegexp(field, value) {
    if (field.regexp.test(value) === false) {
      this._throwError(field, 'regexp');
    }
  }

  _checkType(field, value, result) {
    if (typeof field.clean === 'function') {
      value = field.clean(value, result);
    }

    if (typeof field.length !== 'undefined') {
      this._checkLength(field, value);
    }

    if (typeof field.range !== 'undefined') {
      this._checkRange(field, value);
    }

    if (typeof field.regexp !== 'undefined') {
      this._checkRegexp(field, value);
    }

    if (typeof field.custom !== 'undefined') {
      this._checkCustom(field, value, result);
    }

    const checked = check[field.type].check(field, value, result);

    if (checked === false) {
      return this._throwError(field, 'type');
    }

    return field.cast === true || field.clean === true ? checked : value;
  }

  _isEmpty(value) {
    return typeof value === 'undefined' ||
      value === null ||
      value === '';
  }

  _throwError(field, reason) {
    const error = new Error('400 Input not valid');

    error.field = field;
    error.reason = reason;

    if (field.type === 'checkbox' || field.type === 'radio') {
      delete error.reason;
    }

    throw error;
  }

  _validateField(field, box, data, result) {
    let value = result[field.name];

    if (this._isEmpty(value) === true) {
      if (typeof field.default !== 'undefined') {
        value = typeof field.default === 'function' ?
          field.default(box, result) : field.default;
        result[field.name] = value;
      }

      if (this._isEmpty(value) === true) {
        let required = field.required;

        if (typeof field.permission !== 'undefined') {
          required = box.user && box.user.may(field.permission, box, data) ?
            required : false;
        }

        if (required === true) {
          this._throwError(field, 'empty');
        }

        return;
      }
    }

    if (field.array === true) {
      result[field.name] = this._checkArray(field, value, result);
      return;
    }

    result[field.name] = this._checkType(field, value, result);
  }

  _validateFields(fields, box, data, result) {
    for (let i = 0; i < fields.length; i += 1) {
      this._validateField(fields[i], box, data, result);
    }
  }
}
