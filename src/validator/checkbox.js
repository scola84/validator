export default class CheckboxValidator {
  validate(field, value) {
    return typeof value === 'string';
  }
}
