module.exports = {
  get BaseInput() {
    return require('../baseInput').default;
  },
  get TextArea() {
    return require('../textArea').default;
  },
  get TextField() {
    return require('../textField').default;
  },
  get MaskedInput() {
    return require('../maskedInput').default;
  }
};
