const minimumDegrees = [
  {
    label: 'Quereinstieg (ohne Abschluss)',
    value: 'quereinstieg_ohne_abschluss'
  },
  {
    label: 'Quereinstieg (mit Abschluss)',
    value: 'quereinstieg_mit_abschluss'
  },
  { label: 'Hauptschulabschluss', value: 'hauptschulabschluss' },
  { label: 'Mittlere Reife (Realschulabschluss)', value: 'mittlere_reife' },
  { label: 'Fachhochschulreife (Fachabitur)', value: 'fachhochschulreife' },
  {
    label: 'Allgemeine Hochschulreife (Abitur)',
    value: 'allgemeine_hochschulreife'
  },
  { label: 'Ausbildung (im geforderten Berufsbild)', value: 'ausbildung' },
  { label: 'Techniker (im geforderten Berufsbild)', value: 'techniker' },
  { label: 'Meister (im geforderten Berufsbild)', value: 'meister' },
  { label: 'Bachelor (im geforderten Berufsbild)', value: 'bachelor' },
  { label: 'Master (im geforderten Berufsbild)', value: 'master' },
  { label: 'Doktor (im geforderten Berufsbild)', value: 'doktor' }
]

export default minimumDegrees

export const getDegreeLabel = value => {
  const degree = minimumDegrees.find(item => item.value === value)
  return degree && degree.label
}
