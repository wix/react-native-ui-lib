import { useComponentDriver } from "../../testkit/new/Component.driver";
// import {usePressableDriver} from '../../testkit';
import { TextDriver } from "../../components/text/Text.driver.new";
// import {WheelPickerItemProps} from './index';

export const WheelPickerItemDriver = props => {
  const driver = useComponentDriver(props);
  // const driver = usePressableDriver<WheelPickerItemProps>(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.text`
  });
  const getLabel = () => {
    return labelDriver.getText();
  };
  const getLabelStyle = () => {
    return labelDriver.getStyle(); // NOTE: when there's active/inactive colors the color will be animated sharedValue instead of string
  };
  return {
    ...driver,
    getLabel,
    getLabelStyle
  };
};