export default class TextCheck {
  check(field, value) {
    if (typeof value !== 'string') {
      return false;
    }

    if (field.clean) {
      value = value.trim();
    }

    return value;
  }
}
