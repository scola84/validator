import {
  formatNumber,
  isValidNumber,
  parseNumber
} from 'libphonenumber-js';

export default class TelCheck {
  check(field, value, data) {
    if (typeof value !== 'string') {
      return false;
    }

    const [, country] = (data.locale || '').split('_');

    if (typeof country !== 'string' && country.length !== 2) {
      return false;
    }

    if (isValidNumber(value, country) === false) {
      return false;
    }

    return formatNumber(parseNumber(value, country), 'E.164');
  }
}
