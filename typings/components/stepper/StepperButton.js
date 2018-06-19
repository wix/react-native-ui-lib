import React from "react";
import { TouchableOpacity, Text } from "react-native";
const StepperButton = ({ label, testId, styles, disabled, onPress }) => (<TouchableOpacity disabled={disabled} testID={testId} onPress={onPress} style={styles.button}>
    <Text style={[styles.buttonText, disabled && styles.disableText]} allowFontScaling={false}>
      {label}
    </Text>
  </TouchableOpacity>);
StepperButton.displayName = "IGNORE";
export default StepperButton;
