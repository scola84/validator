/* eslint no-useless-escape: 0 */

const regexp = /^[a-z0-9\-\(\)]+$/i;

export default class EmailValidator {
  validate(field, value) {
    const [local = '', domain = ''] = value.split('@');

    if (local.length === 0) {
      return false;
    }

    if (domain.length === 0 || this._validateDomain(domain) === false) {
      return false;
    }

    return value;
  }

  _validateDomain(domain) {
    return domain.split('.').every((part) => {
      return regexp.test(part) === true &&
        part[0] !== '-' &&
        part[part.length - 1] !== '-';
    });
  }
}
