import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, ViewPropTypes, Keyboard} from 'react-native';
import BaseInput from './BaseInput';
import TextField from './TextField';
import View from '../view';
import Text from '../text';

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
    ...TextField.propTypes,
    /**
     * callback for rendering the custom input out of the value returns from the actual input
     */
    renderMaskedText: PropTypes.elementType.isRequired,
    /**
     * container style for the masked input container
     */
    containerStyle: ViewPropTypes.style
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
    const TextInputProps = TextField.extractOwnProps(this.props, ['containerStyle', 'style']);

    return (
      <View style={containerStyle}>
        <TextField
          {...this.props}
          ref={r => (this.input = r)}
          containerStyle={styles.hiddenInputContainer}
          style={styles.hiddenInput}
          enableErrors={false}
          hideUnderline
          placeholder=""
          {...TextInputProps}
          caretHidden
          multiline={false}
          onChangeText={this.onChangeText}
        />
        <View style={styles.maskedInputWrapper}>{this.renderMaskedText()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenInputContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  },
  hiddenInput: {
    color: 'transparent',
    backgroundColor: 'transparent',
    height: undefined
  },
  maskedInputWrapper: {
    zIndex: 0
  }
});
