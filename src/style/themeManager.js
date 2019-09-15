import _ from 'lodash';
import Colors from './colors';

class ThemeManager {
  theme = {
    primaryColor: Colors.blue30,
    CTA: {
      textColor: Colors.white,
      disabledColor: Colors.dark60,
      backgroundColor: Colors.blue30
    },
    titleColor: Colors.dark10,
    subtitleColor: Colors.dark40,
    dividerColor: Colors.dark70,
    components: {
      TouchableOpacity: {
        throttleTime: 0,
        throttleOptions: {leading: true, trailing: false}
      }
    }
  };

  setTheme(overrides) {
    this.theme = _.merge(this.theme, overrides);
  }

  getTheme() {
    return this.theme;
  }

  setItem(key, value) {
    if (key === 'components') {
      throw new Error('Overriding the "components" key is not possible.');
    }
    // this.theme[key] = value;
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

  get components() {
    return this.theme.components;
  }

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
