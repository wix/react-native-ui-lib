export declare enum HapticType {
    selection = "selection",
    impactLight = "impactLight",
    impactMedium = "impactMedium",
    impactHeavy = "impactHeavy",
    notificationSuccess = "notificationSuccess",
    notificationWarning = "notificationWarning",
    notificationError = "notificationError"
}
declare function triggerHaptic(hapticType: HapticType, componentName: string): void;
declare const _default: {
    HapticType: typeof HapticType;
    triggerHaptic: typeof triggerHaptic;
};
export default _default;
