import React from 'react';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {WheelPickerDriver} from '../WheelPicker/WheelPicker.driver';
import {SectionsWheelPickerProps} from './index';

export const SectionsWheelPickerDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<SectionsWheelPickerProps>(props);
  const sectionsDrivers = React.Children.toArray(driver.getElement().props.children).map((section) => {
    if (typeof section === 'object' && 'props' in section) {
      return WheelPickerDriver({
        renderTree: props.renderTree,
        testID: section.props.testID
      });
    }
    return undefined;
  }).filter((driver): driver is ReturnType<typeof WheelPickerDriver> => !!driver);

  return {...driver, sectionsDrivers};
};
