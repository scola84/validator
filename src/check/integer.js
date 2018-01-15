export default class IntegerCheck {
  check(field, value) {
    value = Number(value);

    return Number.isInteger(value) === false ?
      false : value;
  }
}
