import {UIManager, I18nManager} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // eslint-disable-line
I18nManager.allowRTL(true);

module.exports = {
  name: 'unicorn demo app',
};
