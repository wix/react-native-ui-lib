import _ from 'lodash';
import React from 'react';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {WheelPickerDriver} from '../WheelPicker/WheelPicker.driver';
import {SectionsWheelPickerProps} from './index';


type CustomSectionsTestIds = {
  customSectionTestIds?: string[]
};

export const SectionsWheelPickerDriver = (props: ComponentProps & CustomSectionsTestIds) => {
  const {customSectionTestIds, ...others} = props;
  const driver = useComponentDriver<SectionsWheelPickerProps>(others);

  let sectionsDrivers: (ReturnType<typeof WheelPickerDriver>)[];
  if (customSectionTestIds) {
    sectionsDrivers = customSectionTestIds.map(item => {
      return WheelPickerDriver({
        renderTree: props.renderTree,
        testID: `${props.testID}.${item}`
      });
    });
  } else {
    // Default sections test ids.
    sectionsDrivers = React.Children.toArray(driver.getElement().props.children).map((_section, index) => {
      return WheelPickerDriver({
        renderTree: props.renderTree,
        testID: `${props.testID}.${index}`
      });
    });
  }

  return {...driver, sectionsDrivers};
};
