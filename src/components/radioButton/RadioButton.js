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
    value: PropTypes.string,
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected: PropTypes.bool,
    /**
     * Invoked when pressing the button
     */
    onPress: PropTypes.func,
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
    _.invoke(this.props, 'onPress', this.isSelected());
  };

  isSelected(props = this.props, context = this.context) {
    const {value, selected} = props;
    // Individual Radio Button
    if (_.isUndefined(value)) {
      return Boolean(selected);
    }
    // Grouped Radio Button
    const {value: selectedValue} = context;
    return value === selectedValue;
  }

  getContainerStyle() {
    const {color, size, borderRadius, style: propsStyle} = this.getThemeProps();
    const style = [this.styles.container];
    if (size) {
      style.push({width: size, height: size});
    }

    if (borderRadius) {
      style.push({borderRadius});
    }

    if (color) {
      style.push({borderColor: color});
    }

    style.push(propsStyle);
    return style;
  }

  getSelectedStyle() {
    const {color, borderRadius} = this.getThemeProps();
    const style = [this.styles.selectedIndicator];

    if (borderRadius) {
      style.push({borderRadius});
    }

    if (color) {
      style.push({backgroundColor: color});
    }

    return style;
  }

  render() {
    const {style, onPress, ...others} = this.getThemeProps();
    const Container = (onPress || this.context.onValueChange) ? TouchableOpacity : View;
    return (
      <Container activeOpacity={1} {...others} style={this.getContainerStyle()} onPress={this.onPress}>
        {this.isSelected() && <View style={this.getSelectedStyle()} />}
      </Container>
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
