module.exports = {
  get StateScreen() {
    return require('./stateScreen').default;
  },
  get Modal() {
    return require('./modal').default;
  },
  get LoaderScreen() {
    return require('./loaderScreen').default;
  }
};
