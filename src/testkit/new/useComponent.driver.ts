import {ReactTestInstance} from 'react-test-renderer';
import {RenderResult} from '@testing-library/react-native';

export interface ComponentProps {
  renderTree: RenderResult;
  testID: string;
}

export interface ComponentDriverResult<Props> {
  getElement: () => ReactTestInstance;
  exists: () => boolean;
  getProps: () => Props;
}

export const useComponentDriver = <Props>(props: ComponentProps): ComponentDriverResult<Props> => {
  const {renderTree, testID} = props;

  const getElement = (): ReactTestInstance => {
    const element = renderTree.queryByTestId(testID);
    if (element) {
      return element;
    } else {
      throw new Error(`Could not find element with testID: ${testID}`);
    }
  };

  const exists = (): boolean => {
    try {
      getElement();
      return true;
    } catch {
      return false;
    }
  };

  const getProps = (): Props => {
    return getElement().props as Props;
  };

  return {getElement, exists, getProps};
};

export const ComponentDriver = <Props>(props: ComponentProps): ComponentDriverResult<Props> => {
  return useComponentDriver(props);
};
