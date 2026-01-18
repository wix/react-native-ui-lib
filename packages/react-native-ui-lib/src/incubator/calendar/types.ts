import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {ButtonProps} from '../../components/button';

export interface DateObject {
  timestamp: number;
  month: number;
  year: number;
  day: number;
  dayOfTheWeek: number;
}

export interface DateObjectWithDate {
  month: number;
  year: number;
  day: number;
}

export interface DateObjectWithOptionalDay {
  timestamp: number;
  month: number;
  year: number;
  day?: number;
}

export enum FirstDayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  SATURDAY = 6
}

export enum UpdateSource {
  INIT,
  DAY_SELECT,
  MONTH_ARROW,
  MONTH_SCROLL,
  WEEK_ARROW,
  WEEK_SCROLL,
  AGENDA_SCROLL,
  TODAY_PRESS,
  PROP_UPDATE
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
  setDate: (date: number, updateSource: UpdateSource) => void;
  data: InternalData;
  showWeeksNumbers: boolean;
  showExtraDays: boolean;
  updateSource: SharedValue<UpdateSource>;
  staticHeader?: boolean;
  setHeaderHeight?: (height: number) => void;
  headerHeight: SharedValue<number>;
  today: number;
}

export interface DayProps {
  date: number;
  onPress?: (date: number) => void;
  currentMonth?: number;
}

export interface WeekProps {
  weekNumber: number;
  year: number;
  month: number;
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

export interface TodayButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  buttonProps?: ButtonProps;
}

export interface WeekDaysNamesProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  format?: DayNamesFormat;
}

export enum DayNamesFormat {
  DEFAULT = 0,
  LONG_ABBREVIATION = 1,
  SHORT_ABBREVIATION = 2
}

export interface CalendarProps {
  data: Data;
  initialDate?: number;
  onChangeDate?: (date: number) => void;
  firstDayOfWeek?: FirstDayOfWeek;
  staticHeader?: boolean;
  showExtraDays?: boolean;
}

export interface AgendaProps {
  renderEvent?: (event: Event) => React.ReactElement<any> | null;
  renderHeader?: (header: DateSectionHeader) => React.ReactElement<any> | null;
  showLoader?: boolean;
  onEndReached?: (date: number) => void;
  // Type: list(events)/timeline
  // layout:
  // scrollTo(date)
}
