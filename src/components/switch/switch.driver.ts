import {ViewStyle} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {PressableDriverResult, usePressableDriver} from '../../testkit/new/usePressable.driver';

export interface SwitchDriverInterface extends PressableDriverResult {
  getStyle: () => ViewStyle;
  getAccessibilityValue: () => boolean;
  isDisabled: () => boolean;
  isChecked: () => boolean;
}

export const SwitchDriver = (props: ComponentProps): SwitchDriverInterface => {
  const driver = usePressableDriver(useComponentDriver(props));
  
  const getStyle = () => driver.getElement().props.style as ViewStyle;
  const getAccessibilityValue = () => driver.getElement().props.accessibilityValue?.text === '1';
  const isDisabled = () => driver.getElement().props.accessibilityState?.disabled === true;
  const isChecked = () => driver.getElement().props.accessibilityValue?.text === '1';
  
  return {...driver, getStyle, getAccessibilityValue, isDisabled, isChecked};
};
