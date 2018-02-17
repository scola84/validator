export default {
  validator: {
    error: {
      long: {
        400: {
          checkbox: 'Selecteer minstens één %(name)s.',
          empty: 'Het veld "%(name)s" mag niet leeg zijn.',
          length: 'Het veld "%(name)s" moet %(length)s tekens lang zijn.',
          radio: 'Selecteer een %(name)s.',
          range: 'Het veld "%(name)s" moet een waarde van %(range)s hebben.',
          regexp: 'Het veld "%(name)s" bevat een onjuiste waarde.',
          type: 'Het veld "%(name)s" moet %(type)s zijn.'
        }
      }
    },
    type: {
      date: 'een datum',
      email: 'een e-mailadres',
      integer: 'een geheel getal',
      select: 'ingevuld',
      text: 'een tekst',
      textarea: 'een tekst'
    }
  }
};
