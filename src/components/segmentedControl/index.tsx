import _ from 'lodash';
import React, {useRef, useCallback, useEffect} from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import {Colors} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment, {SegmentedControlItemProps} from './segment';
import useSegmentedControlPreset from './useSegmentedControlPreset';

const BORDER_WIDTH = 1;
const TIMING_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.33, 1, 0.68, 1)
};

export {SegmentedControlItemProps};
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
   * Additional style for the segment
   */
  segmentsStyle?: StyleProp<ViewStyle>;
  /**
   * Segment label style
   */
  segmentLabelStyle?: StyleProp<TextStyle>;
  /**
   * Additional spacing styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  /**
   * Preset type
   */
  preset?: 'default' | 'form'
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
    activeColor,
    borderRadius,
    backgroundColor,
    activeBackgroundColor,
    inactiveColor,
    outlineColor,
    outlineWidth,
    throttleTime = 0,
    segmentsStyle: segmentsStyleProp,
    segmentLabelStyle,
    testID,
    iconStyle: presetIconStyle
  } = useSegmentedControlPreset(props);
  const animatedSelectedIndex = useSharedValue(initialIndex);
  const segmentsStyle = useSharedValue([] as {x: number; width: number}[]);
  const segmentedControlHeight = useSharedValue(0);
  const segmentsCounter = useRef(0);

  useEffect(() => {
    animatedSelectedIndex.value = initialIndex;
  }, [initialIndex, animatedSelectedIndex]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeIndex = useCallback(_.throttle(() => {
    onChangeIndex?.(animatedSelectedIndex.value);
  },
  throttleTime,
  {trailing: true, leading: false}),
  [throttleTime, onChangeIndex]);

  useAnimatedReaction(() => {
    return animatedSelectedIndex.value;
  },
  (selected, previous) => {
    if (selected !== -1 && previous !== null && selected !== previous) {
      onChangeIndex && runOnJS(changeIndex)();
    }
  },
  [changeIndex]);

  const onSegmentPress = useCallback((index: number) => {
    animatedSelectedIndex.value = index;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const {x, width, height} = event.nativeEvent.layout;
    segmentsStyle.value[index] = {x, width};
    segmentedControlHeight.value = height + 2 * BORDER_WIDTH;
    segmentsCounter.current++;

    if (segmentsCounter.current === segments?.length) {
      segmentsStyle.value = [...segmentsStyle.value];
      segmentsCounter.current = 0; // in case onLayout will be called again (orientation change etc.)
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [initialIndex, segments?.length]);

  const animatedStyle = useAnimatedStyle(() => {
    if (segmentsStyle.value.length !== 0) {
      const isFirstElementSelected = animatedSelectedIndex.value === 0;
      const isLastElementSelected = animatedSelectedIndex.value === segmentsStyle.value.length - 1;
      const xOffset = isFirstElementSelected ? -2 : isLastElementSelected ? 2 : 0;
      const inset = withTiming(segmentsStyle.value[animatedSelectedIndex.value].x + xOffset, TIMING_CONFIG);
      const width = withTiming(segmentsStyle.value[animatedSelectedIndex.value].width * BORDER_WIDTH, TIMING_CONFIG);
      const height = segmentedControlHeight.value;
      return Constants.isRTL ? {width, right: inset, height} : {width, left: inset, height};
    }
    return {};
  });

  const renderSegments = () =>
    _.map(segments, (_value, index) => {
      return (
        <Segment
          key={index}
          onLayout={onLayout}
          index={index}
          onPress={onSegmentPress}
          selectedIndex={animatedSelectedIndex}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          style={segmentsStyleProp}
          segmentLabelStyle={segmentLabelStyle}
          iconStyle={presetIconStyle}
          {...segments?.[index]}
          testID={testID}
        />
      );
    });
  return (
    <View style={containerStyle} testID={testID}>
      <View row center style={[styles.container, style, {borderRadius, backgroundColor}]}>
        <Reanimated.View
          style={[
            styles.selectedSegment,
            {
              borderColor: outlineColor,
              borderRadius,
              backgroundColor: activeBackgroundColor,
              borderWidth: outlineWidth
            },
            animatedStyle
          ]}
        />
        {renderSegments()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.$backgroundNeutralLight,
    borderColor: Colors.$outlineDefault,
    borderWidth: BORDER_WIDTH
  },
  selectedSegment: {
    position: 'absolute'
  }
});

SegmentedControl.displayName = 'SegmentedControl';

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
