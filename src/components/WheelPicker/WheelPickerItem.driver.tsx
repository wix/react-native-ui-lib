import {useComponentDriver, ComponentProps, ComponentDriverResult} from '../../testkit/new/Component.driver';
// import {usePressableDriver} from '../../testkit';
import {TextDriver, TextDriverInterface} from '../../components/text/Text.driver.new';
// import {WheelPickerItemProps} from './index';

export interface WheelPickerItemDriverInterface extends ComponentDriverResult {
  getLabel: TextDriverInterface['getText'];
  getLabelStyle: TextDriverInterface['getStyle'];
}

export const WheelPickerItemDriver = (props: ComponentProps): WheelPickerItemDriverInterface => {
  const driver = useComponentDriver(props);
  // const driver = usePressableDriver<WheelPickerItemProps>(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.text`
  });
  
  return {...driver, getLabel: labelDriver.getText, getLabelStyle: labelDriver.getStyle};
};
