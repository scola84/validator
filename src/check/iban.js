import IBAN from 'iban';

export default class IbanCheck {
  check(field, value) {
    if (typeof value !== 'string') {
      return false;
    }

    const code = value.trim().toUpperCase().slice(0, 2);
    const specification = IBAN.countries[code];

    if (typeof specification === 'undefined') {
      return false;
    }

    value = value.replace(/\s+/g, '').slice(0, specification.length);

    if (IBAN.isValid(value) === false) {
      return false;
    }

    return IBAN.electronicFormat(value);
  }
}
