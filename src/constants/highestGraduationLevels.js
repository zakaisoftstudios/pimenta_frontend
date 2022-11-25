const values = [
  { value: 'hauptschulabschluss', label: 'Hauptschulabschluss' },
  {
    value: 'mittlere_reife',
    label: 'Mittlere Reife (Realschulabschluss)'
  },
  {
    value: 'fachhochschulreife',
    label: 'Fachhochschulreife (Fachabitur)'
  },
  {
    value: 'allgemeine',
    label: 'Allgemeine Hochschulreife (Abitur)'
  },
  {
    value: 'ausbildung',
    label: 'Ausbildung'
  },
  {
    value: 'techniker',
    label: 'Techniker'
  },
  {
    value: 'meister',
    label: 'Meister'
  },
  {
    value: 'bachelor',
    label: 'Bachelor'
  },
  {
    value: 'master',
    label: 'Master'
  },
  {
    value: 'doktor',
    label: 'Doktor'
  }
]

export const getHighestGraduationLevelLabel = value => {
  const found = values.find(item => item.value === value)
  return found && found.label
}

export default values
