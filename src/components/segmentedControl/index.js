import _map from "lodash/map";
import _throttle from "lodash/throttle";
import React, { useRef, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { Colors } from "../../style";
import { Constants, asBaseComponent } from "../../commons/new";
import View from "../view";
import Segment, { SegmentedControlItemProps } from "./segment";
import useSegmentedControlPreset from "./useSegmentedControlPreset";
import Text from "../text";
const CONTAINER_BORDER_WIDTH = 1;
const TIMING_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.33, 1, 0.68, 1)
};
export let SegmentedControlPreset = /*#__PURE__*/function (SegmentedControlPreset) {
  SegmentedControlPreset["DEFAULT"] = "default";
  SegmentedControlPreset["FORM"] = "form";
  return SegmentedControlPreset;
}({});
export { SegmentedControlItemProps };
const nonAreUndefined = array => {
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
const SegmentedControl = props => {
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
  const segmentsStyle = useSharedValue([]);
  // const shouldResetOnDimensionsOnNextLayout = useRef(false); // use this flag if there bugs with onLayout being called more than once.
  const segmentsDimensions = useRef([]);
  const containerHeight = useSharedValue(0);
  useEffect(() => {
    animatedSelectedIndex.value = initialIndex;
  }, [initialIndex, animatedSelectedIndex]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeIndex = useCallback(_throttle(() => {
    onChangeIndex?.(animatedSelectedIndex.value);
  }, throttleTime, {
    trailing: true,
    leading: false
  }), [throttleTime, onChangeIndex]);
  useAnimatedReaction(() => {
    return animatedSelectedIndex.value;
  }, (selected, previous) => {
    if (selected !== -1 && previous !== null && selected !== previous) {
      onChangeIndex && runOnJS(changeIndex)();
    }
  }, [changeIndex]);
  const onSegmentPress = useCallback(index => {
    animatedSelectedIndex.value = index;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLayout = useCallback((index, event) => {
    // if (shouldResetOnDimensionsOnNextLayout.current) {
    //   shouldResetOnDimensionsOnNextLayout.current = false;
    //   segmentsDimensions.current = getInitialSegmentsDimensionsArray(segments.length || 0);
    // }
    const {
      x,
      width
    } = event.nativeEvent.layout;
    segmentsDimensions.current[index] = {
      x,
      width
    };
    if (segmentsDimensions.current.length === segments.length && nonAreUndefined(segmentsDimensions.current)) {
      segmentsStyle.value = [...segmentsDimensions.current];
      // shouldResetOnDimensionsOnNextLayout.current = true;// in case onLayout will be called again (orientation change etc.)
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [initialIndex, segments.length]);
  const containerOnLayout = useCallback(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => {
    containerHeight.value = height;
  }, [containerHeight]);
  const animatedStyle = useAnimatedStyle(() => {
    const {
      value
    } = segmentsStyle;
    const {
      value: height
    } = containerHeight;
    if (height !== 0 && value.length === segments.length && nonAreUndefined(value)) {
      const isFirstElementSelected = animatedSelectedIndex.value === 0;
      const isLastElementSelected = animatedSelectedIndex.value === value.length - 1;
      const isMiddleSelected = !isFirstElementSelected && !isLastElementSelected;
      const insetFix = -CONTAINER_BORDER_WIDTH - (!isFirstElementSelected ? segmentDividerWidth : 1);
      const widthFix = isMiddleSelected ? 2 * segmentDividerWidth : CONTAINER_BORDER_WIDTH + segmentDividerWidth;
      const inset = withTiming(value[animatedSelectedIndex.value].x + insetFix, TIMING_CONFIG);
      const width = withTiming(value[animatedSelectedIndex.value].width + widthFix, TIMING_CONFIG);
      return Constants.isRTL ? {
        width,
        height,
        right: inset
      } : {
        width,
        height,
        left: inset
      };
    }
    return {};
  });
  const shouldRenderDividers = segmentDividerWidth !== 0;
  const renderSegments = () => _map(segments, (_value, index) => {
    const isLastSegment = index + 1 === segments.length;
    return <React.Fragment key={`segment-fragment-${index}`}>
          <Segment key={`segment-${index}`} onLayout={onLayout} index={index} onPress={onSegmentPress} selectedIndex={animatedSelectedIndex} activeColor={activeColor} inactiveColor={inactiveColor} style={[segmentsStyleProp]} segmentLabelStyle={segmentLabelStyle} iconTintColor={iconTintColor} {...segments[index]} testID={testID} />
          {!isLastSegment && shouldRenderDividers && <View key={`segment.divider-${index}`} width={segmentDividerWidth} height={'100%'} style={{
        backgroundColor: segmentDividerColor
      }} />}
        </React.Fragment>;
  });
  return <View style={containerStyle} testID={testID}>
      {label && <Text bodySmall $textNeutralHeavy marginB-s1 {...labelProps}>{label}</Text>}
      <View row center onLayout={containerOnLayout} style={[styles.container, style, {
      borderRadius,
      backgroundColor
    }]}>
        <View reanimated style={[styles.selectedSegment, {
        borderRadius,
        backgroundColor: activeBackgroundColor,
        borderWidth: shouldRenderDividers ? undefined : outlineWidth,
        borderColor: shouldRenderDividers ? undefined : outlineColor
      }, animatedStyle]} />
        {renderSegments()}
        {shouldRenderDividers && <View reanimated style={[styles.selectedSegment, {
        borderColor: outlineColor,
        borderRadius,
        borderWidth: outlineWidth
      }, animatedStyle]} />}
      </View>
    </View>;
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
SegmentedControl.displayName = 'SegmentedControl';
SegmentedControl.presets = SegmentedControlPreset;
export default asBaseComponent(SegmentedControl);