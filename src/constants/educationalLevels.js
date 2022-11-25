export const all = [
  { value: 'hauptschulabschluss', label: 'Hauptschulabschluss', id: '1' },
  {
    value: 'mittlere_reife',
    label: 'Mittlere Reife (Realschulabschluss)',
    id: '2'
  },
  {
    value: 'fachhochschulreife',
    label: 'Fachhochschulreife (Fachabitur)',
    id: '3'
  },
  {
    value: 'allgemeine',
    label: 'Allgemeine Hochschulreife (Abitur)',
    id: '4'
  },
  {
    value: 'ausbildung',
    label: 'Ausbildung',
    id: '5'
  },
  {
    value: 'techniker',
    label: 'Techniker',
    id: '6'
  },
  {
    value: 'meister',
    label: 'Meister',
    id: '7'
  },
  {
    value: 'bachelor',
    label: 'Bachelor',
    id: '8'
  },
  {
    value: 'master',
    label: 'Master',
    id: '9'
  },
  {
    value: 'doktor',
    label: 'Doktor',
    id: '10'
  }
]

export const label = all

export const labelFor = key =>
  all.find(educationalLevel => educationalLevel.value === key).label
