class LogService {
  injectBILogger = biLogger => {
    this.biLogger = biLogger;
  };
  logBI = event => {
    this.biLogger?.log(event);
  };
  warn = (message, ...optionalParams) => {
    if (__DEV__) {
      console.warn(message, ...optionalParams);
    }
  };
  error = (message, ...optionalParams) => {
    if (__DEV__) {
      // eslint-disable-next-line no-restricted-syntax
      console.error(message, ...optionalParams);
    }
  };
  forwardError = errorInfo => {
    // eslint-disable-next-line no-restricted-syntax
    console.error(errorInfo.message);
  };
  deprecationWarn = ({
    component,
    oldProp,
    newProp
  }) => {
    this.warn(getDeprecationMessage({
      component,
      oldProp,
      newProp
    }));
  };
  componentDeprecationWarn = ({
    oldComponent,
    newComponent
  }) => {
    this.warn(getComponentDeprecationMessage({
      oldComponent,
      newComponent
    }));
  };
  deprecationError = ({
    component,
    oldProp,
    newProp
  }) => {
    this.error(getDeprecationMessage({
      component,
      oldProp,
      newProp
    }));
  };
  componentDeprecationError = ({
    oldComponent,
    newComponent
  }) => {
    this.error(getComponentDeprecationMessage({
      oldComponent,
      newComponent
    }));
  };
}
function getDeprecationMessage({
  component,
  oldProp,
  newProp
}) {
  const message = newProp ? `RNUILib's ${component} "${oldProp}" prop will be deprecated soon, please use the "${newProp}" prop instead` : `RNUILib's ${component} "${oldProp}" prop will be deprecated soon, please stop using it`;
  return message;
}
function getComponentDeprecationMessage({
  oldComponent,
  newComponent
}) {
  const message = `RNUILib's ${oldComponent} component will be deprecated soon, please use the "${newComponent}" component instead`;
  return message;
}
export default new LogService();