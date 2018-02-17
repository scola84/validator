export default class SelectCheck {
  check(field, value) {
    return field.values.indexOf(value) !== -1;
  }
}
