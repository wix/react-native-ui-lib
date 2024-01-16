import {ButtonProps} from './ButtonTypes';
import {useComponentDriver, ComponentProps, usePressableDriver, TextDriver, ImageDriver} from '../../testkit';

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
