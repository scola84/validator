import {
  formatNumber,
  parseNumber
} from 'libphonenumber-js';

export default class TelCheck {
  check(field, value, data) {
    if (typeof value !== 'string') {
      return false;
    }

    const [, country = ''] = (data.locale || '').split('_');

    const number = parseNumber(value, country, { extended: true });

    if (typeof number.valid === 'undefined') {
      return false;
    }

    if (number.valid === false && field.strict !== false) {
      return false;
    }

    return formatNumber(number, 'E.164');
  }
}
