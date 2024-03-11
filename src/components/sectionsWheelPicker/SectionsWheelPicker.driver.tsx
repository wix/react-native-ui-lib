import React from 'react';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {WheelPickerDriver} from '../WheelPicker/WheelPicker.driver';
import {SectionsWheelPickerProps} from './index';


export const SectionsWheelPickerDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<SectionsWheelPickerProps>(props);

  const sectionsDrivers = React.Children.toArray(driver.getElement().props.children).map((_section, index) => {
    if (typeof _section === 'object' && 'props' in _section) {
      return WheelPickerDriver({
        renderTree: props.renderTree,
        testID: `${props.testID}.${index}`
      });
    }
    return undefined;
  }).filter((driver): driver is ReturnType<typeof WheelPickerDriver> => !!driver);

  return {...driver, sectionsDrivers};
};
