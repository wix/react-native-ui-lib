import {UIManager} from 'react-native';

require('./demoApp');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // eslint-disable-line

module.exports = {
  name: 'unicorn demo app',
};
