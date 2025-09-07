import _map from "lodash/map";
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from "../../commons/new";
import { useThemeProps } from "../../hooks";
import View from "../view";
import WheelPicker from "../WheelPicker";
/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */

const SectionsWheelPicker = props => {
  const themeProps = useThemeProps(props, 'SectionsWheelPicker');
  const {
    sections,
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle,
    disableRTL,
    testID
  } = themeProps;
  const wheelPickerProps = {
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle
  };
  const shouldDisableRTL = useMemo(() => {
    return Constants.isRTL && disableRTL;
  }, [disableRTL]);
  const renderSections = () => _map(sections, (section, index) => {
    return <WheelPicker disableRTL={shouldDisableRTL} key={index} testID={`${testID}.${index}`} {...wheelPickerProps} {...section} />;
  });
  return <View row centerH style={shouldDisableRTL && styles.disableRTL} testID={testID}>
      {renderSections()}
    </View>;
};
SectionsWheelPicker.displayName = 'SectionsWheelPicker';
export default SectionsWheelPicker;
const styles = StyleSheet.create({
  disableRTL: {
    flexDirection: 'row-reverse'
  }
});