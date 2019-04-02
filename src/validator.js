import { Worker } from '@scola/worker';
import check from './check';

export default class Validator extends Worker {
  static isEmpty(value) {
    return typeof value === 'undefined' ||
      value === null ||
      value === '';
  }

  static isObject(value) {
    return typeof value === 'object' &&
      Array.isArray(value) === false &&
      value !== null;
  }

  constructor(options = {}) {
    super(options);

    this._extract = null;
    this._structure = null;

    this.setExtract(options.extract);
    this.setStructure(options.structure);
  }

  setExtract(value = (s) => s) {
    this._extract = value;
    return this;
  }

  setStructure(value = null) {
    this._structure = value;
    return this;
  }

  act(box, data, callback) {
    const result = this.filter(box, data);
    let structure = this._extract(box.structure || this._structure);

    if (typeof structure === 'function') {
      structure = structure(box, data);
    }

    for (let i = 0; i < structure.length; i += 1) {
      if (structure[i].fields) {
        this._setDefaults(structure[i].fields, box, data, result);
      }
    }

    for (let i = 0; i < structure.length; i += 1) {
      if (structure[i].fields) {
        this._authorizeFields(structure[i].fields, box, data, result);
        this._validateFields(structure[i].fields, box, data, result);
      }
    }

    data = this.merge(box, data, result);

    this.pass(box, data, callback);
  }

  decide(box, data) {
    if (this._decide) {
      return this._decide(box, data);
    }

    return true;
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

  _checkArray(field, value, result) {
    if (Array.isArray(value) === false) {
      return this._throwError(field, 'array', result);
    }

    for (let i = 0; i < value.length; i += 1) {
      value[i] = this._checkType(field, value[i], result);
    }

    return value;
  }

  _checkCustom(field, value, result) {
    const checked = field.custom(value, result);

    if (checked === false) {
      this._throwError(field, 'custom', result);
    }
  }

  _checkLength(field, value, result) {
    value = String(value);
    const [min = null, max = null] = field.length;

    if (min !== null && value.length < Number(min)) {
      this._throwError(field, 'length', result);
    }

    if (max !== null && value.length > Number(max)) {
      this._throwError(field, 'length', result);
    }
  }

  _checkRange(field, value, result) {
    value = Number(value);
    const [min = null, max = null] = field.range;

    if (min !== null && value < min) {
      this._throwError(field, 'range', result);
    }

    if (max !== null && value > max) {
      this._throwError(field, 'range', result);
    }
  }

  _checkRegexp(field, value, result) {
    if (field.regexp.test(value) === false) {
      this._throwError(field, 'regexp', result);
    }
  }

  _checkType(field, value, result) {
    if (typeof field.length !== 'undefined') {
      this._checkLength(field, value, result);
    }

    if (typeof field.range !== 'undefined') {
      this._checkRange(field, value, result);
    }

    if (typeof field.regexp !== 'undefined') {
      this._checkRegexp(field, value, result);
    }

    if (typeof field.custom !== 'undefined') {
      this._checkCustom(field, value, result);
    }

    const checked = check[field.type].check(field, value, result);

    if (checked === false) {
      return this._throwError(field, 'type', result);
    }

    return field.cast === true || field.clean === true ? checked : value;
  }

  _setDefault(field, box, data, result) {
    if (typeof field.default === 'undefined') {
      return;
    }

    const value = result[field.name];

    if (Validator.isEmpty(value) === false) {
      return;
    }

    let def = field.default;

    if (typeof def === 'function') {
      def = def(box, result, value);
    }

    if (Validator.isObject(def) === true) {
      def = def[value];
    }

    result[field.name] = def;
  }

  _setDefaults(fields, box, data, result) {
    for (let i = 0; i < fields.length; i += 1) {
      this._setDefault(fields[i], box, data, result);
    }
  }

  _throwError(field, reason, result) {
    const error = new Error('400 Input not valid');

    error.field = field;
    error.reason = reason;
    error.result = result;

    if (field.type === 'checkbox' || field.type === 'radio') {
      delete error.reason;
    }

    throw error;
  }

  _validateField(field, box, data, result) {
    let value = result[field.name];

    if (typeof field.clean === 'function') {
      value = field.clean(value, result);
    }

    if (this._log === 'check') {
      console.log(field.name, value);
    }

    if (Validator.isEmpty(value) === true) {
      let required = field.required;

      if (typeof required === 'function') {
        required = required(box, data);
      }

      if (typeof field.permission !== 'undefined') {
        required = box.user &&
          box.user.may(field.permission, box, data) ?
          required :
          false;
      }

      if (required === true) {
        this._throwError(field, 'empty', result);
      }

      return;
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
