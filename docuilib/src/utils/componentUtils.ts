import get from 'lodash/get';
import ReactLiveScope from '../theme/ReactLiveScope';

export const isComponentSupported = componentName => {
  return !!get(ReactLiveScope, componentName);
};
