import React from 'react';
import {render} from '@testing-library/react-native';
import Assets from '../../../assets';
import Badge, {BadgeProps} from '../index';
import {BadgeDriver} from '../badge.driver';

const testID = 'test-badge';

const getDriver = (props?: Partial<BadgeProps>) => {
  const renderTree = render(<Badge testID={testID} {...props}/>);
  return BadgeDriver({renderTree, testID});
};

describe('Badge', () => {
  describe('sanity', () => {
    it('should render Badge', () => {
      const driver = getDriver({label: '5'});
      expect(driver.exists()).toBeTruthy();
    });
  });

  describe('Label', () => {
    it('should render label text', () => {
      const driver = getDriver({label: '5'});
      expect(driver.getLabel().exists()).toBeTruthy();
      expect(driver.getLabel().getText()).toEqual('5');
    });

    it('should not render label when label prop is missing (pimple)', () => {
      const driver = getDriver();
      expect(driver.getLabel().exists()).toBeFalsy();
    });
  });

  describe('Icon', () => {
    it('should render icon when icon prop is passed', () => {
      const driver = getDriver({icon: Assets.internal.icons.check});
      expect(driver.getIcon().exists()).toBeTruthy();
    });

    it('should not render icon when icon prop is missing', () => {
      const driver = getDriver({label: '5'});
      expect(driver.getIcon().exists()).toBeFalsy();
    });
  });

  describe('Size', () => {
    it('should expose explicit size from style', () => {
      const driver = getDriver({label: '5', size: 24});
      expect(driver.getSize()).toEqual(24);
    });

    it('should expose default badge size when no size prop is given', () => {
      const driver = getDriver({label: '5'});
      expect(driver.getSize()).toEqual(20);
    });
  });
});
