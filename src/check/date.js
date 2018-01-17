export default class DateCheck {
  check(field, value) {
    return Number.isInteger(value) === false ? false : value;
  }
}
