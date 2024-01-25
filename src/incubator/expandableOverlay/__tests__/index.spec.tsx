import React from 'react';
import {render} from '@testing-library/react-native';
import ExpandableOverlay, {ExpandableOverlayProps} from '../index';
import View from '../../../components/view';
import Text from '../../../components/text';
import ExpandableOverlayDriver from '../ExpandableOverlay.driver';

// What we want to test:
/**
 * 1. Sanity - it renders.
 * 2. Clicking opens the modal/dialog.
 */

const testID = 'expandableOverylayTest';

const TestCase = (props: Omit<ExpandableOverlayProps, 'testID'>) => {
  return (
    //@ts-expect-error
    <ExpandableOverlay migrateDialog {...props} testID={testID}>
      <View>
        <Text>Hello world</Text>
      </View>
    </ExpandableOverlay>
  );
};

const getDriver = (props: ExpandableOverlayProps) => {
  const renderTree = render(<TestCase {...props}/>);
  const driver = ExpandableOverlayDriver({renderTree, testID});
  return driver;
};

describe('ExpandableOverlay', () => {
  describe('basic functionality', () => {
    it('should render', () => {
      render(<TestCase/>);
    });
    it('should open modal when pressed', () => {
      const driver = getDriver({useDialog: false});
      expect(driver.getOverlay().exists()).toBeTruthy();
      expect(driver.getOverlay().)
    });
  });
});
