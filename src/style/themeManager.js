import _ from 'lodash';
import Colors from './colors';

class ThemeManager {

  theme = {
    primaryColor: Colors.blue30,
    CTA: {
      textColor: Colors.white,
      backgroundColor: Colors.blue30,
    },
    titleColor: Colors.dark10,
    subtitleColor: Colors.dark50,
  };

  setTheme(overrides) {
    this.theme = _.merge(this.theme, overrides);
  }

  get primaryColor() {
    return this.theme.primaryColor;
  }

  get CTATextColor() {
    return this.theme.CTA.textColor;
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

}

export default new ThemeManager();
