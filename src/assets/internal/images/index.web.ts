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
  },
  get hintTipMiddle() {
    return {uri: require('./hintTipMiddle.png'), dimensions: {width: 24, height: 24}};
  },
  get hintTipSide() {
    return {uri: require('./hintTipSide.png'), dimensions: {width: 24, height: 24}};
  },
  get transparentSwatch() {
    return {uri: require('./transparentSwatch.png'), dimensions: {width: 20, height: 20}};
  }
};
