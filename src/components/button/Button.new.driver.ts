import {ButtonProps} from './ButtonTypes';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';
import {TextDriver} from '../text/Text.driver.new';
import {ImageDriver} from '../image/Image.driver.new';

export const ButtonDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<ButtonProps>(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });

  const isLabelExist = () => {
    return labelDriver.exists();
  };

  const getIconElement = () => {
    return iconDriver.getElement();
  };

  const isIconExist = () => {
    return iconDriver.exists();
  };

  return {...labelDriver, isLabelExist, ...iconDriver, getIconElement, isIconExist, ...driver};
};
