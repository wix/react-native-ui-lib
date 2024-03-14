import {ReactTestInstance} from 'react-test-renderer';
import {RenderResult} from '@testing-library/react-native';

export interface ComponentProps {
  renderTree: RenderResult;
  testID: string;
}

export interface ComponentDriverResult {
  getElement: () => ReactTestInstance;
  exists: () => boolean;
}

export const useComponentDriver = (props: ComponentProps): ComponentDriverResult => {
  const {renderTree, testID} = props;

  const getElement = (): ReactTestInstance => {
    const elements = renderTree.queryAllByTestId(testID);
    if (elements.length > 1) {
      throw new Error(`Found more than one element with testID: ${testID}`);
    }

    const element = elements[0];
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

  return {getElement, exists};
};

export const ComponentDriver = (props: ComponentProps): ComponentDriverResult => {
  return useComponentDriver(props);
};
