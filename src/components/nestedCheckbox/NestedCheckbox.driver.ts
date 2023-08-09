import {NestedCheckboxProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';


export const NestedCheckboxDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<NestedCheckboxProps>(useComponentDriver(props));

  const getState = () => {
    return driver.getProps().accessibilityLabel;
  };

  return {...driver, getState};
};
