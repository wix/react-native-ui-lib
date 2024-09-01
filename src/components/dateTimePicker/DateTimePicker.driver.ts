import {fireEvent} from '@testing-library/react-native';
import {
  ComponentProps,
  ExpandableOverlayDriver,
  ButtonDriver
} from '../../testkit';

export const DateTimePickerDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const expandableOverlayDriver = ExpandableOverlayDriver({...props, testID: `${testID}.overlay`});
  const openPicker = () => {
    expandableOverlayDriver.open();
  };
  const discardPicker = () => {
    ButtonDriver({...props, testID: `${testID}.cancel`}).press();
  };
  const submitSelection = () => {
    ButtonDriver({...props, testID: `${testID}.done`}).press();
  };
  const changeDateTo = (date: Date) => {
    const pickerElement = renderTree.getByTestId(`${testID}.picker`);
    fireEvent(pickerElement, 'onChange', {type: 'set'}, date);
  };

  return {
    openPicker,
    discardPicker,
    submitSelection,
    changeDateTo
  };
};
