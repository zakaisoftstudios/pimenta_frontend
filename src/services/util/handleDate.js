export const handleCorrectDate = (start) => {
  var date = new Date(start)
  return (
    new Date(date.getTime() - new Date().getTimezoneOffset()*60*1000*2).toLocaleDateString("en-US")
  )
}

export const handleDateBeforeCreate = (element) => {
  if (element['start']) var start = increaseDate(element['start'])
  if (element['start_date']) var start_date = increaseDate(element['start_date'])
  if (element['start_dates']) var start_date = increaseDates(element['start_dates'])
  if (element['end_date']) var end_date = increaseDate(element['end_date'])
  return (
    (end_date) ? {...element, start, end_date } : {...element, start_date }
  )
}

const increaseDate = (date) => {
  var date = new Date(date)
  return (
    new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*600000))
  )
}

const increaseDates = (dates) => {
  dates.map((date) => {
    increaseDate(date);
  })
}
