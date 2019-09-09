module.exports = {
  get TextArea() {
    return require('./TextArea').default;
  },
  get TextField() {
    return require('./TextField').default;
  },
  get TextInput() {
    return require('./TextInput').default;
  },
  get MaskedInput() {
    return require('./MaskedInput').default;
  }
};
