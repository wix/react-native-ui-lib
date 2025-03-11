import type {default as outline} from './outline';

export const components = {
  get outline(): typeof outline {
    return require('./outline').default;
  },
  get arrowDown() {
    return require('./arrowDown.png');
  },
  get checkMarkSmall() {
    return require('./checkMarkSmall.png');
  },
  get dropdown() {
    return require('./dropdown.png');
  },
  get exclamationSmall() {
    return require('./exclamationSmall.png');
  },
  get hintTipMiddle() {
    return require('./hintTipMiddle.png');
  },
  get hintTipSide() {
    return require('./hintTipSide.png');
  },
  get minusSmall() {
    return require('./minusSmall.png');
  },
  get plusSmall() {
    return require('./plusSmall.png');
  },
  get transparentSwatch() {
    return require('./TransparentSwatch.png');
  }
};
