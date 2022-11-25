import dayjs from 'dayjs'

export const age = dateOfBirth => dayjs().diff(dayjs(dateOfBirth), 'year')
