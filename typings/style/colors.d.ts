declare class Colors {
    /**
     * Load custom set of colors
     * arguments:
     * colors - map of keys and colors values e.g {dark10: '#20303C', dark20: '#43515C'}
     */
    loadColors(colors: any): void;
    /**
     * Add alpha to hex or rgb color
     * arguments:
     * p1 - hex color / R part of RGB
     * p2 - opacity / G part of RGB
     * p3 - B part of RGB
     * p4 - opacity
     */
    rgba(p1: any, p2: any, p3: any, p4: any): string;
    getBackgroundKeysPattern(): RegExp;
}
declare const colorObject: Colors;
export default colorObject;
