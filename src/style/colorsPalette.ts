const colorsPalette = {
  // GREYS
  grey10: '#20303C',
  grey20: '#4D5963',
  grey30: '#6E7881',
  grey40: '#A6ACB1',
  grey50: '#D2D6D8',
  grey60: '#E8ECF0',
  grey70: '#F0F4F7',
  grey80: '#F8f9FA',
  // PURPLES
  purple10: '#791C96',
  purple20: '#8D21B0',
  purple30: '#9F42BD',
  purple40: '#B268CA',
  purple50: '#DAA0E8',
  purple60: '#E9CCF2',
  purple70: '#F1DAF7',
  purple80: '#FAEBFD',
  // VIOLETS
  violet10: '#3220CD',
  violet20: '#4633E9',
  violet30: '#5A48F5',
  violet40: '#8579FF',
  violet50: '#B2ABFF',
  violet60: '#D1CCFF',
  violet70: '#E3E0FF',
  violet80: '#F0EEFF',
  // BLUES
  blue10: '#0F4DC4',
  blue20: '#0F59E6',
  blue30: '#116DFF',
  blue40: '#3582FF',
  blue50: '#60A1FF',
  blue60: '#8BC1FF',
  blue70: '#B8D9FF',
  blue80: '#E5F1FF',
  // GREENS
  green10: '#008563',
  green20: '#009872',
  green30: '#00A87E',
  green40: '#45C3A4',
  green50: '#85DEC8',
  green60: '#B3EBDD',
  green70: '#CFF2E9',
  green80: '#E3F7F2',
  // REDS
  red10: '#D52712',
  red20: '#E93222',
  red30: '#FC3D2F',
  red40: '#FD7267',
  red50: '#FEA6A0',
  red60: '#FFC9C5',
  red70: '#FFDEDC',
  red80: '#FFEDEC',
  // ORANGES
  orange10: '#CD4700',
  orange20: '#E95504',
  orange30: '#FB6413',
  orange40: '#FC8E53',
  orange50: '#FDB893',
  orange60: '#FED4BD',
  orange70: '#FFE5D7',
  orange80: '#FFF1EA',
  // YELLOWS
  yellow10: '#E89900',
  yellow20: '#F7AE00',
  yellow30: '#FFC50D',
  yellow40: '#FFD54E',
  yellow50: '#FFE48D',
  yellow60: '#FFEEB9',
  yellow70: '#FFF4D3',
  yellow80: '#FFF9E4',
  // OTHERS
  white: '#FFFFFF',
  black: '#000000'
};

// For Eslint --fix
const extraFixColorsMap = {
  black: 'black',
  white: 'white',
  '#000': 'black',
  '#fff': 'white'
};

const themeColors = {
  primary: colorsPalette.violet30
};

export {
  colorsPalette,
  themeColors,
  extraFixColorsMap
};
