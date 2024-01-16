import {CheckboxProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';
import {TextDriver} from '../text/Text.driver.new';

export const CheckboxDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<CheckboxProps>(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  const getLabel = () => {
    return labelDriver.getText();
  };

  return {...driver, getLabel};
};
