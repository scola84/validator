export default {
  validator: {
    error: {
      long: {
        400: {
          checkbox: 'Selecteer minstens één %s.',
          empty: 'Het veld "%s" mag niet leeg zijn.',
          type: 'Het veld "%s" moet %s zijn.'
        }
      }
    },
    type: {
      email: 'een e-mailadres',
      integer: 'een geheel getal',
      text: 'een tekst'
    }
  }
};
