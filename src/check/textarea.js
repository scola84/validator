export default class TextareaCheck {
  check(field, value) {
    return typeof value !== 'string' ? false : value;
  }
}
