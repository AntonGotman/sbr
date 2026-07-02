// 12 one-hour slots, 08:00–20:00, matching the source design exactly.
export const TIME_SLOTS = [
  '08.00 - 09.00',
  '09.00 - 10.00',
  '10.00 - 11.00',
  '11.00 - 12.00',
  '12.00 - 13.00',
  '13.00 - 14.00',
  '14.00 - 15.00',
  '15.00 - 16.00',
  '16.00 - 17.00',
  '17.00 - 18.00',
  '18.00 - 19.00',
  '19.00 - 20.00'
]

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

/** Default date from the design mockup — December 13, 2023 */
export const MOCK_DATE = '2023-12-13'

export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
