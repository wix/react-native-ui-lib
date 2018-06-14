// TODO: update usage of React Context API to latest (https://reactjs.org/docs/context.html)
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import {Colors} from '../../style';
import View from '../view';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;

/**
 * A Radio Button component, should be wrapped inside a RadioGroup
 */
class RadioButton extends BaseComponent {
  static displayName = 'RadioButton';

  static propTypes = {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value: PropTypes.string.isRequired,
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange: PropTypes.func,
    /**
     * The color of the radio button
     */
    color: PropTypes.string,
    /**
     * The size of the radio button, affect both width & height
     */
    size: PropTypes.number,
    /**
     * The radio button border radius
     */
    borderRadius: PropTypes.number,
  };

  static contextTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
  };

  state = {};

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  onPress = () => {
    const {value} = this.props;
    _.invoke(this.context, 'onValueChange', value);
    _.invoke(this.props, 'onValueChange', value);
  };

  isSelected() {
    const {value} = this.props;
    const {value: selectedValue} = this.context;
    return value === selectedValue;
  }

  render() {
    const {style} = this.getThemeProps();
    return (
      <TouchableOpacity activeOpacity={1} style={[this.styles.container, style]} onPress={this.onPress}>
        {this.isSelected() && <View style={this.styles.selectedIndicator} />}
      </TouchableOpacity>
    );
  }
}

function createStyles({size = DEFAULT_SIZE, borderRadius = DEFAULT_SIZE / 2, color = DEFAULT_COLOR}) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: color,
      width: size,
      height: size,
      borderRadius,
      padding: 3,
    },
    selectedIndicator: {
      backgroundColor: color,
      flex: 1,
      borderRadius,
    },
  });
}

export default RadioButton;
