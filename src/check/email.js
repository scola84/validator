/* eslint no-useless-escape: 0 */

import TextCheck from './text';
const regexp = /^[a-z0-9\-\(\)]+$/i;

export default class EmailCheck extends TextCheck {
  check(field, value) {
    if (field.strict === false) {
      return super.check(field, value);
    }

    const [local = '', domain = ''] = value.split('@');

    if (local.length === 0) {
      return false;
    }

    if (domain.length === 0 || this._checkDomain(domain) === false) {
      return false;
    }

    return value;
  }

  _checkDomain(domain) {
    return domain.split('.').every((part) => {
      return regexp.test(part) === true &&
        part[0] !== '-' &&
        part[part.length - 1] !== '-';
    });
  }
}
