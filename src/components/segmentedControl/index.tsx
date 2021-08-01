import _ from 'lodash';
import React, {useRef, useState, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {EasingNode, Easing as _Easing} from 'react-native-reanimated';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment, {SegmentedControlItemProps as SegmentProps} from './segment';
import {Constants} from 'helpers';

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
    testID
  } = props;
  const [selectedSegment, setSelectedSegment] = useState(-1);

  const segmentsStyle = useRef([] as {x: number; width: number}[]);
  const segmentedControlHeight = useRef(0);
  const indexRef = useRef(0);
  const segmentsCounter = useRef(0);
  const animatedValue = useRef(new Reanimated.Value(initialIndex));

  const changeIndex = useCallback(_.throttle(() => {
    onChangeIndex?.(indexRef.current);
  },
  400,
  {trailing: true, leading: false}),
  []);

  const onSegmentPress = useCallback((index: number) => {
    if (selectedSegment !== index) {
      setSelectedSegment(index);
      indexRef.current = index;

      Reanimated.timing(animatedValue.current, {
        toValue: index,
        duration: 300,
        easing: Easing.bezier(0.33, 1, 0.68, 1)
      }).start(changeIndex);
    }
  },
  [onChangeIndex, selectedSegment]);

  const onLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const {x, width, height} = event.nativeEvent.layout;
    segmentsStyle.current[index] = {x, width};
    segmentedControlHeight.current = height - 2 * BORDER_WIDTH;
    segmentsCounter.current++;

    return segmentsCounter.current === segments?.length && setSelectedSegment(initialIndex);
  },
  [initialIndex, segments?.length]);

  const animatedStyle = useMemo(() => {
    if (segmentsCounter.current === segments?.length) {
      const inset = interpolate(animatedValue.current, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segmentsStyle.current, segment => segment.x)
      });

      const width = interpolate(animatedValue.current, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segmentsStyle.current, segment => segment.width - 2 * BORDER_WIDTH)
      });

      return [{width}, Constants.isRTL ? {right: inset} : {left: inset}];
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
