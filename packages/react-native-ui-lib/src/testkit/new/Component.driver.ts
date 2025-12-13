import {ReactTestInstance} from 'react-test-renderer';
import {within} from '@testing-library/react-native';
export interface ComponentProps {
  renderTree: ReturnType<typeof within>; // Note: This changed was asked for integration with amino. This still gives all querying functionality.
  testID: string | RegExp;
}

export interface ComponentDriverResult {
  getElement: () => ReactTestInstance;
  queryElement: () => ReactTestInstance | undefined;
  exists: () => boolean;
}

export type ComponentDriverOptions = {
  includeHiddenElements?: boolean;
};

export const useComponentDriver = (props: ComponentProps, options?: ComponentDriverOptions): ComponentDriverResult => {
  const {renderTree, testID} = props;

  const getElement = (): ReactTestInstance => {
    const elements = renderTree.queryAllByTestId(testID, options);
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

  const queryElement = (): ReactTestInstance => {
    const elements = renderTree.queryAllByTestId(testID, options);
    if (elements.length > 1) {
      console.warn(`Found more than one element with testID: ${testID}`);
    }

    return elements?.[0];
  };

  const exists = (): boolean => {
    try {
      getElement();
      return true;
    } catch {
      return false;
    }
  };

  return {getElement, queryElement, exists};
};

export const ComponentDriver = (props: ComponentProps): ComponentDriverResult => {
  return useComponentDriver(props);
};
