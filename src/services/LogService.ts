export function warn(message) {
  if (__DEV__) {
    console.warn(message);
  }
}

export function deprecationWarn({component, oldProp, newProp} = {}) {
  const message = `uilib's ${component} "${oldProp}" prop will be deprecated soon, please use the "${newProp}" prop instead`;
  warn(message);
}
