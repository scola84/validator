export default class RegexpValidator {
  validate(field, value) {
    return field.regexp.test(value) === false ? false : value;
  }
}
