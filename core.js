/* Minimal core package of rnuilib */
module.exports = {
  ...require('./src/style'),
  get Button() {
    return require('./src/components/button').default;
  },
  get Image() {
    return require('./src/components/image').default;
  },
  get Text() {
    return require('./src/components/text').default;
  },
  get TouchableOpacity() {
    return require('./src/components/touchableOpacity').default;
  },
  get View() {
    return require('./src/components/view').default;
  }
};
