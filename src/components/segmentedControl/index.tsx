import React, {Component} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';
import Text from '../text';

export type SegmentedControlProps = {
  /**
   * The label of the left segment.
   */
  leftLabel?: string;
  /**
   * The label of the right segment.
   */
  rightLabel?: string;
  /**
   * The color of the active segment.
   */
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * SegmentedControl component for toggling two values
 */
class SegmentedControl extends Component<SegmentedControlProps> {
  static displayName = 'SegmentedControl';

  state = {
    isLeftActive: true
  };

  onPressRight() {
    return this.setState({isLeftActive: false});
  }

  onPressLeft() {
    return this.setState({isLeftActive: true});
  }

  render() {
    const {leftLabel, rightLabel, color, style} = this.props;
    const {isLeftActive} = this.state;
    
    const activeColor = color || Colors.primary;

    const rightSegmentStyle = isLeftActive ? styles.inActiveSegment : [styles.activeSegment, {borderColor: activeColor}];
    const leftSegmentStyle = isLeftActive ? [styles.activeSegment, {borderColor: activeColor}] : styles.inActiveSegment;
    const rightColor = isLeftActive ? Colors.grey20 : activeColor;
    const leftColor = isLeftActive ? activeColor : Colors.grey20;
    

    return (

      <View center row style={[styles.container, style]}>
        <TouchableOpacity style={leftSegmentStyle} onPress={() => this.onPressLeft()}>
          <Text text90 numberOfLines={1} color={leftColor}>{leftLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={rightSegmentStyle} onPress={() => this.onPressRight()}>
          <Text text90 numberOfLines={1} color={rightColor}>{rightLabel}</Text>
        </TouchableOpacity>
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
    borderWidth: 1

  },
  activeSegment: {
    borderRadius: BorderRadiuses.br100,
    borderWidth: 1,
    height: Spacings.s7,
    paddingHorizontal: Spacings.s3,
    backgroundColor: Colors.white,
    justifyContent: 'center'
  },
  inActiveSegment: {
    paddingHorizontal: Spacings.s3
  }
});

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
