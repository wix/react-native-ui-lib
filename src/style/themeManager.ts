import _ from 'lodash';
import type {Context} from 'react';
import type {Dictionary, Extendable} from '../typings/common';

interface Theme {
  components: Extendable;
}

export class ThemeManager {
  private themeContext?: Context<any>;

  theme: Theme = {
    components: {} as Extendable
  };

  forcedTheme = {
    components: {} as Extendable
  };

  setThemeContext(context: Context<any>) {
    this.themeContext = context;
  }

  getThemeContext() {
    return this.themeContext;
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
}

export default new ThemeManager();
