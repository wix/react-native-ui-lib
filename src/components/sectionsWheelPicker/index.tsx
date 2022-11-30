import _ from 'lodash';
import React from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import {WheelPicker, WheelPickerProps} from '../../incubator';

export type SectionsWheelPickerProps = {
  /**
   * Array of sections.
   */
  sections?: WheelPickerProps[];
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
};

/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */

const SectionsWheelPicker = (props: SectionsWheelPickerProps) => {
  const {sections, itemHeight, numberOfVisibleRows, activeTextColor, inactiveTextColor, textStyle, disableRTL, testID} =
    props;

  const wheelPickerProps = {
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle
  };

  const renderSections = () =>
    _.map(sections, (section, index) => {
      return (
        <WheelPicker
          disableRTL={disableRTL}
          key={index}
          testID={`${testID}.${index}`}
          {...wheelPickerProps}
          {...section}
        />
      );
    });

  return (
    <View row centerH style={disableRTL && styles.disableRTL} testID={testID}>
      {renderSections()}
    </View>
  );
};

SectionsWheelPicker.displayName = 'SectionsWheelPicker';

export default asBaseComponent<SectionsWheelPickerProps>(SectionsWheelPicker);

const styles = StyleSheet.create({
  disableRTL: {
    flexDirection: 'row-reverse'
  }
});
