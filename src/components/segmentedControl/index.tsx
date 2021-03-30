import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Reanimated, {Easing} from 'react-native-reanimated';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Segment from './segment';

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
class SegmentedControl extends Component<SegmentedControlProps> {
  static displayName = 'SegmentedControl';
  static defaultProps = {
    color: Colors.primary,
    initialIndex: 0
  };

  state = {
    selectedSegment: this.props.initialIndex
  };

  segments: {width: number; x: number}[] = [];
  segmentsCounter = 0;
  animatedValue = new Reanimated.Value(this.state.selectedSegment);

  onSegmentPress = (index: number) => {
    if (this.state.selectedSegment !== index) {
      this.props.onChangeIndex?.(index);
      this.updateSelectedSegment(index);
    }
  };

  updateSelectedSegment = (index: number) => {
    Reanimated.timing(this.animatedValue, {
      toValue: index,
      duration: 300,
      easing: Easing.bezier(0.33, 1, 0.68, 1)
    }).start();

    return this.setState({selectedSegment: index});
  };

  onLayout = (index: number, event: LayoutChangeEvent) => {
    const {x, width} = event.nativeEvent.layout;
    this.segments[index] = {x, width};
    this.segmentsCounter++;

    return (
      this.segmentsCounter === this.props.labels?.length && this.setState({selectedSegment: this.props.initialIndex})
    );
  };

  getAnimatedStyle = () => {
    if (this.segmentsCounter === this.props.labels?.length) {
      const left = this.animatedValue.interpolate({
        inputRange: _.times(this.segmentsCounter),
        outputRange: _.map(this.segments, segment => segment.x - BORDER_WIDTH)
      });

      const width = this.animatedValue.interpolate({
        inputRange: _.times(this.segmentsCounter),
        outputRange: _.map(this.segments, segment => segment.width)
      });

      return {width, left};
    }
    return undefined;
  };

  render() {
    const {style, labels, color} = this.props;
    const animatedStyle = this.getAnimatedStyle();

    return (
      <View row center style={[styles.container, style]}>
        {animatedStyle && <Reanimated.View style={[styles.selectedSegment, animatedStyle, {borderColor: color}]}/>}
        {_.map(labels, (_value, index) => {
          return (
            <Segment
              segmentOnLayout={this.onLayout}
              index={index}
              onPress={index => this.onSegmentPress(index)}
              label={labels?.[index]}
              isSelected={this.state.selectedSegment === index}
              color={color}
            />
          );
        })}
      </View>
    );
  }
}

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

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
