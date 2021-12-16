function warn(message: string) {
  if (__DEV__) {
    console.warn(message);
  }
}

function deprecationWarn({component, oldProp, newProp}: {component: string; oldProp: string; newProp?: string}) {
  const message = newProp
    ? `RNUILib's ${component} "${oldProp}" prop will be deprecated soon, please use the "${newProp}" prop instead`
    : `RNUILib's ${component} "${oldProp}" prop will be deprecated soon, please stop using it`;
  warn(message);
}

function componentDeprecationWarn({oldComponent, newComponent}: {oldComponent: string; newComponent: string}) {
  const message = `RNUILib's ${oldComponent} component will be deprecated soon, please use the "${newComponent}" component instead`;

  warn(message);
}

export default {
  warn,
  deprecationWarn,
  componentDeprecationWarn
};
