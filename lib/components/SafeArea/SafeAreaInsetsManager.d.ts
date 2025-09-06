type SafeAreaInsetsType = {
    top: number;
    left: number;
    bottom: number;
    right: number;
} | null;
declare class SafeAreaInsetsManager {
    _defaultInsets: SafeAreaInsetsType;
    _safeAreaInsets: SafeAreaInsetsType;
    _safeAreaChangedDelegates: Array<any>;
    constructor();
    addSafeAreaChangedListener(): void;
    _updateInsets(): Promise<void>;
    getSafeAreaInsets(): Promise<SafeAreaInsetsType>;
    addSafeAreaChangedDelegate(delegate: any): void;
    removeSafeAreaChangedDelegate(delegateToRemove: any): void;
    get defaultInsets(): SafeAreaInsetsType;
}
declare const _default: SafeAreaInsetsManager;
export default _default;
