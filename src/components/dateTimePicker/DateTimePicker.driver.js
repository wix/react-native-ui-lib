import { fireEvent } from '@testing-library/react-native';
import { ExpandableOverlayDriver, ButtonDriver } from "../../testkit";
export const DateTimePickerDriver = props => {
  const {
    renderTree,
    testID
  } = props;
  const expandableOverlayDriver = ExpandableOverlayDriver({
    ...props,
    testID: `${testID}.overlay`
  }, true);
  const open = () => {
    expandableOverlayDriver.open();
  };
  const close = () => {
    ButtonDriver({
      ...props,
      testID: `${testID}.cancel`
    }).press();
  };
  const select = () => {
    ButtonDriver({
      ...props,
      testID: `${testID}.done`
    }).press();
  };
  const changeDateTo = date => {
    const pickerElement = renderTree.getByTestId(`${testID}.picker`);
    fireEvent(pickerElement, 'onChange', {
      type: 'set'
    }, date);
  };
  return {
    open,
    close,
    select,
    changeDateTo
  };
};