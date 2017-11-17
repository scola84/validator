export default class IntegerValidator {
  validate(field, value) {
    return Number.isInteger(Number(value));
  }
}
