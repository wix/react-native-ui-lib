import _ from 'lodash';
import {useComponentDriver, ComponentProps, ComponentDriverResult} from '../../testkit/new/Component.driver';
import {WheelPickerDriver, WheelPickerDriverInterface} from '../WheelPicker/WheelPicker.driver';
import {SectionsWheelPickerProps} from './index';


export interface SectionsWheelPickerDriverInterface extends ComponentDriverResult {
  sectionsDrivers: WheelPickerDriverInterface[];
}


export const SectionsWheelPickerDriver = (props: ComponentProps): SectionsWheelPickerDriverInterface => {
  const driver = useComponentDriver(props);
  const sections = driver.getElement().children as SectionsWheelPickerProps;
  const sectionsDrivers = _.map(sections, (_, index) => {
    const sectionTestID = `${props.testID}.${index}`;
    return WheelPickerDriver({
      renderTree: props.renderTree,
      testID: sectionTestID
    });
  });

  return {...driver, sectionsDrivers};
};
