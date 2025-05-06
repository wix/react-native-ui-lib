import React from 'react';
import {render} from '@testing-library/react-native';
import {ChipDriver} from '../chip.driver';
import Chip, {ChipProps} from '../index';
import Assets from '../../../assets';
import {Colors} from '../../../style';

const testID = 'test-chip';

const getDriver = (props?: ChipProps) => {
  const renderTree = render(<Chip testID={testID} {...props}/>);
  return ChipDriver({renderTree, testID});
};

describe('Chip', () => {
  describe('sanity', () => {
    it('should render Chip', () => {
      const driver = getDriver();
      expect(driver.exists()).toBeTruthy();
      expect(driver.getIcon().exists()).toBeFalsy();
      expect(driver.getLabel().exists()).toBeFalsy();
      expect(driver.getDismissIcon().exists()).toBeFalsy();
    });
  });

  describe('Label', () => {
    it('should render label', () => {
      const driver = getDriver({label: 'test'});
      expect(driver.getLabel().exists()).toBeTruthy();
      expect(driver.getLabel().getText()).toEqual('test');
      expect(driver.getLabel().getStyle().color).toEqual(Colors.$textDefault);
    });
  });

  describe('Dismiss Icon', () => {
    it('should render dismiss icon', () => {
      const driver = getDriver({onDismiss: () => {}});
      expect(driver.getDismissIcon().exists()).toBeTruthy();
      expect(driver.getDismissIcon().getStyle().tintColor).toEqual(Colors.$iconDefault);
    });
  });

  describe('Icon', () => {
    it('should render icon', () => {
      const driver = getDriver({iconSource: Assets.internal.icons.check});
      expect(driver.getIcon().exists()).toBeTruthy();
      expect(driver.getIcon().getStyle().tintColor).toEqual(Colors.$iconDefault);
    });
  });

  it('should render with label, icon and dismiss icon', () => {
    const driver = getDriver({label: 'test', iconSource: Assets.internal.icons.check, onDismiss: () => {}});
    expect(driver.getLabel().exists()).toBeTruthy();
    expect(driver.getIcon().exists()).toBeTruthy();
    expect(driver.getDismissIcon().exists()).toBeTruthy();
  });
});
