import {StyleSheet} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';
import {TextDriver} from '../text/Text.driver.new';
import {ImageDriver} from '../image/Image.driver.new';

export const BadgeDriver = (props: ComponentProps) => {
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
    return {...labelDriver};
  };

  const getIcon = () => {
    const exists = (): boolean => {
      return iconDriver.exists();
    };
    const getStyle = () => {
      return StyleSheet.flatten(iconDriver.getElement().props.style);
    };
    return {...iconDriver, exists, getStyle};
  };

  const getStyle = () => {
    return StyleSheet.flatten(driver.getElement().props.style);
  };

  const getSize = (): number => {
    return getStyle().height as number;
  };

  return {
    ...driver,
    getLabel,
    getIcon,
    getStyle,
    getSize
  };
};
