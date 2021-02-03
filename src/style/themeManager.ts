import _ from 'lodash';
import Colors from './colors';


export class ThemeManager {

  theme = {
    primaryColor: Colors.primary,
    CTA: {
      textColor: Colors.white,
      disabledColor: Colors.grey60,
      backgroundColor: Colors.primary
    },
    titleColor: Colors.grey10,
    subtitleColor: Colors.grey40,
    dividerColor: Colors.grey70,
    components: {} as Extendable // leave this key and delete the rest on V6
  };

  forcedTheme = {
    components: {} as Extendable
  }

  getTheme() {
    return this.theme;
  }

  setItem(key: string, value: any) {
    if (key === 'components') {
      throw new Error('Overriding the "components" key is not possible.');
    }
    // this.theme[key] = value;
    _.set(this.theme, key, value);
  }

  getItem(key: string) {
    // return this.theme[key];
    return _.get(this.theme, key);
  }

  setComponentTheme(componentName: string, overrides: Dictionary<any> | Function) {
    if (_.isFunction(overrides)) {
      this.theme.components[componentName] = overrides;
    } else {
      this.theme.components[componentName] = _.cloneDeep(overrides);
    }
  }

  setComponentForcedTheme(componentName: string, overrides: Dictionary<any> | Function) {
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
  }

  // TODO: remove getters below
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
