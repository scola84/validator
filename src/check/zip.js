import postalcodes from 'postal-codes-js';

export default class ZipCheck {
  check(field, value, data) {
    if (typeof value !== 'string') {
      return false;
    }

    if (typeof postalcodes !== 'undefined') {
      return postalcodes.validate(data.country_code, value) === true;
    }

    return true;
  }
}
