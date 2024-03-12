import React, {isValidElement} from 'react';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {WheelPickerDriver} from '../WheelPicker/WheelPicker.driver';
import {SectionsWheelPickerProps} from './index';

const isTestable = (props: unknown): props is {testID: string} => {
  return typeof (props as {testID: string}).testID === 'string';
};

export const SectionsWheelPickerDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<SectionsWheelPickerProps>(props);
  const sectionsDrivers = React.Children.toArray(driver.getElement().props.children)
    .map(section => {
      if (isValidElement(section) && isTestable(section.props)) {
        return WheelPickerDriver({
          renderTree: props.renderTree,
          testID: section.props.testID
        });
      }
      return undefined;
    })
    .filter((driver): driver is ReturnType<typeof WheelPickerDriver> => !!driver);

  return {...driver, sectionsDrivers};
};
