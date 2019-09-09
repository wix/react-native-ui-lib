import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text} from 'react-native';

const StepperButton = ({label, testID, styles, disabled, onPress}) => (
  <TouchableOpacity disabled={disabled} testID={testID} onPress={onPress} style={styles.button}>
    <Text style={[styles.buttonText, disabled && styles.disableText]} allowFontScaling={false}>
      {label}
    </Text>
  </TouchableOpacity>
);

StepperButton.propTypes = {
  /**
   * Text to show on the button
   */
  label: PropTypes.string,
  /**
   * Style from the parent component with `button` style, `buttonText` style and `disableText` style
   */
  styles: PropTypes.object.isRequired,
  /**
   * Disabled state of the button
   */
  disabled: PropTypes.bool,
  /**
   * Handler function to receive updates when the value changes
   */
  onPress: PropTypes.func,
  testID: PropTypes.string
};

StepperButton.displayName = 'IGNORE';

export default StepperButton;
