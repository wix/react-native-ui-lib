export const images = {
  get gradient() {
    return {uri: require('./gradient.png'), dimensions: {width: 56, height: 2}};
  },
  get gradientOverlay() {
    return {uri: require('./gradientOverlay.png'), dimensions: {width: 76, height: 48}};
  },
  get gradientOverlayHigh() {
    return {uri: require('./gradientOverlayHigh.png'), dimensions: {width: 1, height: 297}};
  },
  get gradientOverlayLow() {
    return {uri: require('./gradientOverlayLow.png'), dimensions: {width: 1, height: 297}};
  },
  get gradientOverlayMedium() {
    return {uri: require('./gradientOverlayMedium.png'), dimensions: {width: 1, height: 297}};
  }
};
