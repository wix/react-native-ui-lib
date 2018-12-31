import rnTextSize from 'react-native-text-size';
import {Constants, Typography} from 'react-native-ui-lib'; //eslint-disable-line

/**
 * @description: Tool for measuring texts
 * @extendsnotes: This tool require a native dependency for react-native-text-size. 
 */
class MeasureText {

  async measureWidth(text, typography = Typography.text70, containerWidth = Constants.screenWidth) {
    if (text) {
      const size = await rnTextSize.measure({
        text, // text to measure, can include symbols
        width: containerWidth, // max-width of the "virtual" container
        ...typography, // RN font specification
      });
      return size.width;
    }
  }
}

export default new MeasureText();

