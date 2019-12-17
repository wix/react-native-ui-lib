import Colors from '../../style/colors';
const checkMarkSmall = require('./assets/checkMarkSmall.png');
const exclamationSmall = require('./assets/exclamationSmall.png');

export const States = {
  ENABLED: {color: Colors.dark30, circleColor: Colors.dark60},
  DISABLED: {color: Colors.dark50, circleColor: Colors.dark60, notClickable: true},
  ERROR: {color: Colors.red30, circleColor: Colors.red30, icon: exclamationSmall},
  SKIPPED: {color: Colors.red30, circleColor: Colors.red30},
  COMPLETED: {color: Colors.dark30, circleColor: Colors.dark60, icon: checkMarkSmall}
};
