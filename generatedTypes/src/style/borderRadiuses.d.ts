interface IBorderRadiusesLiterals {
    [key: `br${number}`]: number;
}
export declare const BorderRadiusesLiterals: IBorderRadiusesLiterals;
export declare class BorderRadiuses {
    loadBorders(borders: IBorderRadiusesLiterals): void;
    getKeysPattern(): RegExp;
}
declare const borderRadiusesInstance: BorderRadiuses & IBorderRadiusesLiterals;
export default borderRadiusesInstance;
