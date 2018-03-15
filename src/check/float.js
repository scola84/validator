export default class FloatCheck {
  check(field, value) {
    return Number(value) === parseFloat(value);
  }
}
