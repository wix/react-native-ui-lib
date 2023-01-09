import {StyleProp, TextStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export enum FirstDayOfWeek {
  Sunday = 0,
  Monday = 1,
  Saturday = 6
}

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

export interface WeekDaysNamesProps {
  textStyle?: StyleProp<TextStyle>;
  format?: `${DayNamesFormat}` & DayNamesFormat; // NOTE: `${DayNamesFormat}` usage depends on ts min version
}

export enum DayNamesFormat {
  DEFAULT = 0,
  LONG_ABBREVIATION = 1,
  SHORT_ABBREVIATION = 2,
}

export interface CalendarProps {
  data: Data;
  initialDate?: number;
  firstDayOfWeek?: `${FirstDayOfWeek}` & FirstDayOfWeek; // NOTE: `${FirstDayOfWeek}` usage depends on ts min version
}

export interface AgendaProps {
  // Type: list(events)/timeline
  // layout:
  // scrollTo(date)
}
