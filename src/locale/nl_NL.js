export default {
  validator: {
    error: {
      long: {
        400: {
          checkbox: 'Selecteer minstens één %s.',
          empty: 'Het veld "%s" mag niet leeg zijn.',
          radio: 'Selecteer een %s.',
          type: 'Het veld "%s" moet %s zijn.'
        }
      }
    },
    type: {
      date: 'een datum',
      email: 'een e-mailadres',
      integer: 'een geheel getal',
      text: 'een tekst'
    }
  }
};
