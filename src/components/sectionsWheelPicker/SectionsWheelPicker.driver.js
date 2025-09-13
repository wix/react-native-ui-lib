import _map from "lodash/map";
import { useComponentDriver } from "../../testkit/new/Component.driver";
import { WheelPickerDriver } from "../WheelPicker/WheelPicker.driver";
export const SectionsWheelPickerDriver = props => {
  const driver = useComponentDriver(props);
  const sections = _map(driver.getElement().children, child => child.props);
  const sectionsDrivers = _map(sections, (section, index) => {
    const sectionTestID = `${props.testID}.${index}`;
    return WheelPickerDriver({
      renderTree: props.renderTree,
      testID: section.testID || sectionTestID
    });
  });
  return {
    ...driver,
    sections,
    sectionsDrivers
  };
};