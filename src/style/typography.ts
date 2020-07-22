import {TextStyle} from 'react-native';
import _ from 'lodash';
import Constants from '../helpers/Constants';

import TypographyPresets from './typographyPresets';

type MeasureTextTypography = TextStyle & {allowFontScaling?: boolean};

export class Typography {
  keysPattern = this.generateKeysPattern();

  /**
   * Load custom set of typographies
   * arguments:
   * typographies - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadTypographies(typographies: Dictionary<any>) {
    _.forEach(typographies, (value, key) => {
      //@ts-ignore
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
  async measureWidth(text: string, typography = TypographyPresets.text70, containerWidth = Constants.screenWidth) {
    const size = await this.measureTextSize(text, typography, containerWidth);
    if (size) {
      return size.width;
    }
  }

  async measureTextSize(text: string, typography: MeasureTextTypography = TypographyPresets.text70!, containerWidth = Constants.screenWidth) {
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
type CustomTypographyPresets = {[custom: string]: TextStyle};
const TypedTypography = Typography as ExtendTypeWith<ExtendTypeWith<typeof Typography, typeof TypographyPresets>, CustomTypographyPresets>;
const typography = new TypedTypography();
typography.loadTypographies(TypographyPresets);

export default typography;
