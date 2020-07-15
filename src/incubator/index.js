module.exports = {
  // TODO: move to components, remove this
  get TabController() {
    return require('./TabController').default;
  },
  get TextField() {
    return require('./TextField').default;
  },
  get TouchableOpacity() {
    return require('./TouchableOpacity').default;
  }
};
