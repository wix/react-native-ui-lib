import Constants from './Constants';

const WebConstants = {
  ...Constants,

  get screenHeight() {
    const containerElement = document.querySelector('[data-react-native-web-dimensions="true"]');

    if (containerElement) {
      return containerElement.clientHeight;
    }

    return 0;
  },

  get screenWidth() {
    const containerElement = document.querySelector('[data-react-native-web-dimensions="true"]');

    if (containerElement) {
      return containerElement.clientWidth;
    }

    return 0;
  }
};

export default WebConstants;
