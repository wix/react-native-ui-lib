import {StyleSheet} from 'react-native';
import {ComponentProps} from '../../testkit/new/Component.driver';
import {ViewDriver} from '../view/View.driver.new';

export const LineDriver = (props: ComponentProps) => {
  const lineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  });

  const entryPointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.entryPoint`
  });

  const getLine = () => {
    const exists = (): boolean => {
      return lineDriver.exists();
    };
    const getStyle = () => {
      return StyleSheet.flatten(lineDriver.getElement().props.style);
    };
    const isVisible = (): boolean => {
      const height = getStyle().height;
      return exists() && (height ?? 0) > 0;
    };
    const isEntryPointExists = (): boolean => {
      return entryPointDriver.exists();
    };
    const getEntryPointStyle = () => {
      return entryPointDriver.getStyle();
    };
    return {exists, getStyle, isVisible, isEntryPointExists, getEntryPointStyle};
  };

  return {
    getLine
  };
};
