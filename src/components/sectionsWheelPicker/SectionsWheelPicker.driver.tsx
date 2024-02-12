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
  const {renderTree} = props;
  if (customSectionTestIds) {
    sectionsDrivers = customSectionTestIds.map(testID => {
      return WheelPickerDriver({
        renderTree,
        testID
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
