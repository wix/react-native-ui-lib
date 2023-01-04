export type FirstDayOfWeek = 'Saturday' | 'Sunday' | 'Monday';

export interface CalendarContextProps {
  firstDayOfWeek: FirstDayOfWeek;
}

export interface DayProps {
  date: number | null;
}

export interface WeekProps {
  weekNumber: number;
  year: number;
}

export interface MonthProps {
  month: number;
  year: number;
}

export interface CalendarItemProps {
  weekNumber?: number;
  month?: number;
  year: number;
}

export interface HeaderProps {
  month?: number;
  year: number;
}

export interface CalendarProps {}
