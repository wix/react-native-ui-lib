import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export enum FirstDayOfWeek {
  Sunday = 0,
  Monday = 1,
  Saturday = 6
}

export interface Event {
  id: string;
  start: number;
  end: number;
}

export type Data = Event[];

export type DateSectionHeader = {
  header: string;
  date: number;
};

export type InternalEvent = (Event & {type: 'Event'}) | (DateSectionHeader & {type: 'Header'});

export type InternalData = InternalEvent[];

export interface CalendarContextProps {
  firstDayOfWeek: FirstDayOfWeek;
  selectedDate: SharedValue<number>;
  setDate: (date: number) => void;
  data: InternalData;
  showWeeksNumbers: boolean;
}

export interface DayProps {
  date: number | null;
  onPress?: (date: number) => void;
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
  year?: number;
  month?: number;
}

export interface WeekDaysNamesProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  format?: /* `${DayNamesFormat}` &  */ DayNamesFormat; // NOTE: template literals usage depends on ts min version ^4.3.2
}

export enum DayNamesFormat {
  DEFAULT = 0,
  LONG_ABBREVIATION = 1,
  SHORT_ABBREVIATION = 2
}

export interface CalendarProps {
  data: Data;
  initialDate?: number;
  firstDayOfWeek?: /* `${FirstDayOfWeek}` &  */ FirstDayOfWeek; // NOTE: template literals usage depends on ts min version ^4.3.2
}

export interface AgendaProps {
  // Type: list(events)/timeline
  // layout:
  // scrollTo(date)
}
