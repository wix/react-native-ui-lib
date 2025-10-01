interface BILogger {
    log: (event: any) => void;
}
declare class LogService<ErrorInfo extends {
    message: string;
}> {
    private biLogger;
    injectBILogger: (biLogger: BILogger) => void;
    logBI: (event: any) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    forwardError: (errorInfo: ErrorInfo) => void;
    deprecationWarn: ({ component, oldProp, newProp }: {
        component: string;
        oldProp: string;
        newProp?: string;
    }) => void;
    componentDeprecationWarn: ({ oldComponent, newComponent }: {
        oldComponent: string;
        newComponent: string;
    }) => void;
    deprecationError: ({ component, oldProp, newProp }: {
        component: string;
        oldProp: string;
        newProp?: string;
    }) => void;
    componentDeprecationError: ({ oldComponent, newComponent }: {
        oldComponent: string;
        newComponent: string;
    }) => void;
}
declare const _default: LogService<{
    message: string;
}>;
export default _default;
