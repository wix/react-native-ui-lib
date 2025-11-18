import _ from 'lodash';
import React, {useRef, useCallback, useEffect} from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent} from 'react-native';
import {
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
import Text, {TextProps} from '../text';

const CONTAINER_BORDER_WIDTH = 1;
const TIMING_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.33, 1, 0.68, 1)
};

export enum SegmentedControlPreset {
  DEFAULT = 'default',
  FORM = 'form'
}

export {SegmentedControlItemProps};
export type SegmentedControlProps = {
  /**
   * Array on segments.
   */
  segments: SegmentedControlItemProps[];
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
  preset?: SegmentedControlPreset | `${SegmentedControlPreset}`;
  /**
   * SegmentedControl label
   */
  label?: string;
  /**
   * Pass props for the SegmentedControl label
   */
  labelProps?: TextProps;
};

const noneAreUndefined = <T, >(array: Array<T | undefined>): array is Array<T> => {
  'worklet';
  for (const item of array) {
    if (item === undefined) {
      return false;
    }
  }
  return true;
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
    iconTintColor,
    segmentDividerWidth,
    segmentDividerColor,
    label,
    labelProps
  } = useSegmentedControlPreset(props);
  const animatedSelectedIndex = useSharedValue(initialIndex);
  const segmentsStyle = useSharedValue<{x: number; width: number}[]>([]);
  // const shouldResetOnDimensionsOnNextLayout = useRef(false); // use this flag if there bugs with onLayout being called more than once.
  const segmentsDimensions = useRef<{x: number; width: number}[]>([]);
  const containerHeight = useSharedValue(0);

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
    // if (shouldResetOnDimensionsOnNextLayout.current) {
    //   shouldResetOnDimensionsOnNextLayout.current = false;
    //   segmentsDimensions.current = getInitialSegmentsDimensionsArray(segments.length || 0);
    // }
    const {x, width} = event.nativeEvent.layout;
    segmentsDimensions.current[index] = {x, width};
    if (segmentsDimensions.current.length === segments.length && noneAreUndefined(segmentsDimensions.current)) {
      segmentsStyle.value = [...segmentsDimensions.current];
      // shouldResetOnDimensionsOnNextLayout.current = true;// in case onLayout will be called again (orientation change etc.)
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [initialIndex, segments.length]);

  const containerOnLayout = useCallback(({nativeEvent: {layout: {height}}} : LayoutChangeEvent) => {
    containerHeight.value = height;
  }, [containerHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    const {value} = segmentsStyle;
    const {value: height} = containerHeight;
    if (height !== 0 && value.length === segments.length && noneAreUndefined(value)) {
      const isFirstElementSelected = animatedSelectedIndex.value === 0;
      const isLastElementSelected = animatedSelectedIndex.value === value.length - 1;
      const isMiddleSelected = !isFirstElementSelected && !isLastElementSelected;
      const insetFix = -CONTAINER_BORDER_WIDTH - (!isFirstElementSelected ? segmentDividerWidth : 1);
      const widthFix = isMiddleSelected ? 2 * segmentDividerWidth : CONTAINER_BORDER_WIDTH + segmentDividerWidth;
      const inset = withTiming(value[animatedSelectedIndex.value].x + insetFix, TIMING_CONFIG);
      const width = withTiming(value[animatedSelectedIndex.value].width + widthFix, TIMING_CONFIG);
      return Constants.isRTL ? {width, height, right: inset} : {width, height, left: inset};
    }
    return {};
  });
  const shouldRenderDividers = segmentDividerWidth !== 0;

  const renderSegments = () =>
    _.map(segments, (_value, index) => {
      const isLastSegment = index + 1 === segments.length;
      return (
        <React.Fragment key={`segment-fragment-${index}`}>
          <Segment
            key={`segment-${index}`}
            onLayout={onLayout}
            index={index}
            onPress={onSegmentPress}
            selectedIndex={animatedSelectedIndex}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            style={[segmentsStyleProp]}
            segmentLabelStyle={segmentLabelStyle}
            iconTintColor={iconTintColor}
            {...segments[index]}
            testID={testID}
          />
          {!isLastSegment && shouldRenderDividers && (
            <View
              key={`segment.divider-${index}`}
              width={segmentDividerWidth}
              height={'100%'}
              style={{backgroundColor: segmentDividerColor}}
            />
          )}
        </React.Fragment>
      );
    });
  return (
    <View style={containerStyle} testID={testID}>
      {label && <Text bodySmall $textNeutralHeavy marginB-s1 {...labelProps}>{label}</Text>}
      <View row center onLayout={containerOnLayout} style={[styles.container, style, {borderRadius, backgroundColor}]}>
        <View
          reanimated
          style={[
            styles.selectedSegment,
            {
              borderRadius,
              backgroundColor: activeBackgroundColor,
              borderWidth: shouldRenderDividers ? undefined : outlineWidth,
              borderColor: shouldRenderDividers ? undefined : outlineColor
            },
            animatedStyle
          ]}
        />
        {renderSegments()}
        {shouldRenderDividers && (
          <View
            reanimated
            style={[
              styles.selectedSegment,
              {
                borderColor: outlineColor,
                borderRadius,
                borderWidth: outlineWidth
              },
              animatedStyle
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.$backgroundNeutralLight,
    borderColor: Colors.$outlineDefault,
    borderWidth: CONTAINER_BORDER_WIDTH
  },
  selectedSegment: {
    position: 'absolute'
  }
});
interface StaticMembers {
  presets: typeof SegmentedControlPreset;
}

SegmentedControl.displayName = 'SegmentedControl';
SegmentedControl.presets = SegmentedControlPreset;
export default asBaseComponent<SegmentedControlProps, StaticMembers>(SegmentedControl);
