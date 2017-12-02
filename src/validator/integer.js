export default class IntegerValidator {
  validate(field, value) {
    value = Number(value);
    return Number.isInteger(value) === false ? false : value;
  }
}
