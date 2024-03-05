declare module "calendar" {
  export interface ICalendarItem {
    date: Date;
    day: number;
    isToday?: boolean;
    isPrevMonth?: boolean;
    isCurrMonth?: boolean;
    isNextMonth?: boolean;
  }
}
