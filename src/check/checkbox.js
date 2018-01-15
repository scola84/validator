export default class CheckboxCheck {
  check(field, value) {
    return typeof value !== 'string' ? false : value;
  }
}
