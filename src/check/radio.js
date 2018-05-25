export default class RadioCheck {
  check(field, value) {
    return typeof value !== 'string' &&
      typeof value !== 'number' ? false : value;
  }
}
