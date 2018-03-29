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
 * @extendslink: docs/TagsInput
 * @gif: https://camo.githubusercontent.com/61eedb65e968845d5eac713dcd21a69691571fb1/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4b5a5a7446666f486f454b334b2f67697068792e676966
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
    const {containerStyle, hideUnderline} = this.props;
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
          hideUnderline={hideUnderline}
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

MaskedInput.defaultProps = {
  hideUnderline: true,
};

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
