import {createContext} from 'react';
import {type CalendarContextProps, FirstDayOfWeek} from './types';

// @ts-ignore
const CalendarContext = createContext<CalendarContextProps>({
  firstDayOfWeek: FirstDayOfWeek.MONDAY
});

export default CalendarContext;
