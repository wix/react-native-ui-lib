export declare const WEIGHT_TYPES: {
    THIN: string;
    LIGHT: string;
    REGULAR: string;
    MEDIUM: string;
    BOLD: string;
    HEAVY: string;
    BLACK: string;
};
export declare class Typography {
    keysPattern: RegExp;
    /**
     * Load custom set of typographies
     * arguments:
     * typographies - map of keys and typography values
     * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
     */
    loadTypographies(typographies: Dictionary<any>): void;
    getKeysPattern(): RegExp;
    generateKeysPattern(): RegExp;
    measureWidth(text: string, typography?: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    }, containerWidth?: number): Promise<any>;
    measureTextSize(text: string, typography?: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    }, containerWidth?: number): Promise<any>;
}
declare const typography: Typography & {
    text10: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text10T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text10L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text10R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text10M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text10BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text10H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text10BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text20T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text20B: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text30T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text30BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text40T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text40BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text50T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text50BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text60T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text60B: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text65T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text65BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text70T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text70BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text80T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text80BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text90T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text90BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100: {
        fontSize: number;
        fontWeight: string | undefined;
        lineHeight: number;
        fontFamily: string;
    };
    text100T: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100L: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100R: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100M: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100BO: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100H: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
    text100BL: {
        fontWeight: string | undefined;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
    };
};
export default typography;
