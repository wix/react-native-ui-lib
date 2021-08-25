declare function warn(message: string): void;
declare function deprecationWarn({ component, oldProp, newProp }: {
    component: string;
    oldProp: string;
    newProp?: string;
}): void;
declare const _default: {
    warn: typeof warn;
    deprecationWarn: typeof deprecationWarn;
};
export default _default;
