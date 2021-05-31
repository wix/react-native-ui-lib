import _ from 'lodash';
import React, {useRef, useState, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {EasingNode, Easing as _Easing} from 'react-native-reanimated';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment, {SegmentedControlItemProps as SegmentProps} from './segment';

const {interpolate: _interpolate, interpolateNode} = Reanimated;
const interpolate = interpolateNode || _interpolate;
const Easing = EasingNode || _Easing;
const BORDER_WIDTH = 1;

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
   * Additional spacing styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
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
    segments,
    activeColor = Colors.primary,
    borderRadius = BorderRadiuses.br100,
    backgroundColor = Colors.grey80,
    activeBackgroundColor = Colors.white,
    inactiveColor = Colors.grey20,
    outlineColor = activeColor,
    outlineWidth = BORDER_WIDTH
  } = props;
  const [selectedSegment, setSelectedSegment] = useState(-1);

  const segmentsStyle = useRef([] as {x: number; width: number}[]);
  const segmentsCounter = useRef(0);
  const animatedValue = useRef(new Reanimated.Value(initialIndex));

  const updateSelectedSegment = useCallback((index: number) => {
    Reanimated.timing(animatedValue.current, {
      toValue: index,
      duration: 300,
      easing: Easing.bezier(0.33, 1, 0.68, 1)
    }).start();

    return setSelectedSegment(index);
  }, []);

  const onSegmentPress = useCallback((index: number) => {
    if (selectedSegment !== index) {
      onChangeIndex?.(index);
      updateSelectedSegment(index);
    }
  },
  [onChangeIndex, selectedSegment, updateSelectedSegment]);

  const onLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const {x, width} = event.nativeEvent.layout;
    segmentsStyle.current[index] = {x, width};
    segmentsCounter.current++;

    return segmentsCounter.current === segments?.length && setSelectedSegment(initialIndex);
  },
  [initialIndex, segments?.length]);

  const animatedStyle = useMemo(() => {
    if (segmentsCounter.current === segments?.length) {
      const left = interpolate(animatedValue.current, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segmentsStyle.current, segment => segment.x - BORDER_WIDTH)
      });

      const width = interpolate(animatedValue.current, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segmentsStyle.current, segment => segment.width)
      });

      return {width, left};
    }
    return undefined;
  }, [segmentsCounter.current, segments?.length]);

  const renderSegments = () =>
    _.map(segments, (_value, index) => {
      return (
        <Segment
          key={index}
          onLayout={onLayout}
          index={index}
          onPress={onSegmentPress}
          isSelected={selectedSegment === index}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          {...segments?.[index]}
        />
      );
    });

  return (
    <View row center style={[styles.container, containerStyle, {borderRadius, backgroundColor}]}>
      <Reanimated.View
        style={[
          styles.selectedSegment,
          animatedStyle,
          {borderColor: outlineColor, borderRadius, backgroundColor: activeBackgroundColor, borderWidth: outlineWidth}
        ]}
      />
      {renderSegments()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey80,
    height: Spacings.s7,
    borderColor: Colors.grey60
  },
  selectedSegment: {
    height: Spacings.s7 - 2 * BORDER_WIDTH,
    position: 'absolute',
    backgroundColor: Colors.white
  },
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

SegmentedControl.displayName = 'SegmentedControl';

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
