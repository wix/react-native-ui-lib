import {StyleSheet} from 'react-native';
import {getTextPartsToStyle, getArrayPartsToStyle, getPartsToStyle, unifyTextPartsStyles} from '../TextUtils';

describe('Text', () => {
  describe('getTextPartsToStyle', () => {
    it('should return the whole string as a single part when style string is undefined', () => {
      const result = getTextPartsToStyle('Playground Screen', undefined);
      expect(result).toEqual([{string: 'Playground Screen', shouldStyle: false}]);
    });
    it('should return the whole string as a single part when style string is empty', () => {
      const result = getTextPartsToStyle('Playground Screen', '');
      expect(result).toEqual([{string: 'Playground Screen', shouldStyle: false}]);
    });
    it('should return the whole string as a single part when style string dont match', () => {
      const result = getTextPartsToStyle('Playground Screen', 'aaa');
      expect(result).toEqual([{string: 'Playground Screen', shouldStyle: false}]);
    });
    it('should break text to parts according to style string', () => {
      const result = getTextPartsToStyle('Playground Screen', 'Scr');
      expect(result).toEqual([
        {string: 'Playground ', shouldStyle: false},
        {string: 'Scr', shouldStyle: true},
        {string: 'een', shouldStyle: false}
      ]);
    });

    it('should handle case when style repeats more than once', () => {
      const result = getTextPartsToStyle('Dancing in the Dark', 'Da');
      expect(result).toEqual([
        {string: 'Da', shouldStyle: true},
        {string: 'ncing in the ', shouldStyle: false},
        {string: 'Da', shouldStyle: true},
        {string: 'rk', shouldStyle: false}
      ]);
    });

    it('should handle ignore case-sensetive', () => {
      const result = getTextPartsToStyle('Dancing in the Dark', 'da');
      expect(result).toEqual([
        {string: 'Da', shouldStyle: true},
        {string: 'ncing in the ', shouldStyle: false},
        {string: 'Da', shouldStyle: true},
        {string: 'rk', shouldStyle: false}
      ]);
    });

    it('Should handle special characters @', () => {
      const result = getTextPartsToStyle('@ancing in the @ark', '@a');
      expect(result).toEqual([
        {string: '@a', shouldStyle: true},
        {string: 'ncing in the ', shouldStyle: false},
        {string: '@a', shouldStyle: true},
        {string: 'rk', shouldStyle: false}
      ]);
    });

    it('Should handle special characters !', () => {
      const result = getTextPartsToStyle('!ancing in the !ark', '!a');
      expect(result).toEqual([
        {string: '!a', shouldStyle: true},
        {string: 'ncing in the ', shouldStyle: false},
        {string: '!a', shouldStyle: true},
        {string: 'rk', shouldStyle: false}
      ]);
    });

    it('Should handle special characters starts with @', () => {
      const result = getTextPartsToStyle('uilib@wix.com', '@wix');
      expect(result).toEqual([
        {string: 'uilib', shouldStyle: false},
        {string: '@wix', shouldStyle: true},
        {string: '.com', shouldStyle: false}
      ]);
    });

    it('Should handle empty string .', () => {
      const result = getTextPartsToStyle('@ancing in the @ark', '');
      expect(result).toEqual([{string: '@ancing in the @ark', shouldStyle: false}]);
    });
  });

  describe('getArrayPartsToStyle', () => {
    it('should return the whole string as a single part when style array is empty', () => {
      const result = getArrayPartsToStyle('Playground Screen', []);
      expect(result).toEqual([{string: 'Playground Screen', shouldStyle: false}]);
    });
    it('should return the whole string as a single part when style string is empty', () => {
      const result = getArrayPartsToStyle('Playground Screen', ['']);
      expect(result).toEqual([{string: 'Playground Screen', shouldStyle: false}]);
    });
    it('should return the whole string as a single part when style string dont match', () => {
      const result = getArrayPartsToStyle('Playground Screen', ['aaa']);
      expect(result).toEqual([{string: 'Playground Screen', shouldStyle: false}]);
    });
    it('should break text to parts according to style string', () => {
      const result = getArrayPartsToStyle('Playground Screen', ['Scr']);
      expect(result).toEqual([
        {string: 'Playground ', shouldStyle: false},
        {string: 'Scr', shouldStyle: true},
        {string: 'een', shouldStyle: false}
      ]);
    });

    it('style repeats more than once should color the first match', () => {
      const result = getArrayPartsToStyle('Dancing in the Dark', ['Da']);
      expect(result).toEqual([
        {string: 'Da', shouldStyle: true},
        {string: 'ncing in the Dark', shouldStyle: false}
      ]);
    });

    it('should handle ignore case-sensetive', () => {
      const result = getArrayPartsToStyle('Dancing in the Dark', ['da']);
      expect(result).toEqual([
        {string: 'Da', shouldStyle: true},
        {string: 'ncing in the Dark', shouldStyle: false}
      ]);
    });

    it('Should handle special characters @', () => {
      const result = getArrayPartsToStyle('@ancing in the @ark', ['@a']);
      expect(result).toEqual([
        {string: '@a', shouldStyle: true},
        {string: 'ncing in the @ark', shouldStyle: false}
      ]);
    });

    it('Should handle special characters !', () => {
      const result = getArrayPartsToStyle('!ancing in the !ark', ['!a']);
      expect(result).toEqual([
        {string: '!a', shouldStyle: true},
        {string: 'ncing in the !ark', shouldStyle: false}
      ]);
    });

    it('Should handle special characters starts with @', () => {
      const result = getArrayPartsToStyle('uilib@wix.com', ['@wix']);
      expect(result).toEqual([
        {string: 'uilib', shouldStyle: false},
        {string: '@wix', shouldStyle: true},
        {string: '.com', shouldStyle: false}
      ]);
    });
  });

  describe('unifyTextPartsStyles', () => {
    it('should return the whole string as a single part when style array is empty', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, []);
      const underlineTextParts = getPartsToStyle(string, []);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([{string: 'Playground Screen', style: [{color: undefined}, {textDecorationLine: undefined}]}]);
    });
    it('should return the whole string as a single part when style string is empty', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['']);
      const underlineTextParts = getPartsToStyle(string, ['']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([{string: 'Playground Screen', style: [{color: undefined}, {textDecorationLine: undefined}]}]);
    });
    it('should return the whole string as a single part when style string dont match', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['aaa']);
      const underlineTextParts = getPartsToStyle(string, ['bbb']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([{string: 'Playground Screen', style: [{color: undefined}, {textDecorationLine: undefined}]}]);
    });
    it('should break text to parts according to style string (highlight)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['Scr']);
      const underlineTextParts = getPartsToStyle(string, ['']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'Playground ', style: [{color: undefined}, {textDecorationLine: undefined}]},
        {string: 'Scr', style: [{color: 'red'}, {textDecorationLine: undefined}]},
        {string: 'een', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
    it('should break text to parts according to style string (underline)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['']);
      const underlineTextParts = getPartsToStyle(string, ['Scr']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'Playground ', style: [{color: undefined}, {textDecorationLine: undefined}]},
        {string: 'Scr', style: [{color: undefined}, {textDecorationLine: 'underline'}]},
        {string: 'een', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
    it('should break text to parts according to style string (both)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['Scr']);
      const underlineTextParts = getPartsToStyle(string, ['Scr']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'Playground ', style: [{color: undefined}, {textDecorationLine: undefined}]},
        {string: 'Scr', style: [{color: 'red'}, {textDecorationLine: 'underline'}]},
        {string: 'een', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
    it('should break text to parts according to style string (different strings)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['Play']);
      const underlineTextParts = getPartsToStyle(string, ['Scr']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'Play', style: [{color: 'red'}, {textDecorationLine: undefined}]},
        {string: 'ground ', style: [{color: undefined}, {textDecorationLine: undefined}]},
        {string: 'Scr', style: [{color: undefined}, {textDecorationLine: 'underline'}]},
        {string: 'een', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
    it('should break text to parts according to style string (overlapping 1)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['Playground']);
      const underlineTextParts = getPartsToStyle(string, ['laygroun']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'P', style: [{color: 'red'}, {textDecorationLine: undefined}]},
        {string: 'laygroun', style: [{color: 'red'}, {textDecorationLine: 'underline'}]},
        {string: 'd', style: [{color: 'red'}, {textDecorationLine: undefined}]},
        {string: ' Screen', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
    it('should break text to parts according to style string (overlapping 2)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['laygroun']);
      const underlineTextParts = getPartsToStyle(string, ['Playground']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'P', style: [{color: undefined}, {textDecorationLine: 'underline'}]},
        {string: 'laygroun', style: [{color: 'red'}, {textDecorationLine: 'underline'}]},
        {string: 'd', style: [{color: undefined}, {textDecorationLine: 'underline'}]},
        {string: ' Screen', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
    it('should break text to parts according to style string (overlapping 3)', () => {
      const string = 'Playground Screen';
      const highlightTextParts = getPartsToStyle(string, ['Playg']);
      const underlineTextParts = getPartsToStyle(string, ['ground']);
      const result = unifyTextPartsStyles(string,
        styles.highlight,
        styles.notHighlight,
        styles.underline,
        styles.notUnderline,
        highlightTextParts,
        underlineTextParts);
      expect(result).toEqual([
        {string: 'Play', style: [{color: 'red'}, {textDecorationLine: undefined}]},
        {string: 'g', style: [{color: 'red'}, {textDecorationLine: 'underline'}]},
        {string: 'round', style: [{color: undefined}, {textDecorationLine: 'underline'}]},
        {string: ' Screen', style: [{color: undefined}, {textDecorationLine: undefined}]}
      ]);
    });
  });
});

const styles = StyleSheet.create({
  highlight: {
    color: 'red'
  },
  notHighlight: {
    color: undefined
  },
  underline: {
    textDecorationLine: 'underline'
  },
  notUnderline: {
    textDecorationLine: undefined
  }
});

