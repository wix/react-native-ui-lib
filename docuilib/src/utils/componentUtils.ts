import ReactLiveScope from '../theme/ReactLiveScope';

const supportedComponentNames = Object.keys(ReactLiveScope);

export const isComponentSupported = componentName => {
  return supportedComponentNames.includes(componentName);
};
