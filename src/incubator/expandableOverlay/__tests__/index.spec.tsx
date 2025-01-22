import React from 'react';
import {render} from '@testing-library/react-native';
import ExpandableOverlay, {ExpandableOverlayProps} from '../index';
import View from '../../../components/view';
import Text from '../../../components/text';
import {ExpandableOverlayDriver} from '../ExpandableOverlay.driver';

// What we want to test:
/**
 * 1. Sanity - it renders.
 * 2. Clicking opens the modal/dialog.
 */

const testID = 'expandableOverylayTest';
const helloWorld = 'Hello World';
const universe = 'Hello Universe';

const TestCase = (props: Omit<ExpandableOverlayProps, 'testID'>) => {
  return (
    <ExpandableOverlay expandableContent={<Text>{universe}</Text>} {...props} testID={testID}>
      <View>
        <Text>{helloWorld}</Text>
      </View>
    </ExpandableOverlay>
  );
};

const getDriver = <T extends ExpandableOverlayProps>(props: T) => {
  const renderTree = render(<TestCase {...props}/>);
  const driver = ExpandableOverlayDriver({renderTree, testID}, props.useDialog ?? false);
  return {driver, renderTree};
};

describe('ExpandableOverlay', () => {
  describe('With Dialog (useDialog)', () => {
    it('Sanity', () => {
      const {driver} = getDriver({useDialog: true});
      expect(driver.exists()).toBeFalsy();
    });

    it('Test open', () => {
      const {driver} = getDriver({useDialog: true});
      expect(driver.isOpen()).toBeFalsy();
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
    });

    it('Test pressOnBackground', () => {
      const {driver} = getDriver({useDialog: true});
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
      driver.pressOnBackground();
      expect(driver.isOpen()).toBeFalsy();
    });

    it(`should render ${helloWorld} on starting view and ${universe} in the dialog only after pressing`, () => {
      const {driver, renderTree} = getDriver({useDialog: true});
      expect(renderTree.queryByText(helloWorld)).toBeTruthy();
      expect(renderTree.queryByText(universe)).toBeFalsy();
      driver.open();
      expect(renderTree.queryByText(universe)).toBeTruthy();
    });
  });

  describe('With Modal', () => {
    it('Sanity', () => {
      const {driver} = getDriver({});
      expect(driver.exists()).toBeFalsy();
    });

    it('Test open', () => {
      const {driver} = getDriver({});
      expect(driver.isOpen()).toBeFalsy();
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
    });

    it('Test pressOnBackground', () => {
      const {driver} = getDriver({});
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
      driver.pressOnBackground();
      expect(driver.isOpen()).toBeFalsy();
    });

    it(`should render ${helloWorld} on starting view and ${universe} in the dialog only after pressing`, () => {
      const {driver, renderTree} = getDriver({});
      expect(renderTree.queryByText(helloWorld)).toBeTruthy();
      expect(renderTree.queryByText(universe)).toBeFalsy();
      driver.open();
      expect(renderTree.queryByText(universe)).toBeTruthy();
    });
  });
});
