export default class PasswordCheck {
  check(field, value) {
    return typeof value !== 'string' ? false : value;
  }
}
