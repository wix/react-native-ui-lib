import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver, PressableDriverResult} from '../../testkit/new/usePressable.driver';
import {TextDriver, TextDriverInterface} from '../text/Text.driver.new';
import {ImageDriver, ImageDriverInterface} from '../image/Image.driver.new';

export interface ButtonDriverInterface extends PressableDriverResult {
  getLabel: () => TextDriverInterface;
  getIcon: () => ImageDriverInterface;
}

export const ButtonDriver = (props: ComponentProps): ButtonDriverInterface => {
  const driver = usePressableDriver(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });

  const getLabel = () => {
    return labelDriver;
  };

  const getIcon = () => {
    return iconDriver;
  };

  return {getLabel, getIcon, ...driver};
};
