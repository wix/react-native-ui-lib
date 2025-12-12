import _ from 'lodash';
import React, {PropsWithChildren, useMemo} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import {Constants} from '../../commons/new';
import {useThemeProps} from '../../hooks';
import View from '../view';
import WheelPicker, {WheelPickerProps, WheelPickerItemValue} from '../WheelPicker';

export type SectionsWheelPickerProps<T = WheelPickerItemValue> = PropsWithChildren<{
  /**
   * Array of sections.
   */
  sections?: WheelPickerProps<T>[];
  /**
   * Describe the height of each item in the WheelPicker
   * default value: 44
   */
  itemHeight?: number;
  /**
   * Describe the number of rows visible
   * default value: 5
   */
  numberOfVisibleRows?: number;
  /**
   * Text color for the focused row
   */
  activeTextColor?: string;
  /**
   * Text color for other, non-focused rows
   */
  inactiveTextColor?: string;
  /**
   * Row text style
   */
  textStyle?: TextStyle;
  disableRTL?: boolean;
  testID?: string;
}>;

/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */

const SectionsWheelPicker = <T extends WheelPickerItemValue>(props: SectionsWheelPickerProps<T>) => {
  const themeProps = useThemeProps(props, 'SectionsWheelPicker');
  const {sections, itemHeight, numberOfVisibleRows, activeTextColor, inactiveTextColor, textStyle, disableRTL, testID} =
    themeProps;

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

  const renderSections = () =>
    _.map(sections, (section, index) => {
      return (
        <WheelPicker
          disableRTL={shouldDisableRTL}
          key={index}
          testID={`${testID}.${index}`}
          {...wheelPickerProps}
          {...section}
        />
      );
    });

  return (
    <View row centerH style={shouldDisableRTL && styles.disableRTL} testID={testID}>
      {renderSections()}
    </View>
  );
};

SectionsWheelPicker.displayName = 'SectionsWheelPicker';

export default SectionsWheelPicker;

const styles = StyleSheet.create({
  disableRTL: {
    flexDirection: 'row-reverse'
  }
});
