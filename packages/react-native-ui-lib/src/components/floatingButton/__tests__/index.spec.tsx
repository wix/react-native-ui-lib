import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {render} from '@testing-library/react-native';
import FloatingButton, {FloatingButtonLayouts} from '../index';
import {ButtonDriver} from '../../button/Button.driver.new';
import {useComponentDriver, ComponentProps} from '../../../testkit/new/Component.driver';

const TEST_ID = 'floating_button';
const button = {
  label: 'First'
};
const secondaryButton = {
  label: 'Second'
};

const TestCase = (props) => {
  return <FloatingButton hoisted={false} {...props} testID={TEST_ID}/>;
};

export const FloatingButtonDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const getStyle = () => driver.getElement().props.style as ViewStyle;
  return {...driver, getStyle};
};

const ContentDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const getStyle = () => StyleSheet.flatten(driver.getElement().props.style) as ViewStyle;
  return {...driver, getStyle};
};

describe('FloatingButton', () => {
  describe('visible', () => {
    it('should render a button according to visibility', async () => {
      const props = {};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      expect(await buttonDriver.exists()).not.toBeTruthy();

      renderTree.rerender(<TestCase visible button={button}/>);
      expect(await buttonDriver.exists()).toBeTruthy();
    });
  });

  describe('buttons', () => {
    it('should render a button', async () => {
      const props = {visible: true, button};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      expect(await buttonDriver.exists()).toBeTruthy();
    });

    it('should not render a secondary button when not provided', async () => {
      const props = {visible: true};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.secondaryButton`});
      expect(await buttonDriver.exists()).not.toBeTruthy();
    });

    it('should render a button with a label', async () => {
      const props = {visible: true, button};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      expect(await buttonDriver.getLabel().getText()).toEqual(button.label);
    });

    it('should render secondary button with label', async () => {
      const props = {visible: true, secondaryButton};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.secondaryButton`});
      expect(await buttonDriver.getLabel().getText()).toEqual(secondaryButton.label);
    });
  });

  describe('buttonLayout', () => {
    it('should use vertical layout by default', () => {
      const props = {visible: true, button, secondaryButton};
      const renderTree = render(<TestCase {...props}/>);
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});

      expect(contentDriver.getStyle().flexDirection).toBe('column');
      expect(contentDriver.getStyle().alignItems).toBe('center');
    });

    it('should use horizontal layout when specified', () => {
      const props = {visible: true, button, secondaryButton, buttonLayout: FloatingButtonLayouts.HORIZONTAL};
      const renderTree = render(<TestCase {...props}/>);
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});

      expect(contentDriver.getStyle().flexDirection).toBe('row');
      expect(contentDriver.getStyle().alignItems).toBe('center');
    });
  });

  describe('fullWidth', () => {
    it('should stretch items in vertical layout when fullWidth is true', () => {
      const props = {visible: true, button, secondaryButton, fullWidth: true};
      const renderTree = render(<TestCase {...props}/>);
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});

      expect(contentDriver.getStyle().flexDirection).toBe('column');
      expect(contentDriver.getStyle().alignItems).toBe('stretch');
    });

    it('should use horizontal layout when fullWidth is true with horizontal layout', () => {
      const props = {visible: true, button, secondaryButton, buttonLayout: FloatingButtonLayouts.HORIZONTAL, fullWidth: true};
      const renderTree = render(<TestCase {...props}/>);
      const contentDriver = ContentDriver({renderTree, testID: `${TEST_ID}.content`});

      expect(contentDriver.getStyle().flexDirection).toBe('row');
      expect(contentDriver.getStyle().alignItems).toBe('center');
    });
  });
});
