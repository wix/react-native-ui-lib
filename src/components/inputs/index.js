module.exports = {
  get BaseInput() {
    return require('../baseInput/BaseInput').default;
  },
  get TextArea() {
    return require('../textArea/TextArea').default;
  },
  get TextField() {
    return require('../textField/TextField').default;
  },
  get MaskedInput() {
    return require('../maskedInput/MaskedInput').default;
  }
};
