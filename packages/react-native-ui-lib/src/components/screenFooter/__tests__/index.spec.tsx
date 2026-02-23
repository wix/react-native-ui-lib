import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {render} from '@testing-library/react-native';
import {useComponentDriver, ComponentProps} from '../../../testkit/new/Component.driver';
import View from '../../view';
import Button from '../../button';
import Text from '../../text';
import ScreenFooter from '../index';
import {
  ScreenFooterProps,
  ScreenFooterLayouts,
  ScreenFooterBackgrounds,
  FooterAlignment,
  HorizontalItemsDistribution
} from '../types';

const TEST_ID = 'screen-footer';

const ScreenFooterDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const getStyle = () => driver.getElement().props.style as ViewStyle;
  return {...driver, getStyle};
};

const ContentDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const getStyle = () => StyleSheet.flatten(driver.getElement().props.style) as ViewStyle;
  return {...driver, getStyle};
};

const BackgroundDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  return driver;
};

const TestCase = (props: Partial<ScreenFooterProps>) => {
  return (
    <View testID="test-screen">
      <ScreenFooter testID={TEST_ID} {...props}/>
    </View>
  );
};

describe('ScreenFooter', () => {
  describe('sanity', () => {
    it('should render ScreenFooter', () => {
      const renderTree = render(<TestCase/>);
      const driver = ScreenFooterDriver({renderTree, testID: TEST_ID});
      expect(driver.exists()).toBeTruthy();
    });

    it('should render with children', () => {
      const renderTree = render(
        <TestCase>
          <Button label="Primary"/>
        </TestCase>
      );
      const driver = ScreenFooterDriver({renderTree, testID: TEST_ID});
      expect(driver.exists()).toBeTruthy();
    });
  });

  describe('layout', () => {
    it('should apply vertical layout by default (column flexDirection)', () => {
      const renderTree = render(
        <TestCase>
          <Button label="Primary"/>
        </TestCase>
      );
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});
      expect(contentDriver.getStyle().flexDirection).toBe('column');
    });

    it('should apply horizontal layout when specified (row flexDirection)', () => {
      const renderTree = render(
        <TestCase layout={ScreenFooterLayouts.HORIZONTAL}>
          <Button label="Primary"/>
        </TestCase>
      );
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});
      expect(contentDriver.getStyle().flexDirection).toBe('row');
    });
  });

  describe('alignment', () => {
    it('should align items to center by default', () => {
      const renderTree = render(
        <TestCase>
          <Button label="Primary"/>
        </TestCase>
      );
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});
      expect(contentDriver.getStyle().alignItems).toBe('center');
    });

    it('should align items to flex-start when FooterAlignment.START', () => {
      const renderTree = render(
        <TestCase alignment={FooterAlignment.START}>
          <Button label="Primary"/>
        </TestCase>
      );
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});
      expect(contentDriver.getStyle().alignItems).toBe('flex-start');
    });
  });

  describe('horizontalItemsDistribution', () => {
    it('should spread multiple items with space-between when SPREAD', () => {
      const renderTree = render(
        <TestCase 
          layout={ScreenFooterLayouts.HORIZONTAL}
          horizontalItemsDistribution={HorizontalItemsDistribution.SPREAD}
        >
          <Button label="Primary"/>
          <Button label="Secondary"/>
        </TestCase>
      );
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});
      expect(contentDriver.getStyle().justifyContent).toBe('space-between');
    });

    it('should center items by default when STACK', () => {
      const renderTree = render(
        <TestCase 
          layout={ScreenFooterLayouts.HORIZONTAL}
          horizontalItemsDistribution={HorizontalItemsDistribution.STACK}
        >
          <Button label="Primary"/>
          <Button label="Secondary"/>
        </TestCase>
      );
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});
      expect(contentDriver.getStyle().justifyContent).toBe('center');
    });
  });

  describe('backgroundType', () => {
    it('should render solid background when backgroundType is SOLID', () => {
      const renderTree = render(
        <TestCase backgroundType={ScreenFooterBackgrounds.SOLID}>
          <Button label="Primary"/>
        </TestCase>
      );
      const solidBgDriver = BackgroundDriver({renderTree, testID: `${TEST_ID}.solidBackground`});
      const fadingBgDriver = BackgroundDriver({renderTree, testID: `${TEST_ID}.fadingBackground`});
      
      expect(solidBgDriver.exists()).toBeTruthy();
      expect(fadingBgDriver.exists()).toBeFalsy();
    });

    it('should render fading background when backgroundType is FADING', () => {
      const renderTree = render(
        <TestCase backgroundType={ScreenFooterBackgrounds.FADING}>
          <Button label="Primary"/>
        </TestCase>
      );
      const solidBgDriver = BackgroundDriver({renderTree, testID: `${TEST_ID}.solidBackground`});
      const fadingBgDriver = BackgroundDriver({renderTree, testID: `${TEST_ID}.fadingBackground`});
      
      expect(solidBgDriver.exists()).toBeFalsy();
      expect(fadingBgDriver.exists()).toBeTruthy();
    });

    it('should not render any background when backgroundType is TRANSPARENT', () => {
      const renderTree = render(
        <TestCase backgroundType={ScreenFooterBackgrounds.TRANSPARENT}>
          <Button label="Primary"/>
        </TestCase>
      );
      const solidBgDriver = BackgroundDriver({renderTree, testID: `${TEST_ID}.solidBackground`});
      const fadingBgDriver = BackgroundDriver({renderTree, testID: `${TEST_ID}.fadingBackground`});
      
      expect(solidBgDriver.exists()).toBeFalsy();
      expect(fadingBgDriver.exists()).toBeFalsy();
    });
  });

  describe('children', () => {
    it('should render max 3 children even when more are provided', () => {
      const renderTree = render(
        <TestCase>
          <Text testID="child-1">Child 1</Text>
          <Text testID="child-2">Child 2</Text>
          <Text testID="child-3">Child 3</Text>
          <Text testID="child-4">Child 4</Text>
          <Text testID="child-5">Child 5</Text>
        </TestCase>
      );
      
      expect(renderTree.queryByTestId('child-1')).toBeTruthy();
      expect(renderTree.queryByTestId('child-2')).toBeTruthy();
      expect(renderTree.queryByTestId('child-3')).toBeTruthy();
      expect(renderTree.queryByTestId('child-4')).toBeFalsy();
      expect(renderTree.queryByTestId('child-5')).toBeFalsy();
    });
  });
});
