import Colors from '../../style/colors';
const checkMarkSmall = require('./assets/checkMarkSmall.png');
const exclamationSmall = require('./assets/exclamationSmall.png');

export const States = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  ERROR: 'error',
  SKIPPED: 'skipped',
  COMPLETED: 'completed'
};

export const StatesConfig = {
  enabled: {color: Colors.grey30, circleColor: Colors.grey60, enabled: true},
  disabled: {color: Colors.grey50, circleColor: Colors.grey60},
  error: {color: Colors.red30, icon: exclamationSmall, enabled: true, accessibilityInfo: 'Validation Error'},
  skipped: {color: Colors.red30, enabled: true, accessibilityInfo: 'Not completed'},
  completed: {
    color: Colors.grey30,
    circleColor: Colors.grey60,
    icon: checkMarkSmall,
    enabled: true,
    accessibilityInfo: 'Completed'
  },
  active: {color: Colors.blue10, circleColor: Colors.blue10}
};
