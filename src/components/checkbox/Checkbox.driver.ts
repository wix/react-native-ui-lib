import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {PressableDriverResult, usePressableDriver} from '../../testkit/new/usePressable.driver';
import {TextDriver, TextDriverInterface} from '../text/Text.driver.new';

export interface CheckboxDriverInterface extends PressableDriverResult {
  getLabel: TextDriverInterface['getText']
}

export const CheckboxDriver = (props: ComponentProps): CheckboxDriverInterface => {
  const driver = usePressableDriver(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });
  
  return {...driver, getLabel: labelDriver.getText};
};
