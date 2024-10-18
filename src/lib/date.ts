import moment from 'moment-timezone';

export function formatDate(date: Date, format = 'DD/MM/YYYY HH:mm') {
  return moment(date).format(format);
}

export function formatDateWithTimezone(date: Date, format = 'DD/MM/YYYY HH:mm:ss z', timezone: string) {
  return moment(date).tz(timezone).format(format);
}

export function nowIsBefore(date: Date) {
  return moment().isBefore(date);
}
