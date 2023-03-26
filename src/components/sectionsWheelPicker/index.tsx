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

  const shouldDisableRTL = useMemo(() => {
    return Constants.isRTL && disableRTL;
  }, [disableRTL]);

  const renderSections = () =>
    _.map(sections, (section, index) => {
      const sectionItemsLength = section?.items?.length;
      return (
        <WheelPicker
          disableRTL={shouldDisableRTL}
          key={index}
          testID={`${testID}.${index}`}
          flatListProps={
            Constants.isAndroid
              ? {initialNumToRender: sectionItemsLength, maxToRenderPerBatch: sectionItemsLength}
              : undefined
          }
          style={Constants.isAndroid ? styles.androidSectionWheelPicker : undefined}
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
