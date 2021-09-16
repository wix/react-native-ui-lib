export declare type Schemes = {
    light: {
        [key: string]: string;
    };
    dark: {
        [key: string]: string;
    };
};
export declare type SchemeType = 'default' | 'light' | 'dark';
export declare type SchemeChangeListener = (schemeType?: 'light' | 'dark') => void;
declare class Scheme {
    currentScheme: SchemeType;
    schemes: Schemes;
    changeListeners: SchemeChangeListener[];
    constructor();
    private broadcastSchemeChange;
    /**
     * Get app's current color scheme
     */
    getSchemeType(): 'light' | 'dark';
    /**
     * Set color scheme for app
     * arguments:
     * scheme - color scheme e.g light/dark/default
     */
    setScheme(scheme: SchemeType): void;
    /**
     * Load set of schemes for light/dark mode
     * arguments:
     * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
     */
    loadSchemes(schemes: Schemes): void;
    /**
     * Retrieve scheme by current scheme type
     */
    getScheme(): {
        [key: string]: string;
    } | {
        [key: string]: string;
    };
    /**
     * Add a change scheme event listener
     */
    addChangeListener(listener: SchemeChangeListener): void;
    /**
     * Remove a change scheme event listener
     * arguments:
     * listener - listener reference to remove
     */
    removeChangeListener(listener: SchemeChangeListener): void;
}
declare const _default: Scheme;
export default _default;
