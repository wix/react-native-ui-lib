import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from "../../commons/new";
import View from "../../components/view";
import CalendarContext from "./CalendarContext";
import Month from "./Month";
import Header from "./Header";
const CALENDAR_HEIGHT = Constants.isAndroid ? 280 : 270;
function CalendarItem(props) {
  const {
    year,
    month
  } = props;
  const {
    staticHeader,
    headerHeight
  } = useContext(CalendarContext);
  const calendarStyle = useMemo(() => {
    // TODO: dynamic height: calc calendar height with month's number of weeks
    return [styles.container, {
      height: CALENDAR_HEIGHT - (staticHeader ? headerHeight.value : 0)
    }];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticHeader]);
  if (month !== undefined) {
    return <View style={calendarStyle}>
        {!staticHeader && <Header month={month} year={year} />}
        <Month month={month} year={year} />
      </View>;
  }
  return null;
}
export default React.memo(CalendarItem);
const styles = StyleSheet.create({
  container: {
    width: Constants.windowWidth,
    borderBottomWidth: 1
  }
});