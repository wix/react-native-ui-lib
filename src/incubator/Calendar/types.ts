import {SharedValue} from 'react-native-reanimated';

export enum FirstDayOfWeekEnum {
  Sunday = 0,
  Monday = 1,
  Saturday = 6
}

export type FirstDayOfWeekUnion = 'Sunday' | 'Monday' | 'Saturday';

export type FirstDayOfWeek = FirstDayOfWeekEnum | FirstDayOfWeekUnion;

interface Event {
  id: string;
  start: number;
  end: number;
}

type Data = Event[];

export interface CalendarContextProps {
  firstDayOfWeek: FirstDayOfWeek;
  date: SharedValue<number>;
  setDate: (date: number) => void;
  data: Data;
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

export interface HeaderProps {}

export interface CalendarProps {
  data: Data;
  initialDate?: number;
  firstDayOfWeek?: `${FirstDayOfWeek}` & FirstDayOfWeek;
}

export interface AgendaProps {
  // Type: list(events)/timeline
  // layout:
  // scrollTo(date)
}
