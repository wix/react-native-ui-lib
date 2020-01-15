import _ from 'lodash';
import {Platform, PixelRatio} from 'react-native';
import {Constants} from '../helpers';

import TypographyPresets from './typographyPresets';

export const WEIGHT_TYPES = {
  THIN: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: parseFloat(Platform.Version) >= 11.2 ? '600' : '500',
  BOLD: '700',
  HEAVY: '800',
  BLACK: '900'
};

class Typography {
  keysPattern = this.generateKeysPattern();

  /**
   * Load custom set of typographies
   * arguments:
   * typographies - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadTypographies(typographies) {
    _.forEach(typographies, (value, key) => {
      this[key] = value;
    });
    this.keysPattern = this.generateKeysPattern();
  }

  getKeysPattern() {
    return this.keysPattern;
  }

  generateKeysPattern() {
    return new RegExp(_.chain(this)
        .keys()
        .map(key => [`${key}`])
        .flatten()
        .join('|')
        .value());
  }

  // TODO: deprecate
  async measureWidth(text, typography = Typography.text70, containerWidth = Constants.screenWidth) {
    const size = await this.measureTextSize(text, typography, containerWidth);
    if (size) {
      return size.width;
    }
  }

  async measureTextSize(text, typography = Typography.text70, containerWidth = Constants.screenWidth) {
    const rnTextSize = require('react-native-text-size').default;
    if (text) {
      const size = await rnTextSize.measure({
        text, // text to measure, can include symbols
        width: containerWidth, // max-width of the "virtual" container
        ...typography, // RN font specification
      });
      return size;
    }
  }
}

const typography = new Typography();
typography.loadTypographies(TypographyPresets);

export default typography;
