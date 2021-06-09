import _ from 'lodash';
import Colors from "./colors";
export class ThemeManager {
  theme = {
    primaryColor: Colors.primary,
    CTA: {
      textColor: Colors.white,
      disabledColor: Colors.dark60,
      backgroundColor: Colors.primary
    },
    titleColor: Colors.dark10,
    subtitleColor: Colors.dark40,
    dividerColor: Colors.dark70,
    components: {} // leave this key and delete the rest on V6

  };
  forcedTheme = {
    components: {}
  }; //TODO: deprecate on V6

  setTheme(overrides) {
    console.warn('ThemeManager.setTheme() is deprecated. Please remove usage before next uilib major version update. Consider using ThemeManager.setComponentTheme instead');
    this.theme = _.merge(this.theme, overrides);
  }

  getTheme() {
    return this.theme;
  }

  setItem(key, value) {
    if (key === 'components') {
      throw new Error('Overriding the "components" key is not possible.');
    } // this.theme[key] = value;


    _.set(this.theme, key, value);
  }

  getItem(key) {
    // return this.theme[key];
    return _.get(this.theme, key);
  }

  setComponentTheme(componentName, overrides) {
    if (_.isFunction(overrides)) {
      this.theme.components[componentName] = overrides;
    } else {
      this.theme.components[componentName] = _.cloneDeep(overrides);
    }
  }

  setComponentForcedTheme(componentName, overrides) {
    if (_.isFunction(overrides)) {
      this.forcedTheme.components[componentName] = overrides;
    } else {
      this.forcedTheme.components[componentName] = _.cloneDeep(overrides);
    }
  }

  get components() {
    return this.theme.components;
  }

  get forcedThemeComponents() {
    return this.forcedTheme.components;
  } // TODO: remove getters below


  get primaryColor() {
    return this.theme.primaryColor;
  }

  get CTATextColor() {
    return this.theme.CTA.textColor;
  }

  get CTADisabledColor() {
    return this.theme.CTA.disabledColor;
  }

  get CTABackgroundColor() {
    return this.theme.CTA.backgroundColor;
  }

  get titleColor() {
    return this.theme.titleColor;
  }

  get subtitleColor() {
    return this.theme.subtitleColor;
  }

  get dividerColor() {
    return this.theme.dividerColor;
  }

}
export default new ThemeManager();