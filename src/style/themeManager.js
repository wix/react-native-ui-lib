import _ from 'lodash';
import Colors from './colors';

class ThemeManager {

  theme = {
    CTA: {
      textColor: Colors.white,
      backgroundColor: Colors.blue30,
    },
    primaryColor: Colors.blue30,
    titleColor: Colors.dark10,
    subtitleColor: Colors.dark50,
  }

  setTheme(overrides) {
    this.theme = _.merge(this.theme, overrides);
  }

  get CTATextColor() {
    return this.theme.CTA.textColor;
  }

  get CTABackgroundColor() {
    return this.theme.CTA.backgroundColor;
  }
}

export default new ThemeManager();
