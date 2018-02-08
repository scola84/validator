export default class SelectCheck {
  check(field, value) {
    return field.value.indexOf(value) !== -1;
  }
}
