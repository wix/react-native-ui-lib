import {createContext} from 'react';
import {CalendarContextProps, FirstDayOfWeek} from './types';

// @ts-ignore
const CalendarContext = createContext<CalendarContextProps>({
  firstDayOfWeek: FirstDayOfWeek.MONDAY
});

export default CalendarContext;
