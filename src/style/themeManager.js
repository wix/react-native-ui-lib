import _cloneDeep from "lodash/cloneDeep";
import _isFunction from "lodash/isFunction";
import _get from "lodash/get";
import _set from "lodash/set";
export class ThemeManager {
  theme = {
    components: {}
  };
  forcedTheme = {
    components: {}
  };
  setThemeContext(context) {
    this.themeContext = context;
  }
  getThemeContext() {
    return this.themeContext;
  }
  setItem(key, value) {
    if (key === 'components') {
      throw new Error('Overriding the "components" key is not possible.');
    }
    // this.theme[key] = value;
    _set(this.theme, key, value);
  }
  getItem(key) {
    // return this.theme[key];
    return _get(this.theme, key);
  }
  setComponentTheme(componentName, overrides) {
    if (_isFunction(overrides)) {
      this.theme.components[componentName] = overrides;
    } else {
      this.theme.components[componentName] = _cloneDeep(overrides);
    }
  }
  setComponentForcedTheme(componentName, overrides) {
    if (_isFunction(overrides)) {
      this.forcedTheme.components[componentName] = overrides;
    } else {
      this.forcedTheme.components[componentName] = _cloneDeep(overrides);
    }
  }
  get components() {
    return this.theme.components;
  }
  get forcedThemeComponents() {
    return this.forcedTheme.components;
  }
}
export default new ThemeManager();