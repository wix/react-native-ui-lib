import {ViewStyle} from 'react-native';
import {SwitchProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const SwitchDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<SwitchProps>(useComponentDriver(props));
  
  const getStyle = () => driver.getProps().style as ViewStyle;
  const getAccessibilityValue = () => driver.getProps().accessibilityValue?.text === '1';
  const isDisabled = () => driver.getProps().accessibilityState?.disabled === true;
  const isChecked = () => driver.getProps().accessibilityValue?.text === '1';
  
  return {...driver, getStyle, getAccessibilityValue, isDisabled, isChecked};
};
