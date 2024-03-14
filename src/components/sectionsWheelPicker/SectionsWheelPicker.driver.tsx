import _ from 'lodash';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {WheelPickerDriver} from '../WheelPicker/WheelPicker.driver';
import {SectionsWheelPickerProps} from './index';

export const SectionsWheelPickerDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const sections = driver.getElement().children as SectionsWheelPickerProps;
  const sectionsDrivers = _.map(sections, (_, index) => {
    const sectionTestID = `${props.testID}.${index}`;
    return WheelPickerDriver({
      renderTree: props.renderTree,
      testID: sectionTestID
    });
  });

  


  return {...driver, sections, sectionsDrivers};
};
