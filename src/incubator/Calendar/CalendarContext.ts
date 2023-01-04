import {createContext} from 'react';
import {CalendarContextProps, FirstDayOfWeek} from './types';

const CalendarContext = createContext<CalendarContextProps>({
  firstDayOfWeek: FirstDayOfWeek.Monday
});

export default CalendarContext;
