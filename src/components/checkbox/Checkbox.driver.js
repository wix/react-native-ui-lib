import { useComponentDriver } from "../../testkit/new/Component.driver";
import { usePressableDriver } from "../../testkit/new/usePressable.driver";
import { TextDriver } from "../text/Text.driver.new";
export const CheckboxDriver = props => {
  const driver = usePressableDriver(useComponentDriver(props));
  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });
  const getLabel = () => {
    return labelDriver.getText();
  };
  return {
    ...driver,
    getLabel
  };
};