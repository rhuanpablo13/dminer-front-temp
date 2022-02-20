import moment from 'moment'
export const FORMAT_DATE = 'DD/MM/YYYY'

export const dateNowFormart = () => {
  const now = new Date()

  return moment(now).format(FORMAT_DATE)
}

export const dateHourFormart = (date) => {
  return moment(date).format('DD/MM/YYYY hh:mm')
}

export const mounthCurrent = () => new Date().getMonth() + 1

export const dateFormart = (date) => moment(date).format(FORMAT_DATE)

export const dayMounthFormart = (date) => moment(date).format('DD/MM')

export const dateHourFormarUs = (date) =>
  moment(date).format('YYYY-MM-DD hh:mm:ss')

export const diffDate = (date1, date2) =>  moment(date2,"DD/MM/YYYY HH:mm:ss").diff(moment(date1,"DD/MM/YYYY HH:mm:ss"))

export const minDateNow = () => {
  var date = new Date();
  return date.setDate(date.getDate() - 1);
}