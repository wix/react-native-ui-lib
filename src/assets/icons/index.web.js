const icons = {
  get check() {
    return {uri: require('./check.png'), dimensions: {width: 21, height: 15}};
  },
  get checkSmall() {
    return {uri: require('./check-small.png'), dimensions: {width: 24, height: 24}};
  },
  get minusSmall() {
    return {uri: require('./minusSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get plusSmall() {
    return {uri: require('./plusSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get search() {
    return {uri: require('./search.png'), dimensions: {width: 24, height: 24}};
  },
  get x() {
    return {uri: require('./x.png'), dimensions: {width: 17, height: 16}};
  },
  get xSmall() {
    return {uri: require('./xSmall.png'), dimensions: {width: 16, height: 16}};
  },
  get xMedium() {
    return {uri: require('./xMedium.png'), dimensions: {width: 24, height: 24}};
  },
  get xFlat() {
    return {uri: require('./xFlat.png'), dimensions: {width: 16, height: 16}};
  }
};

module.exports = icons;
