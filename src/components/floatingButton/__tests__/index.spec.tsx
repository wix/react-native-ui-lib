import React from 'react';
import {render} from '@testing-library/react-native';
import FloatingButton/* , {FloatingButtonLayouts} */ from '../index';
import {ButtonDriver} from '../../button/Button.driver.new';

const TEST_ID = 'floating_button';
const button = {
  label: 'First'
};
const secondaryButton = {
  label: 'Second'
};
// buttonLayout={showVertical ? FloatingButtonLayouts.VERTICAL : FloatingButtonLayouts.HORIZONTAL}


const TestCase = (props) => {
  return <FloatingButton {...props} testID={TEST_ID}/>;
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
});
