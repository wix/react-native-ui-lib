import _pt from "prop-types";
import _ from 'lodash';
import React from 'react';
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import { WheelPicker } from "../../incubator";

/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */
const SectionsWheelPicker = props => {
  const {
    sections,
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle,
    testID
  } = props;
  const wheelPickerProps = {
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle
  };

  const renderSections = () => _.map(sections, (section, index) => {
    return <WheelPicker key={index} testID={`${testID}.${index}`} {...wheelPickerProps} {...section} />;
  });

  return <View row centerH testID={testID}>
      {renderSections()}
    </View>;
};

SectionsWheelPicker.propTypes = {
  /**
     * Array of sections.
     */
  sections: _pt.array,

  /**
     * Describe the height of each item in the WheelPicker
     * default value: 44
     */
  itemHeight: _pt.number,

  /**
     * Describe the number of rows visible
     * default value: 5
     */
  numberOfVisibleRows: _pt.number,

  /**
     * Text color for the focused row
     */
  activeTextColor: _pt.string,

  /**
     * Text color for other, non-focused rows
     */
  inactiveTextColor: _pt.string,
  testID: _pt.string
};
SectionsWheelPicker.displayName = 'SectionsWheelPicker';
export default asBaseComponent(SectionsWheelPicker);