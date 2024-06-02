import React from 'react';
import {ViewStyle} from 'react-native';
import {render} from '@testing-library/react-native';
import {Spacings} from '../../../style';
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
  return <FloatingButton {...props} testID={TEST_ID}/>;
};
export const FloatingButtonDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  const getStyle = () => driver.getElement().props.style as ViewStyle;
  return {...driver, getStyle};
};

describe('FloatingButton', () => {
  describe('visible', () => {
    it('should render a button according to visibility', async () => {
      const props = {};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      expect(await buttonDriver.exists()).not.toBeTruthy();
      
      renderTree.rerender(<TestCase visible/>);
      expect(await buttonDriver.exists()).toBeTruthy();
    });
  });

  describe('buttons', () => {
    it('should render a button', async () => {
      const props = {visible: true};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      expect(await buttonDriver.exists()).toBeTruthy();
    });

    it('should not render a secondary button', async () => {
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

  describe('bottomMargin', () => {
    it('should have default bottom margin', () => {
      const props = {visible: true};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});

      expect(buttonDriver.getElement().props.style?.marginBottom).toBe(Spacings.s8);
    });

    it('should have default bottom margin for both buttons', () => {
      const props = {visible: true, secondaryButton};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      const buttonDriver2 = ButtonDriver({renderTree, testID: `${TEST_ID}.secondaryButton`});

      expect(buttonDriver.getElement().props.style?.marginBottom).toBe(Spacings.s4);
      expect(buttonDriver2.getElement().props.style?.marginBottom).toBe(Spacings.s7);
    });

    it('should have bottom margin that match bottomMargin prop', () => {
      const props = {visible: true, bottomMargin: 10};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});

      expect(buttonDriver.getElement().props.style?.marginBottom).toBe(10);
    });

    it('should have bottom margin for secondary button that match bottomMarginProp', () => {
      const props = {visible: true, secondaryButton, bottomMargin: 10};
      const renderTree = render(<TestCase {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      const buttonDriver2 = ButtonDriver({renderTree, testID: `${TEST_ID}.secondaryButton`});

      expect(buttonDriver.getElement().props.style?.marginBottom).toBe(Spacings.s4);
      expect(buttonDriver2.getElement().props.style?.marginBottom).toBe(10);
    });
  });

  describe('buttonLayout', () => {
    it('should style vertical layout (default)', () => {
      const props = {visible: true, secondaryButton};
      const renderTree = render(<TestCase {...props}/>);
      const driver = FloatingButtonDriver({renderTree, testID: TEST_ID});
      
      expect(driver.getStyle()?.flexDirection).toBe(undefined);
      expect(driver.getStyle()?.alignItems).toBe('center');
      expect(driver.getStyle()?.justifyContent).toBe('center');
      expect(driver.getStyle()?.paddingHorizontal).toBe(undefined);
    });
    
    it('should style horizontal layout', () => {
      const props = {visible: true, secondaryButton, buttonLayout: FloatingButtonLayouts.HORIZONTAL};
      const renderTree = render(<TestCase {...props}/>);
      const driver = FloatingButtonDriver({renderTree, testID: TEST_ID});
      
      expect(driver.getStyle()?.flexDirection).toBe('row');
      expect(driver.getStyle()?.alignItems).toBe('center');
      expect(driver.getStyle()?.justifyContent).toBe('center');
      expect(driver.getStyle()?.paddingHorizontal).toBe(undefined);
    });
  });

  describe('fullWidth', () => {
    it('should style vertical layout (default) when fullWidth is true', () => {
      const props = {visible: true, secondaryButton, fullWidth: true};
      const renderTree = render(<TestCase {...props}/>);
      const driver = FloatingButtonDriver({renderTree, testID: TEST_ID});
      
      expect(driver.getStyle()?.flexDirection).toBe(undefined);
      expect(driver.getStyle()?.alignItems).toBe(undefined);
      expect(driver.getStyle()?.justifyContent).toBe(undefined);
      const buttonDriver = ButtonDriver({renderTree, testID: `${TEST_ID}.button`});
      expect(buttonDriver.getElement().props.style.marginLeft).toBe(16);
      expect(buttonDriver.getElement().props.style.marginRight).toBe(16);
    });

    it('should style horizontal layout when fullWidth is true', () => {
      const props = {visible: true, secondaryButton, buttonLayout: FloatingButtonLayouts.HORIZONTAL, fullWidth: true};
      const renderTree = render(<TestCase {...props}/>);
      const driver = FloatingButtonDriver({renderTree, testID: TEST_ID});
      
      expect(driver.getStyle()?.flexDirection).toBe('row');
      expect(driver.getStyle()?.alignItems).toBe('center');
      expect(driver.getStyle()?.justifyContent).toBe('center');
      expect(driver.getStyle()?.paddingHorizontal).toBe(undefined);
    });
  });
});
