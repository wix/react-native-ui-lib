import React from 'react';
import {render} from '@testing-library/react-native';
import {TimelineDriver} from '../Timeline.driver';
import {TimelineProps} from '../types';
import Timeline from '../index';
import Text from '../../text';
import Assets from '../../../assets';

const testID = 'test-timeline';
const labelContent = 2;
const defaultIcon = Assets.internal.icons.check;

const getDriver = (props: TimelineProps) => {
  const renderTree = render(<Timeline testID={testID} {...props}>
    <Text>Timeline</Text>
  </Timeline>);
  const timelineDriver = TimelineDriver({renderTree, testID});
  return {timelineDriver};
};

describe('Timeline', () => {
  describe('sanity', () => {
    it('should render Timeline', () => {
      const props = {};
      const {timelineDriver} = getDriver(props);
      expect(timelineDriver.exists()).toBeTruthy();
    });

    it('should render Point with Icon, and custom tintColor', () => {
      const props = {point: {icon: defaultIcon, iconProps: {tintColor: '#A2387E'}}};
      const {timelineDriver} = getDriver(props);
      expect(timelineDriver.getPoint().exists()).toBeTruthy();
      expect(timelineDriver.getPoint().isContentExists()).toBeTruthy();
      const contentStyle = timelineDriver.getPoint().getContentStyle();
      expect(contentStyle.tintColor).toEqual('#A2387E');
      expect(contentStyle.color).toBeUndefined();
    });

    it('should render Point with Label, and custom labelColor', () => {
      const props = {point: {label: labelContent, labelColor: '#A2387E'}};
      const {timelineDriver} = getDriver(props);
      expect(timelineDriver.getPoint().exists()).toBeTruthy();
      expect(timelineDriver.getPoint().isContentExists()).toBeTruthy();
      const contentStyle = timelineDriver.getPoint().getContentStyle();
      expect(contentStyle.color).toEqual('#A2387E');
      expect(contentStyle.tintColor).toBeUndefined();
    });

    it('should render TopLine', () => {
      const props = {topLine: {color: '#00A87E', width: 3}};
      const {timelineDriver} = getDriver(props);
      const topLine = timelineDriver.getTopLine();
      expect(topLine.exists()).toBeTruthy();
      const topLineStyle = topLine.getStyle();
      expect(topLineStyle.backgroundColor).toEqual('#00A87E');
      expect(topLineStyle.width).toEqual(3);
    });

    it('should render BottomLine', () => {
      const props = {bottomLine: {color: '#FFF4D3', width: 5}};
      const {timelineDriver} = getDriver(props);
      const bottomLine = timelineDriver.getBottomLine();
      expect(bottomLine.exists()).toBeTruthy();
      const bottomLineStyle = bottomLine.getStyle();
      expect(bottomLineStyle.backgroundColor).toEqual('#FFF4D3');
      expect(bottomLineStyle.width).toEqual(5);
    });

    it('should render TopLine with entryPoint', () => {
      const props = {topLine: {entry: true}};
      const {timelineDriver} = getDriver(props);
      const topLine = timelineDriver.getTopLine();
      expect(topLine.exists()).toBeTruthy();
      expect(topLine.isEntryPointExists()).toBeTruthy();
    });
  });
});
