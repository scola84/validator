export default {
  validator: {
    error: {
      long: {
        400: {
          checkbox: 'Selecteer minstens één %(name)s.',
          empty: 'Het veld "%(name)s" mag niet leeg zijn.',
          length: 'Het veld "%(name)s" moet %(length)s tekens lang zijn.',
          radio: 'Selecteer een %(name)s.',
          range: {
            max: 'Het veld "%(name)s" mag niet groter dan %(max)s zijn.',
            min: 'Het veld "%(name)s" mag niet kleiner dan %(min)s zijn.',
            minmax: 'Het veld "%(name)s" moet een waarde tussen %(min)s en %(max)s zijn.'
          },
          regexp: 'Het veld "%(name)s" bevat een onjuiste waarde.',
          type: 'Het veld "%(name)s" moet %(type)s zijn.'
        }
      }
    },
    type: {
      date: 'een datum',
      email: 'een e-mailadres',
      file: 'een bestand',
      iban: 'een rekeningnummer',
      integer: 'een geheel getal',
      select: 'ingevuld',
      tel: 'een telefoonnummer',
      text: 'een tekst',
      textarea: 'een tekst',
      zip: 'een postcode'
    }
  }
};
