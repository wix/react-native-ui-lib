module.exports = {
  // TODO: move to components, remove this
  get TabController() {
    return require('./TabController').default;
  },
  get TouchableOpacity() {
    return require('./TouchableOpacity').default;
  }
};
