import {ViewStyle} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const SwitchDriver = (props: ComponentProps) => {
  const driver = usePressableDriver(useComponentDriver(props));
  
  const getStyle = () => driver.getElementProps().style as ViewStyle;
  const getAccessibilityValue = () => driver.getElementProps().accessibilityValue?.text === '1';
  const isDisabled = () => driver.getElementProps().accessibilityState?.disabled === true;
  const isChecked = () => driver.getElementProps().accessibilityValue?.text === '1';
  
  return {...driver, getStyle, getAccessibilityValue, isDisabled, isChecked};
};
