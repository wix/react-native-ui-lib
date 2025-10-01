import _cloneDeep from "lodash/cloneDeep";
import _forEach from "lodash/forEach";
import _merge from "lodash/merge";
import _isEmpty from "lodash/isEmpty";
import _xor from "lodash/xor";
import _remove from "lodash/remove";
import { Appearance, PlatformColor } from 'react-native';
import Constants from "../commons/Constants";
import Config from "../commons/Config";
class Scheme {
  currentScheme = Config.appScheme;
  schemes = {
    light: {},
    dark: {}
  };
  changeListeners = [];
  constructor() {
    Appearance.addChangeListener(() => {
      if (this.currentScheme === 'default') {
        this.broadcastSchemeChange();
      }
    });
  }
  broadcastSchemeChange() {
    this.changeListeners.forEach(listener => listener(this.getSchemeType()));
  }

  /**
   * Get app's current color scheme
   */
  getSchemeType() {
    const scheme = this.currentScheme === 'default' ? Appearance.getColorScheme() : this.currentScheme;
    return scheme ?? 'light';
  }

  /** 
   * Whether the app's scheme is 'dark', i.e. is on dark mode
   */
  isDarkMode() {
    return this.getSchemeType() === 'dark';
  }

  /**
   * Set color scheme for app
   * arguments:
   * scheme - color scheme e.g light/dark/default
   */
  setScheme(scheme) {
    const prevSchemeType = this.getSchemeType();
    if (!['light', 'dark', 'default'].includes(scheme)) {
      throw new Error(`${scheme} is invalid colorScheme, please use 'light' | 'dark' | 'default'`);
    }
    this.currentScheme = scheme;
    if (prevSchemeType !== this.getSchemeType()) {
      this.broadcastSchemeChange();
    }
  }

  /**
   * Load set of schemes for light/dark mode
   * arguments:
   * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
   */
  loadSchemes(schemes) {
    const lightSchemeKeys = Object.keys(schemes.light);
    const darkSchemeKeys = Object.keys(schemes.dark);
    const missingKeys = _xor(lightSchemeKeys, darkSchemeKeys);
    if (!_isEmpty(missingKeys)) {
      throw new Error(`There is a mismatch in scheme keys: ${missingKeys.join(', ')}`);
    }
    const platformColorsSchemes = _cloneDeep(schemes);
    _forEach(schemes, (scheme, schemeKey) => {
      _forEach(scheme, (colorValue, colorKey) => {
        // @ts-expect-error
        Object.defineProperty(platformColorsSchemes[schemeKey], colorKey, {
          get: () => {
            let color = colorValue;
            if (Config.usePlatformColors) {
              if (Constants.isAndroid) {
                // Remove the $ prefix cause it's not allowed in Android and add the @color prefix
                color = PlatformColor(`@color/${colorKey.replace(/^[$]/, '')}`);
              } else {
                color = PlatformColor(colorKey);
              }
              // Get the original hex string value by calling toString()
              color.toString = () => schemes[this.getSchemeType()][colorKey];
            }
            return color;
          }
        });
      });
    });
    _merge(this.schemes, platformColorsSchemes);
  }

  /**
   * Retrieve scheme by current scheme type
   */
  getScheme(schemeType = this.getSchemeType()) {
    return this.schemes[schemeType];
  }

  /**
   * Add a change scheme event listener
   */
  addChangeListener(listener) {
    this.changeListeners.push(listener);
  }

  /**
   * Remove a change scheme event listener
   * arguments:
   * listener - listener reference to remove
   */
  removeChangeListener(listener) {
    _remove(this.changeListeners, changeListener => changeListener === listener);
  }
}
export default new Scheme();