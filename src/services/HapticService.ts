import {HapticFeedbackPackage} from '../optionalDependencies';

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false
};

const HapticMethods = [
  'selection',
  'impactLight',
  'impactMedium',
  'impactHeavy',
  'notificationSuccess',
  'notificationWarning',
  'notificationError'
];

function triggerHaptic(hapticMethod: string, componentName: string) {
  if (HapticFeedbackPackage) {
    HapticFeedbackPackage.trigger(hapticMethod, options);
  } else {
    console.error(`RNUILib ${componentName}'s requires installing "react-native-haptic-feedback" dependency`);
  }
}

export default {
  HapticMethods,
  triggerHaptic
};
