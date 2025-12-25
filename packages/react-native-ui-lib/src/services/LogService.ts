interface BILogger {
  log: (event: any) => void;
}
class LogService<ErrorInfo extends {message: string;}> {
  private biLogger: BILogger | undefined;

  injectBILogger = (biLogger: BILogger) => {
    this.biLogger = biLogger;
  };

  logBI = (event: any) => {
    this.biLogger?.log(event);
  };

  warn = (message?: any, ...optionalParams: any[]) => {
    if (__DEV__) {
      console.warn(message, ...optionalParams);
    }
  };

  error = (message?: any, ...optionalParams: any[]) => {
    if (__DEV__) {
      // eslint-disable-next-line no-restricted-syntax
      console.error(message, ...optionalParams);
    }
  };

  forwardError = (errorInfo: ErrorInfo) => {
    // eslint-disable-next-line no-restricted-syntax
    console.error(errorInfo.message);
  };

  deprecationWarn = ({component, oldProp, newProp}: {component: string; oldProp: string; newProp?: string}) => {
    this.warn(getDeprecationMessage({component, oldProp, newProp}));
  };

  componentDeprecationWarn = ({oldComponent, newComponent}: {oldComponent: string; newComponent: string}) => {
    this.warn(getComponentDeprecationMessage({oldComponent, newComponent}));
  };

  deprecationError = ({component, oldProp, newProp}: {component: string; oldProp: string; newProp?: string}) => {
    this.error(getDeprecationMessage({component, oldProp, newProp}));
  };

  componentDeprecationError = ({oldComponent, newComponent}: {oldComponent: string; newComponent: string}) => {
    this.error(getComponentDeprecationMessage({oldComponent, newComponent}));
  };
}

function getDeprecationMessage({component, oldProp, newProp}: {component: string; oldProp: string; newProp?: string}) {
  const message = newProp
    ? `RNUILib's ${component} "${oldProp}" prop will be deprecated soon, please use the "${newProp}" prop instead`
    : `RNUILib's ${component} "${oldProp}" prop will be deprecated soon, please stop using it`;
  return message;
}

function getComponentDeprecationMessage({oldComponent, newComponent}: {oldComponent: string; newComponent: string}) {
  const message = `RNUILib's ${oldComponent} component will be deprecated soon, please use the "${newComponent}" component instead`;

  return message;
}

export default new LogService();
