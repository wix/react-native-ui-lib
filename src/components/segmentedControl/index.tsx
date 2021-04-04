import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {EasingNode, Easing as _Easing} from 'react-native-reanimated';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment, {SegmentItemProps} from './segment';

const {interpolate: _interpolate, interpolateNode} = Reanimated;
const interpolate = interpolateNode || _interpolate;
const Easing = EasingNode || _Easing;
const BORDER_WIDTH = 1;

export type SegmentedControlProps = {
  /**
   * Array on segment labels.
   */
  labels?: SegmentItemProps[];
  /**
   * The color of the active segment.
   */
  activeColor?: string;
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
   * The segmentedControl borderRadius
   */
  containerBorderRadius?: number;
  /**
   * The background color of the segmentedControl
   */
  backgroundColor?: string;
  /**
   * The background color of the active segment
   */
  activeBackgroundColor?: string;
  unActiveColor?: string;
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
    style,
    labels,
    activeColor = Colors.primary,
    containerBorderRadius = BorderRadiuses.br100,
    borderRadius = BorderRadiuses.br100,
    backgroundColor = Colors.grey80,
    activeBackgroundColor = Colors.white,
    unActiveColor = Colors.grey20
  } = props;
  const [selectedSegment, setSelectedSegment] = useState(-1);

  const segments = useRef([] as {x: number; width: number}[]);
  const segmentsCounter = useRef(0);
  const animatedValue = new Reanimated.Value(selectedSegment);

  const onSegmentPress = (index: number) => {
    if (selectedSegment !== index) {
      onChangeIndex?.(index);
      updateSelectedSegment(index);
    }
  };

  const updateSelectedSegment = (index: number) => {
    Reanimated.timing(animatedValue, {
      toValue: index,
      duration: 300,
      easing: Easing.bezier(0.33, 1, 0.68, 1)
    }).start();

    return setSelectedSegment(index);
  };

  const onLayout = (index: number, event: LayoutChangeEvent) => {
    const {x, width} = event.nativeEvent.layout;
    segments.current[index] = {x, width};
    segmentsCounter.current++;

    return segmentsCounter.current === labels?.length && setSelectedSegment(initialIndex);
  };

  const getAnimatedStyle = () => {
    if (segmentsCounter.current === labels?.length) {
      const left = interpolate(animatedValue, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segments.current, segment => segment.x - BORDER_WIDTH)
      });

      const width = interpolate(animatedValue, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segments.current, segment => segment.width)
      });

      return {width, left};
    }
    return undefined;
  };

  const animatedStyle = getAnimatedStyle();

  return (
    <View row center style={[styles.container, style, {borderRadius: containerBorderRadius, backgroundColor}]}>
      <Reanimated.View
        style={[
          styles.selectedSegment,
          animatedStyle,
          {borderColor: activeColor, borderRadius, backgroundColor: activeBackgroundColor}
        ]}
      />
      {_.map(labels, (_value, index) => {
        return (
          <Segment
            key={index}
            segmentOnLayout={onLayout}
            index={index}
            onPress={index => onSegmentPress(index)}
            isSelected={selectedSegment === index}
            activeColor={activeColor}
            unActiveColor={unActiveColor}
            {...labels?.[index]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey80,
    height: Spacings.s7,
    borderColor: Colors.grey60,
    borderWidth: BORDER_WIDTH
  },
  selectedSegment: {
    height: Spacings.s7 - 2 * BORDER_WIDTH,
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    backgroundColor: Colors.white
  },
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

SegmentedControl.displayName = 'SegmentedControl';

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
