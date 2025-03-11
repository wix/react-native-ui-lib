const outline = require('./outline').default;

const components = {
  get outline() {
    return outline;
  },
  get arrowDown() {
    return {uri: require('./arrowDown.png'), dimensions: {width: 16, height: 16}};
  },
  get checkMarkSmall() {
    return {uri: require('./checkMarkSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get dropdown() {
    return {uri: require('./dropdown.png'), dimensions: {width: 16, height: 16}};
  },
  get exclamationSmall() {
    return {uri: require('./exclamationSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get hintTipMiddle() {
    return {uri: require('./hintTipMiddle.png'), dimensions: {width: 20, height: 7}};
  },
  get hintTipSide() {
    return {uri: require('./hintTipSide.png'), dimensions: {width: 20, height: 24}};
  },
  get minusSmall() {
    return {uri: require('./minusSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get plusSmall() {
    return {uri: require('./plusSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get transparentSwatch() {
    return {uri: require('./TransparentSwatch.png'), dimensions: {width: 100, height: 100}};
  }
};

module.exports = components;
