export default class RadioCheck {
  check(field, value) {
    return typeof value !== 'string' ? false : value;
  }
}
