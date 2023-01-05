import {createContext} from 'react';
import {CalendarContextProps} from './types';

const CalendarContext = createContext<CalendarContextProps>({
  firstDayOfWeek: 'Monday'
});

export default CalendarContext;
