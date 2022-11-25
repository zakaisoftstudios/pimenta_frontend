import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const date = date => dayjs(date)

export const money = value =>
  value && value.toLocaleString('de', { style: 'currency', currency: 'EUR' })

export const number = value => value && value.toLocaleString()

export const percentage = value => value && `${Math.round(value)}%`

export const distance = value => {
  if (typeof value !== 'undefined') {
    const rounded = Math.round(value)
    return `${rounded.toLocaleString()} km`
  }
}
