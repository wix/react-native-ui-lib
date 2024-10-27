import {ThemeManager} from 'react-native-ui-lib/core';

ThemeManager.setComponentForcedTheme('Icon', props => {
  const {source} = props;
  return source?.source ? source : undefined;
});
