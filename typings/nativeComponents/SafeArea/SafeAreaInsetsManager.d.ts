declare class SafeAreaInsetsManager {
    constructor();
    addSafeAreaChangedListener(): void;
    _updateInsets(): Promise<void>;
    getSafeAreaInsets(): Promise<any>;
    addSafeAreaChangedDelegate(delegate: any): void;
    removeSafeAreaChangedDelegate(delegateToRemove: any): void;
    readonly defaultInsets: any;
}
declare const _default: SafeAreaInsetsManager;
export default _default;
