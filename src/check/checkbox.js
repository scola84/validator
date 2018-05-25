export default class CheckboxCheck {
  check(field, value) {
    return typeof value !== 'string' &&
      typeof value !== 'number' ? false : value;
  }
}
