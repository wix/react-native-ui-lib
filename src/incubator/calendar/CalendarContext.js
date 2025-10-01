import { createContext } from 'react';
import { FirstDayOfWeek } from "./types";

// @ts-ignore
const CalendarContext = createContext({
  firstDayOfWeek: FirstDayOfWeek.MONDAY
});
export default CalendarContext;