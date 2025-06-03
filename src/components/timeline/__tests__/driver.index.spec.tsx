import React from 'react';
import {render} from '@testing-library/react-native';
import {TimelineDriver} from '../timeline.driver';
import {TimelineProps} from '../types';
import Timeline from '../index';
import Text from '../../text';
import Assets from '../../../assets';

const testID = 'test-timeline';
const labelContent = 2;
const defaultIcon = Assets.internal.icons.check;

const getDriver = (props?: TimelineProps) => {
  const renderTree = render(<Timeline testID={testID} {...props}>
    <Text>Timeline</Text>
  </Timeline>);
  return TimelineDriver({renderTree, testID});
};

describe('Timeline', () => {
  describe('sanity', () => {
    it('should render Timeline', () => {
      const timelineDriver = getDriver();
      expect(timelineDriver.exists()).toBeTruthy();
      expect(timelineDriver.getPoint().exists()).toBeTruthy();
      expect(timelineDriver.getTopLine().exists()).toBeTruthy();
      expect(timelineDriver.getTopLine().isVisible()).toBeFalsy();
      expect(timelineDriver.getBottomLine().exists()).toBeFalsy();
    });
  });

  describe('Point', () => {
    describe('with Icon', () => {
      it('should override icon color when passing iconProps.tintColor', () => {
        const props = {point: {icon: defaultIcon, iconProps: {tintColor: '#A2387E'}}};
        const timelineDriver = getDriver(props);
        const contentStyle = timelineDriver.getPoint().getContentStyle();
        expect(contentStyle.tintColor).toEqual('#A2387E');
        expect(contentStyle.color).toBeUndefined();
      });
    });

    describe('with Label', () => {
      it('should override label color when passing labelColor', () => {
        const props = {point: {label: labelContent, labelColor: '#A2387E'}};
        const timelineDriver = getDriver(props);
        const contentStyle = timelineDriver.getPoint().getContentStyle();
        expect(contentStyle.color).toEqual('#A2387E');
        expect(contentStyle.tintColor).toBeUndefined();
      });
    });

    it('should render Icon when icon and label passed', () => {
      const props = {point: {icon: defaultIcon, iconProps: {tintColor: '#A2387E'}, label: labelContent}};
      const timelineDriver = getDriver(props);
      const contentStyle = timelineDriver.getPoint().getContentStyle();
      expect(contentStyle.tintColor).toEqual('#A2387E');
      expect(contentStyle.color).toBeUndefined();
    });

    it('tintColor and color should be undefined when icon and label are not passed', () => {
      const timelineDriver = getDriver();
      const contentStyle = timelineDriver.getPoint().getContentStyle();
      expect(contentStyle.tintColor).toBeUndefined();
      expect(contentStyle.color).toBeUndefined();
    });
  });

  describe('TopLine', () => {
    it('should override top line color and width', () => {
      const props = {topLine: {color: '#00A87E', width: 3}};
      const timelineDriver = getDriver(props);
      const topLine = timelineDriver.getTopLine();
      expect(topLine.exists()).toBeTruthy();
      const topLineStyle = topLine.getStyle();
      expect(topLineStyle.backgroundColor).toEqual('#00A87E');
      expect(topLineStyle.width).toEqual(3);
    });

    it('should render line with entryPoint', () => {
      const props = {topLine: {entry: true}};
      const timelineDriver = getDriver(props);
      const topLine = timelineDriver.getTopLine();
      expect(topLine.isEntryPointExists()).toBeTruthy();
    });
  });

  describe('BottomLine', () => {
    it('should render BottomLine', () => {
      const props = {bottomLine: {}};
      const timelineDriver = getDriver(props);
      const bottomLine = timelineDriver.getBottomLine();
      expect(bottomLine.exists()).toBeTruthy();
    });

    it('should override bottom line color and width', () => {
      const props = {bottomLine: {color: '#FFF4D3', width: 5}};
      const timelineDriver = getDriver(props);
      const bottomLine = timelineDriver.getBottomLine();
      expect(bottomLine.exists()).toBeTruthy();
      const bottomLineStyle = bottomLine.getStyle();
      expect(bottomLineStyle.backgroundColor).toEqual('#FFF4D3');
      expect(bottomLineStyle.width).toEqual(5);
    });
  });
});
