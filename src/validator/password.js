export default class PasswordValidator {
  validate(field, value) {
    return typeof value !== 'string' ? false : value;
  }
}
