import ReactLiveScope from '../theme/ReactLiveScope';

const supportedComponentNames = Object.keys(ReactLiveScope);

export const isComponentSupported = componentName => {
  const _componentName = componentName.includes('.') ? componentName.split('.')[0] : componentName;
  return supportedComponentNames.includes(_componentName);
};
