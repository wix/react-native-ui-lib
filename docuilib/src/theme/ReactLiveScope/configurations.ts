import {ThemeManager} from 'react-native-ui-lib/core';

ThemeManager.setComponentForcedTheme('Icon', props => {
  const {source} = props;
  return source?.default ? {source: source.default} : source?.source ? source : undefined;
});

ThemeManager.setComponentForcedTheme('Image', props => {
  const {source} = props;
  return source?.default ? {source: source.default} : source;
});
