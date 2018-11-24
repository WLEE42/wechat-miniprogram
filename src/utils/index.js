function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()

  const t2 = [hour, minute].map(formatNumber).join(':')

  return `${t2}`
}

export function formatDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const t1 = [year, month, day].map(formatNumber).join('-')

  return `${t1}`
}
export default {
  formatNumber,
  formatTime,
  formatDate
}
