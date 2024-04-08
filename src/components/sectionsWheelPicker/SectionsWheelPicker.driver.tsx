import _ from 'lodash';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {WheelPickerDriver} from '../WheelPicker/WheelPicker.driver';
import {WheelPickerItemValue} from '../WheelPicker';
import {SectionsWheelPickerProps} from './index';

export const SectionsWheelPickerDriver = <T extends WheelPickerItemValue>(props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const sections = driver.getElement().children as SectionsWheelPickerProps<T>;
  const sectionsDrivers = _.map(sections, (_, index) => {
    const sectionTestID = `${props.testID}.${index}`;
    return WheelPickerDriver({
      renderTree: props.renderTree,
      testID: sectionTestID
    });
  });

  


  return {...driver, sections, sectionsDrivers};
};
