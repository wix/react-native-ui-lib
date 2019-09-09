module.exports = {
  get Typography() {
    return require('./typography').default;
  },
  get BorderRadiuses() {
    return require('./borderRadiuses').default;
  },
  get Colors() {
    return require('./colors').default;
  },
  get Shadows() {
    return require('./shadows').default;
  },
  get Spacings() {
    return require('./spacings').default;
  },
  get ComponentsColors() {
    return require('./componentsColors').default;
  },
  get Components() {
    return require('./components').default;
  },
  get ThemeManager() {
    return require('./themeManager').default;
  },
  get AnimatableManager() {
    return require('./animatableManager').default;
  }
};
