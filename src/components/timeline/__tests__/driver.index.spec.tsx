import React from 'react';
import {render} from '@testing-library/react-native';
import {TimelineDriver} from '../Timeline.driver';
import {TimelineProps} from '../types';
import Timeline from '../index';
import Text from '../../text';
import Assets from '../../../assets';
import Colors from '../../../style/colors';

const testID = 'test-timeline';
const labelContent = 2;
const defaultIcon = Assets.internal.icons.check;

const getDriver = (props: TimelineProps) => {
  const renderTree = render(<Timeline {...props}>
    <Text>Timeline</Text>
  </Timeline>);
  const timelineDriver = TimelineDriver({renderTree, testID});
  return {timelineDriver};
};

describe('Timeline', () => {
  describe('Label', () => {
    const timelineProps = {testID, point: {label: labelContent, icon: undefined}};
    it('should render Label', () => {
      const {timelineDriver} = getDriver(timelineProps);
      expect(timelineDriver.getLabel().exists()).toBeTruthy();

      const content = timelineDriver.getLabel().getText();
      expect(content).toEqual(labelContent.toString());
    });

    it('should not render Label', () => {
      timelineProps.point.icon = defaultIcon;
      const {timelineDriver} = getDriver(timelineProps);
      expect(timelineDriver.getLabel().exists()).toBeFalsy();
    });
  });

  describe('Icon', () => {
    const timelineProps = {testID, point: {icon: defaultIcon}};
    it('should render Icon', () => {
      const {timelineDriver} = getDriver(timelineProps);
      expect(timelineDriver.getIcon().exists()).toBeTruthy();
    });
  });

  describe('Lines', () => {
    const timelineProps = {
      testID,
      point: {icon: defaultIcon},
      topLine: {color: '#f13acb'},
      bottomLine: {color: '#ef115d'}
    };
    it('should render top and bottom lines', () => {
      const {timelineDriver} = getDriver(timelineProps);

      expect(timelineDriver.getTopLine().exists()).toBeTruthy();
      expect(timelineDriver.getBottomLine().exists()).toBeTruthy();

      const topLineColor = timelineDriver.getTopLine().getTopLineStyle().backgroundColor;
      const bottomLineColor = timelineDriver.getBottomLine().getBottomLineStyle().backgroundColor;

      expect(topLineColor).toEqual('#f13acb');
      expect(bottomLineColor).toEqual('#ef115d');
    });
  });

  describe('Point', () => {
    it('should render Point with custom background color', () => {
      const timelineProps = {
        testID,
        point: {icon: defaultIcon, color: '#f13acb'}
      };
      const {timelineDriver} = getDriver(timelineProps);
      expect(timelineDriver.getPoint().exists()).toBeTruthy();

      const pointStyle = timelineDriver.getPoint().getStyle();
      expect(pointStyle.backgroundColor).toEqual('#f13acb');
    });

    it('should render Point with background color based on State', () => {
      const timelineProps = {
        testID,
        point: {icon: defaultIcon, state: Timeline.states.CURRENT}
      };
      const {timelineDriver} = getDriver(timelineProps);
      expect(timelineDriver.getPoint().exists()).toBeTruthy();

      const pointStyle = timelineDriver.getPoint().getStyle();
      expect(pointStyle.backgroundColor).toEqual(Colors.$backgroundPrimaryHeavy);
    });
  });
});
