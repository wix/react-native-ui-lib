export * from './Constants';
import * as MobileConstants from './Constants';

const WebDeviceFrameSelector = '[data-react-native-web-dimensions="true"]';
function queryWebFrameDevice() {
  return document?.querySelector(WebDeviceFrameSelector);
}

const constants = {
  ...MobileConstants,
  get screenWidth() {
    return queryWebFrameDevice()?.clientWidth;
  },
  get screenHeight() {
    return queryWebFrameDevice()?.clientHeight;
  }
};

export default constants;
