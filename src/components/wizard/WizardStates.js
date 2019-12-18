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
  enabled: {color: Colors.dark30, circleColor: Colors.dark60, enabled: true},
  disabled: {color: Colors.dark50, circleColor: Colors.dark60},
  error: {color: Colors.red30, circleColor: Colors.red30, icon: exclamationSmall, enabled: true},
  skipped: {color: Colors.red30, circleColor: Colors.red30, enabled: true},
  completed: {color: Colors.dark30, circleColor: Colors.dark60, icon: checkMarkSmall, enabled: true},
  active: {color: Colors.blue10, circleColor: Colors.blue10}
};
