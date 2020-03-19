export declare const SpacingLiterals: {
    s1: number;
    s2: number;
    s3: number;
    s4: number;
    s5: number;
    s6: number;
    s7: number;
    s8: number;
    s9: number;
    s10: number;
};
export declare class Spacings {
    keysPattern: RegExp;
    loadSpacings(spacings: Dictionary<number>): void;
    getKeysPattern(): RegExp;
    generateKeysPattern(): RegExp;
}
declare const spacingInstance: Spacings & {
    s1: number;
    s2: number;
    s3: number;
    s4: number;
    s5: number;
    s6: number;
    s7: number;
    s8: number;
    s9: number;
    s10: number;
};
export default spacingInstance;
