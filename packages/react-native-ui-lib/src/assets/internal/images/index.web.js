export const images = {
  get gradient() {
    return {uri: require('./gradient.png'), width: 56, height: 2};
  },
  get gradientOverlay() {
    return {uri: require('./gradientOverlay.png'), width: 76, height: 48};
  },
  get gradientOverlayHigh() {
    return {uri: require('./gradientOverlayHigh.png'), width: 1, height: 297};
  },
  get gradientOverlayLow() {
    return {uri: require('./gradientOverlayLow.png'), width: 1, height: 297};
  },
  get gradientOverlayMedium() {
    return {uri: require('./gradientOverlayMedium.png'), width: 1, height: 297};
  },
  get hintTipMiddle() {
    return {uri: require('./hintTipMiddle.png'), width: 20, height: 7};
  },
  get hintTipSide() {
    return {uri: require('./hintTipSide.png'), width: 20, height: 24};
  },
  get transparentSwatch() {
    return {uri: require('./transparentSwatch.png'), width: 100, height: 100};
  }
};
