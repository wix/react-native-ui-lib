import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import BaseInput from '../baseInput';
import TextField from '../textFieldOld';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';

/**
 * @description: Mask Input to create custom looking inputs with custom formats
 * @gif: https://camo.githubusercontent.com/61eedb65e968845d5eac713dcd21a69691571fb1/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4b5a5a7446666f486f454b334b2f67697068792e676966
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/MaskedInputScreen.tsx
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

  clear() {
    this.setState({value: ''});
    this.input.clear();
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const {containerStyle, style} = this.props;

    return (
      <TouchableOpacity style={containerStyle} activeOpacity={1} onPress={() => this.input.focus()}>
        <TextField
          ref={r => (this.input = r)}
          containerStyle={styles.hiddenInputContainer}
          style={styles.hiddenInput}
          enableErrors={false}
          hideUnderline
          placeholder=""
          {...this.props}
          caretHidden
          multiline={false}
          onChangeText={this.onChangeText}
        />
        <View style={styles.maskedInputWrapper}>{this.renderMaskedText()}</View>
      </TouchableOpacity>
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
