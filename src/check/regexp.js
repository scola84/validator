export default class RegexpCheck {
  check(field, value) {
    return field.regexp.test(value) === false ? false : value;
  }
}
