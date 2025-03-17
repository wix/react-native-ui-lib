export const images = {
  get gradient() {
    return {uri: require('./gradient.png'), dimensions: {width: 1, height: 24}};
  },
  get gradientOverlay() {
    return {uri: require('./gradientOverlay.png'), dimensions: {width: 1, height: 50}};
  },
  get gradientOverlayHigh() {
    return {uri: require('./gradientOverlayHigh.png'), dimensions: {width: 1, height: 100}};
  },
  get gradientOverlayLow() {
    return {uri: require('./gradientOverlayLow.png'), dimensions: {width: 1, height: 25}};
  },
  get gradientOverlayMedium() {
    return {uri: require('./gradientOverlayMedium.png'), dimensions: {width: 1, height: 75}};
  }
};
