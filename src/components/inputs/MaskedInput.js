import React from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import BaseInput from './BaseInput';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';

/**
 * Mask Input to create custom looking inputs with custom formats
 * @extends: TextInput
 */
export default class MaskedInput extends BaseInput {
  static displayName = 'MaskedInput';
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * callback for rendering the custom input out of the value returns from the actual input
     */
    renderMaskedText: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.focusInput = this.focusInput.bind(this);
  }

  renderMaskedText() {
    const {renderMaskedText} = this.props;
    const {value} = this.state;

    if (_.isFunction(renderMaskedText)) {
      return renderMaskedText(value);
    }

    return <Text>{value}</Text>;
  }

  focusInput() {
    this.input.focus();
  }

  render() {
    return (
      <View>
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
          onPress={this.focusInput}
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
