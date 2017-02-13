import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';

const StepperButton = ({label, testId, styles, disabled, onPress}) =>
  <TouchableOpacity disabled={disabled} testID={testId} onPress={onPress} style={styles.button}>
    <Text style={[styles.buttonText, disabled && styles.disableText]}>
      {label}
    </Text>
  </TouchableOpacity>;

StepperButton.propTypes = {
  /**
   * Text to show on the button
   */
  label: React.PropTypes.string,
  /**
   * Use to identify the button in tests
   */
  testId: React.PropTypes.string,
  /**
   * Style from the parent component with `button` style, `buttonText` style and `disableText` style
   */
  styles: React.PropTypes.object.isRequired,
  /**
   * Disabled state of the button
   */
  disabled: React.PropTypes.bool,
  /**
   * Handler function to receive updates when the value changes
   */
  onPress: React.PropTypes.func,
};

StepperButton.displayName = 'StepperButton';

export default StepperButton;
