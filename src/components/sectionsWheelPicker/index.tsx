import _ from 'lodash';
import React, {useMemo} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import WheelPicker, {WheelPickerProps} from '../WheelPicker';

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
  /**
   * Android, flatList props suite for big data section. Solve the bug that section isn't render all the values after value pick.
   */
  androidBigDataSection?: boolean;
  disableRTL?: boolean;
  testID?: string;
};

/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */

const SectionsWheelPicker = (props: SectionsWheelPickerProps) => {
  const {sections, itemHeight, numberOfVisibleRows, activeTextColor, inactiveTextColor, textStyle, disableRTL, testID, androidBigDataSection} =
    props;

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
      const sectionItemsLength = section?.items?.length;
      const androidBigSection = Constants.isAndroid && androidBigDataSection;
      return (
        <WheelPicker
          disableRTL={shouldDisableRTL}
          key={index}
          testID={`${testID}.${index}`}
          flatListProps={
            androidBigSection
              ? {initialNumToRender: sectionItemsLength, maxToRenderPerBatch: sectionItemsLength}
              : undefined
          }
          style={androidBigSection ? styles.androidSectionWheelPicker : undefined}
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

export default asBaseComponent<SectionsWheelPickerProps>(SectionsWheelPicker);

const styles = StyleSheet.create({
  disableRTL: {
    flexDirection: 'row-reverse'
  },
  androidSectionWheelPicker: {
    flex: 0
  }
});
