export * from './Mobile';
import {constants} from './Mobile';

const WebDeviceFrameSelector = '[data-react-native-web-dimensions="true"]';
function queryWebFrameDevice() {
  return document?.querySelector(WebDeviceFrameSelector);
}

const overrideConstants = {
  ...constants,
  get screenWidth() {
    return queryWebFrameDevice()?.clientWidth;
  },
  get screenHeight() {
    return queryWebFrameDevice()?.clientHeight;
  }
};

export default overrideConstants;
