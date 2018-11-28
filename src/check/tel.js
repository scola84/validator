import {
  parsePhoneNumber
} from 'libphonenumber-js';

export default class TelCheck {
  check(field, value, data) {
    try {
      return this._check(field, value, data);
    } catch (error) {
      return false;
    }
  }

  _check(field, value, data) {
    if (typeof value !== 'string') {
      return false;
    }

    const [, country = ''] = (data.locale || '').split('_');

    const number = parsePhoneNumber(value, country);

    if (number.isValid() === false && field.strict !== false) {
      return false;
    }

    return number.format('E.164');
  }
}
