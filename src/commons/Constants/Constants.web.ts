export * from './BaseConstants';
import {Constants as BaseConstants} from './BaseConstants';

const WebDeviceFrameSelector = '[data-react-native-web-dimensions="true"]';

function queryWebFrameDevice() {
  return document?.querySelector(WebDeviceFrameSelector);
}

export const Constants = {
  ...BaseConstants,
  get screenWidth() {
    return queryWebFrameDevice()?.clientWidth;
  },
  get screenHeight() {
    return queryWebFrameDevice()?.clientHeight;
  },
  get windowWidth() {
    return queryWebFrameDevice()?.clientWidth;
  },
  get windowHeight() {
    return queryWebFrameDevice()?.clientHeight;
  }
};
