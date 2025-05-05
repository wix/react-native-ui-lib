import {StyleSheet} from 'react-native';
import {ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../text/Text.driver.new';
import {ImageDriver} from '../image/Image.driver.new';
import {ViewDriver} from '../view/View.driver.new';

export const PointDriver = (props: ComponentProps) => {
  const pointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  });

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });

  const getLabel = () => {
    const exists = (): boolean => {
      return labelDriver.exists();
    };
    return {...labelDriver, exists};
  };

  const getIcon = () => {
    const exists = (): boolean => {
      return iconDriver.exists();
    };
    return {...iconDriver, exists};
  };

  const getPoint = () => {
    const exists = (): boolean => {
      return pointDriver.exists();
    };
    const getStyle = () => {
      return StyleSheet.flatten(pointDriver.getElement().props.style);
    };
    const isContentExists = () => {
      return getLabel().exists() || getIcon().exists();
    };
    const getContentStyle = () => {
      return getIcon().exists()
        ? StyleSheet.flatten(getIcon().getElement().props.style)
        : getLabel().exists() && StyleSheet.flatten(getLabel().getElement().props.style);
    };
    const getLabelContent = () => {
      return getLabel().getText();
    };
    return {exists, getStyle, isContentExists, getContentStyle, getLabelContent};
  };

  return {
    getPoint
  };
};
