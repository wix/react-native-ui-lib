declare function warn(message: string): void;
declare function deprecationWarn({ component, oldProp, newProp }: {
    component: string;
    oldProp: string;
    newProp?: string;
}): void;
declare function componentDeprecationWarn({ oldComponent, newComponent }: {
    oldComponent: string;
    newComponent: string;
}): void;
declare const _default: {
    warn: typeof warn;
    deprecationWarn: typeof deprecationWarn;
    componentDeprecationWarn: typeof componentDeprecationWarn;
};
export default _default;
