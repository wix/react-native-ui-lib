declare class Typography {
    text10: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text20: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text30: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text40: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text50: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text60: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text70: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text80: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text90: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    text100: {
        fontSize: number;
        fontWeight: string;
        lineHeight: number;
        fontFamily: string;
    };
    /**
     * Load custom set of typographies
     * arguments:
     * typographies - map of keys and typography values
     * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
     */
    loadTypographies(typographies: any): void;
    getKeysPattern(): RegExp;
}
declare const _default: Typography;
export default _default;
