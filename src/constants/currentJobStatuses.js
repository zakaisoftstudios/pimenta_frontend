const currentJobStatuses = [
  {
    label: 'Schüler',
    value: 'schuler'
  },
  {
    label: 'Student',
    value: 'student'
  },
  {
    label: 'Praktikant',
    value: 'praktikant'
  },
  { label: 'Trainee', value: 'trainee' },
  { label: 'teilzeitangestellt', value: 'teilzeitangestellt' },
  { label: 'vollzeitangestellt', value: 'vollzeitangestellt' },
  {
    label: 'arbeitsuchend',
    value: 'arbeitsuchend'
  }
]

export default currentJobStatuses

export const getCurrentJobStatusesLabel = value => {
  const currentJobStatus = currentJobStatuses.find(item => item.value === value)
  return currentJobStatus && currentJobStatus.label
}
