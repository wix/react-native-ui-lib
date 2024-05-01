import {ReactTestInstance} from 'react-test-renderer';
import {within} from '@testing-library/react-native';

// This is taken directly from RNN mocks and probably won't change
const OVERLAY_TEST_ID = 'VISIBLE_OVERLAY_TEST_ID';

export interface ComponentProps {
  renderTree: ReturnType<typeof within>; // Note: This changed was asked for integration with amino. This still gives all querying functionality.
  testID: string;
}

export interface ComponentDriverResult {
  getElement: () => ReactTestInstance;
  getElementInOverlay: () => Promise<ReactTestInstance>;
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

  const getElementInOverlay = async (): Promise<ReactTestInstance> => {
    const elements = within(await renderTree.findByTestId(OVERLAY_TEST_ID)).queryAllByTestId(testID);
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

  return {getElement, getElementInOverlay, exists};
};

export const ComponentDriver = (props: ComponentProps): ComponentDriverResult => {
  return useComponentDriver(props);
};
