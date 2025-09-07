import _join from "lodash/join";
import _flatten from "lodash/flatten";
import _map from "lodash/map";
import _keys from "lodash/keys";
import _flow from "lodash/flow";
import _forEach from "lodash/forEach";
import Constants from "../commons/Constants";
import TypographyPresets from "./typographyPresets";
export class Typography {
  keysPattern = this.generateKeysPattern();

  /**
   * Load custom set of typographies
   * arguments:
   * typographies - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadTypographies(typographies) {
    _forEach(typographies, (value, key) => {
      //@ts-ignore
      this[key] = value;
    });
    this.keysPattern = this.generateKeysPattern();
  }
  getKeysPattern() {
    return this.keysPattern;
  }
  generateKeysPattern() {
    return new RegExp(_flow(_keys, keys => _map(keys, key => [`${key}`]), _flatten, keys => _join(keys, '|'))(this));
  }

  // TODO: deprecate
  async measureWidth(text, typography = TypographyPresets.text70, containerWidth = Constants.screenWidth) {
    const size = await this.measureTextSize(text, typography, containerWidth);
    if (size) {
      return size.width;
    }
  }
  async measureTextSize(text, typography = TypographyPresets.text70, containerWidth = Constants.screenWidth) {
    const rnTextSize = require('wix-react-native-text-size').default;
    if (text) {
      const size = await rnTextSize.measure({
        text,
        // text to measure, can include symbols
        width: containerWidth,
        // max-width of the "virtual" container
        ...typography // RN font specification
      });
      return size;
    }
  }
}
const TypedTypography = Typography;
const typography = new TypedTypography();
typography.loadTypographies(TypographyPresets);
export default typography;