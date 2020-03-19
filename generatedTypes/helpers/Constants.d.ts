declare const constants: {
    orientations: {
        PORTRAIT: string;
        LANDSCAPE: string;
    };
    isAndroid: boolean;
    isIOS: boolean;
    readonly getAndroidVersion: number | undefined;
    readonly statusBarHeight: number;
    isRTL: boolean;
    readonly orientation: string;
    readonly isLandscape: boolean;
    readonly screenWidth: number;
    readonly screenHeight: number;
    readonly windowWidth: number;
    readonly windowHeight: number;
    readonly isSmallScreen: boolean;
    readonly isShortScreen: boolean;
    readonly screenAspectRatio: number;
    readonly isTablet: any;
    readonly getSafeAreaInsets: {
        left: number;
        right: number;
        bottom: number;
        top: number;
    };
    readonly isIphoneX: boolean;
    addDimensionsEventListener: (callback: any) => void;
    removeDimensionsEventListener: (callback: any) => void;
    readonly accessibility: {
        isScreenReaderEnabled: boolean;
    };
};
export default constants;
