export default class TextValidator {
  validate(field, value) {
    return typeof value !== 'string' ? false : value;
  }
}
