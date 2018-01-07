import React from 'react';
import {StyleSheet, ViewPropTypes, Keyboard} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import BaseInput from './BaseInput';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';

/**
 * @description: Mask Input to create custom looking inputs with custom formats
 * @extends: TextInput
 * @image: https://user-images.githubusercontent.com/33805983/34515770-6a106a4c-f07c-11e7-99c9-616020e9ba7d.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/MaskedInputScreen.js
 */
export default class MaskedInput extends BaseInput {
  static displayName = 'MaskedInput';
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * callback for rendering the custom input out of the value returns from the actual input
     */
    renderMaskedText: PropTypes.func.isRequired,
    /**
     * container style for the masked input container
     */
    containerStyle: ViewPropTypes.style,
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (_.invoke(this, 'isFocused')) {
        _.invoke(this, 'blur');
      }
    });
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  renderMaskedText() {
    const {renderMaskedText} = this.props;
    const {value} = this.state;

    if (_.isFunction(renderMaskedText)) {
      return renderMaskedText(value);
    }

    return <Text>{value}</Text>;
  }

  render() {
    const {containerStyle} = this.props;
    return (
      <View style={[containerStyle]}>
        <TextInput
          {...this.props}
          ref={(input) => {
            this.input = input;
          }}
          containerStyle={styles.hiddenInputContainer}
          style={styles.hiddenInput}
          enableErrors={false}
          hideUnderline
          placeholder=""
          onChangeText={this.onChangeText}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.maskedInputWrapper}
          onPress={this.focus}
        >
          {this.renderMaskedText()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenInputContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  hiddenInput: {
    color: 'transparent',
    height: undefined,
  },
  maskedInputWrapper: {
    zIndex: 1,
  },
});
