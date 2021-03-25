import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Colors, BorderRadiuses, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';
import Text from '../text';

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
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * SegmentedControl component for toggling two values
 */
class SegmentedControl extends Component<SegmentedControlProps> {
  static displayName = 'SegmentedControl';

  state = {
    selectedSegment: 0
  };

  onSegmentPress = (index: number) => {
    if (this.state.selectedSegment !== index) {
      this.props.onChangeIndex?.(index);
      return this.setState({selectedSegment: index});
    }
  };

  renderSegment = (index: number) => {
    const {selectedSegment} = this.state;
    const {color, labels} = this.props;

    const isSelected = selectedSegment === index;
    const segmentedColor = isSelected ? color || Colors.primary : Colors.grey20;
    const segmentStyle = isSelected ? [styles.SelectedSegment, {borderColor: segmentedColor}] : styles.segment;

    return (
      <TouchableOpacity key={index} style={segmentStyle} onPress={() => this.onSegmentPress(index)}>
        <Text text90 numberOfLines={1} color={segmentedColor}>
          {labels?.[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {style, labels} = this.props;

    return (
      <View center row style={[styles.container, style]}>
        {_.map(labels, (_value, index) => {
          return this.renderSegment(index);
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
    borderWidth: 1
  },
  SelectedSegment: {
    borderRadius: BorderRadiuses.br100,
    borderWidth: 1,
    height: Spacings.s7,
    paddingHorizontal: Spacings.s3,
    backgroundColor: Colors.white,
    justifyContent: 'center'
  },
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

export default asBaseComponent<SegmentedControlProps>(SegmentedControl);
