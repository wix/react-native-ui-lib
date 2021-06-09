function warn(message) {
  if (__DEV__) {
    console.warn(message);
  }
}

function deprecationWarn({
  component,
  oldProp,
  newProp
}) {
  const message = newProp ? `uilib's ${component} "${oldProp}" prop will be deprecated soon, please use the "${newProp}" prop instead` : `uilib's ${component} "${oldProp}" prop will be deprecated soon, please stop using it`;
  warn(message);
}

export default {
  warn,
  deprecationWarn
};