import _ from 'lodash';
import React, {useRef, useState, useCallback} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment, {SegmentedControlItemProps as SegmentProps} from './segment';
import {Constants} from 'helpers';

const BORDER_WIDTH = 1;
const TIMING_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.33, 1, 0.68, 1)
};

export type SegmentedControlItemProps = SegmentProps;
export type SegmentedControlProps = {
  /**
   * Array on segments.
   */
  segments?: SegmentedControlItemProps[];
  /**
   * The color of the active segment label.
   */
  activeColor?: string;
  /**
   * The color of the inactive segments (label).
   */
  inactiveColor?: string;
  /**
   * Callback for when index has change.
   */
  onChangeIndex?: (index: number) => void;
  /**
   * Initial index to be active.
   */
  initialIndex?: number;
  /**
   * The segmentedControl borderRadius
   */
  borderRadius?: number;
  /**
   * The background color of the inactive segments
   */
  backgroundColor?: string;
  /**
   * The background color of the active segment
   */
  activeBackgroundColor?: string;
  /**
   * The color of the active segment outline
   */
  outlineColor?: string;
  /**
   * The width of the active segment outline
   */
  outlineWidth?: number;
  /**
   * Should the icon be on right of the label
   */
  iconOnRight?: boolean;
  /**
   * Trailing throttle time of changing index in ms.
   */
  throttleTime?: number;
  /**
   * Additional spacing styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * @description: SegmentedControl component for toggling two values or more
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SegmentedControlScreen.tsx
 */
const SegmentedControl = (props: SegmentedControlProps) => {
  const {
    onChangeIndex,
    initialIndex = 0,
    containerStyle,
    style,
    segments,
    activeColor = Colors.primary,
    borderRadius = BorderRadiuses.br100,
    backgroundColor = Colors.grey80,
    activeBackgroundColor = Colors.white,
    inactiveColor = Colors.grey20,
    outlineColor = activeColor,
    outlineWidth = BORDER_WIDTH,
    throttleTime = 0,
    testID
  } = props;
  const [selectedSegment, setSelectedSegment] = useState(-1);
  const animatedSelectedIndex = useSharedValue(selectedSegment);
  const segmentsStyle = useRef([] as {x: number; width: number}[]);
  const segmentedControlHeight = useRef(0);
  const segmentsCounter = useRef(0);

  const changeIndex = useCallback(_.throttle(() => {
    onChangeIndex?.(animatedSelectedIndex.value);
  },
  throttleTime,
  {trailing: true, leading: false}),
  []);

  useAnimatedReaction(() => {
    return animatedSelectedIndex.value;
  },
  (selected, previous) => {
    if (selected !== -1 && selected !== previous) {
      onChangeIndex && runOnJS(changeIndex)();
    }
  },
  []);

  const onSegmentPress = useCallback((index: number) => {
    setSelectedSegment(index);
    animatedSelectedIndex.value = index;
  }, []);

  const onLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const {x, width, height} = event.nativeEvent.layout;
    segmentsStyle.current[index] = {x, width};
    segmentedControlHeight.current = height - 2 * BORDER_WIDTH;
    segmentsCounter.current++;

    return segmentsCounter.current === segments?.length && setSelectedSegment(initialIndex);
  },
  [initialIndex, segments?.length]);

  const animatedStyle = useAnimatedStyle(() => {
    if (segmentsCounter.current === segments?.length) {
      const inset = withTiming(segmentsStyle.current[selectedSegment].x, TIMING_CONFIG);
      const width = withTiming(segmentsStyle.current[selectedSegment].width - 2 * BORDER_WIDTH, TIMING_CONFIG);
      return Constants.isRTL ? {width, right: inset} : {width, left: inset};
    }
    return {};
  }, [segmentsCounter.current, segments?.length, selectedSegment]);

  const renderSegments = () =>
    _.map(segments, (_value, index) => {
      const isSelected = selectedSegment === index;
      return (
        <Segment
          key={index}
          onLayout={onLayout}
          index={index}
          onPress={onSegmentPress}
          isSelected={isSelected}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          {...segments?.[index]}
          testID={testID}
        />
      );
    });

  return (
    <View style={containerStyle} testID={testID}>
      <View row center style={[styles.container, style, {borderRadius, backgroundColor}]}>
        {animatedStyle && (
          <Reanimated.View
            style={[
              styles.selectedSegment,
              animatedStyle,
              {
                borderColor: outlineColor,
                borderRadius,
                backgroundColor: activeBackgroundColor,
                borderWidth: outlineWidth,
                height: segmentedControlHeight.current
              }
            ]}
          />
        )}
        {renderSegments()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey80,
    borderColor: Colors.grey60,
    borderWidth: BORDER_WIDTH
  },
  selectedSegment: {
    position: 'absolute'
  },
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

SegmentedControl.displayName = 'SegmentedControl';

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
