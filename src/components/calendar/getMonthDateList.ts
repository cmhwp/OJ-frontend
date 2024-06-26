import { type ICalendarItem } from './calendar'

// 每天的毫秒数
const DayMS = 24 * 60 * 60 * 1000

export function isEqualDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isEqualMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

/**
 * 获取当月的第一天
 * @param date
 */
export function getFirstDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * 获取当月的最后一天
 * @param date
 */
export function getLastDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * 获取上个月末尾的日期（需要显示在当月前面）
 * 1.获取所在月份的第一天FD及其星期FW（0表示星期日）
 * 2.向前推FW天即是上个月末尾的日期
 * @param date
 */
export function getPrevTailDateList(date: Date) {
  const dateList: Array<ICalendarItem> = []
  const firstDate = getFirstDate(date)
  const firstDateTime = firstDate.getTime()
  const firstDateWeek = firstDate.getDay()

  for (let i = 0; i < firstDateWeek; i++) {
    const currDate = new Date(firstDateTime - (i + 1) * DayMS)

    dateList.unshift({
      date: currDate,
      isPrevMonth: true,
      day: currDate.getDate()
    })
  }
  return dateList
}

/**
 *  获取下个月头部的日期（需要显示在当月后面）
 *  从EW向前推（6-EW）天即是下个月开始的所有信息
 * @param date
 * @param appendWeek 是否多获取一周
 */
export function getNextHeadDateList(date: Date, appendWeek: boolean) {
  const dateList: Array<ICalendarItem> = []
  const lastDate = getLastDate(date)
  const lastDateTime = lastDate.getTime()
  const lastDateWeek = lastDate.getDay()

  for (let i = 0; i < 6 - lastDateWeek + (appendWeek ? 7 : 0); i++) {
    const currDate = new Date(lastDateTime + (i + 1) * DayMS)

    dateList.push({
      date: currDate,
      isNextMonth: true,
      day: currDate.getDate()
    })
  }
  return dateList
}

/**
 * 获取当前月份所有的日期
 * 1.获取所在月份最后一天ED及其星期EW
 * 2.从FD到ED即为当前月份的所有日期
 * @param date
 */
export function getCurrMonthDateList(date: Date) {
  const dateList: Array<ICalendarItem> = []
  const firstDate = getFirstDate(date)
  const lastDate = getLastDate(date)

  const today = new Date()

  for (let i = 1; i < lastDate.getDate() + 1; i++) {
    const currDate = new Date(firstDate)
    currDate.setDate(i)

    dateList.push({
      date: currDate,
      isCurrMonth: true,
      day: currDate.getDate(),
      isToday: isEqualDate(currDate, today)
    })
  }
  return dateList
}

function getMonthDateList(date: Date) {
  const prevDateList = getPrevTailDateList(date)
  const currDateList = getCurrMonthDateList(date)
  const appendWeek = prevDateList.length + currDateList.length <= 35
  const nextDateList = getNextHeadDateList(date, appendWeek)

  return prevDateList.concat(currDateList).concat(nextDateList)
}

export function getNextMonthDate(date: Date) {
  let nextYear = date.getFullYear()
  let nextMonth = date.getMonth() + 1 + 1
  let nextDay = date.getDate()

  if (nextMonth === 13) {
    nextYear += 1
    nextMonth = 1
  }

  const lastDay = new Date(nextYear, nextMonth, 0).getDate()

  if (nextDay > lastDay) {
    nextDay = lastDay
  }
  return new Date(`${nextYear}/${nextMonth}/${nextDay}`)
}

export function getPrevMonthDate(date: Date) {
  let prevYear = date.getFullYear()
  let prevMonth = date.getMonth() + 1 - 1
  let prevDay = date.getDate()

  if (prevMonth === 0) {
    prevYear -= 1
    prevMonth = 12
  }

  const lastDay = new Date(prevYear, prevMonth, 0).getDate()

  if (prevDay > lastDay) {
    prevDay = lastDay
  }
  return new Date(`${prevYear}/${prevMonth}/${prevDay}`)
}

export default getMonthDateList
