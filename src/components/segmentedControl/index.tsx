import _ from 'lodash';
import React, {useState} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {EasingNode, Easing as _Easing} from 'react-native-reanimated';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment from './segment';

const {interpolate: _interpolate, interpolateNode} = Reanimated;
const interpolate = interpolateNode || _interpolate;
const Easing = EasingNode || _Easing;
const BORDER_WIDTH = 1;

export type SegmentedControlProps = {
  /**
   * Array on segment labels.
   */
  labels?: string[];
  /**
   * The color of the active segment.
   */
  color?: string;
  /**
   * Callback for when index has change.
   */
  onChangeIndex?: (index: number) => void;
  /**
   * Initial index to be active.
   */
  initialIndex?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * @description: SegmentedControl component for toggling two values or more
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SegmentedControlScreen.tsx
 */
const SegmentedControl = (props: SegmentedControlProps) => {
  const [selectedSegment, setSelectedSegment] = useState(props.initialIndex || 0);

  const segments: {x: number; width: number}[] = [];
  let segmentsCounter = 0;
  const animatedValue = new Reanimated.Value(selectedSegment);

  const onSegmentPress = (index: number) => {
    if (selectedSegment !== index) {
      props.onChangeIndex?.(index);
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
    segments[index] = {x, width};
    segmentsCounter++;

    return segmentsCounter === props.labels?.length && setSelectedSegment(props.initialIndex || 0);
  };

  const getAnimatedStyle = () => {
    if (segmentsCounter === props.labels?.length) {
      const left = interpolate(selectedSegment, {
        inputRange: _.times(segmentsCounter),
        outputRange: _.map(segments, segment => segment.x - BORDER_WIDTH)
      });

      const width = interpolate(selectedSegment, {
        inputRange: _.times(segmentsCounter),
        outputRange: _.map(segments, segment => segment.width)
      });

      return {width, left};
    }
    return undefined;
  };

  const {style, labels, color = Colors.primary} = props;
  const animatedStyle = getAnimatedStyle();

  return (
    <View row center style={[styles.container, style]}>
      {animatedStyle && <Reanimated.View style={[styles.selectedSegment, animatedStyle, {borderColor: color}]}/>}
      {_.map(labels, (_value, index) => {
        return (
          <Segment
            key={index}
            segmentOnLayout={onLayout}
            index={index}
            onPress={index => onSegmentPress(index)}
            label={labels?.[index]}
            isSelected={selectedSegment === index}
            color={color}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.grey80,
    height: Spacings.s7,
    borderColor: Colors.grey60,
    borderWidth: BORDER_WIDTH
  },
  selectedSegment: {
    height: Spacings.s7 - 2 * BORDER_WIDTH,
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.white
  },
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

SegmentedControl.displayName = 'SegmentedControl';

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
