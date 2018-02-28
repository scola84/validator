export default class FileCheck {
  check(field, value) {
    if (String(value.name || '').length === 0) {
      return false;
    }

    if (typeof field.accept !== 'undefined') {
      const accept = field.accept.split(',');
      const [fileType, fileSubType] = value.type.split('/');

      for (let i = 0; i < accept.length; i += 1) {
        const [type, subtype] = accept[i].split('/');

        if (type !== '*' && fileType !== type) {
          return false;
        }

        if (subtype !== '*' && fileSubType !== subtype) {
          return false;
        }
      }
    }

    if (typeof field.maxsize !== 'undefined') {
      if (value.size > field.maxsize) {
        return false;
      }
    }

    return value;
  }
}
