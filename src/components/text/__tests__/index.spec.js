import {Text} from '../index';

describe('Text', () => {
  describe('getTextPartsByHighlight', () => {

    it('should return the whole string as a single part when highlight string is undefined', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', undefined);
      expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
    });
    it('should return the whole string as a single part when highlight string is empty', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', '');
      expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
    });
    it('should return the whole string as a single part when highlight string dont match', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', 'aaa');
      expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
    });
    it('should break text to parts according to highlight string', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', 'Scr');
      expect(result).toEqual([{string: 'Playground ', shouldHighlight: false}, {string: 'Scr', shouldHighlight: true}, {string: 'een', shouldHighlight: false}]);
    });
    
    it('should handle case when highlight repeats more than once', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Dancing in the Dark', 'Da');
      expect(result).toEqual([{string: 'Da', shouldHighlight: true}, {string: 'ncing in the ', shouldHighlight: false}, {string: 'Da', shouldHighlight: true}, {string: 'rk', shouldHighlight: false}]);
    });
    
    it('should handle ignore case-sensetive', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Dancing in the Dark', 'da');
      expect(result).toEqual([{string: 'Da', shouldHighlight: true}, {string: 'ncing in the ', shouldHighlight: false}, {string: 'Da', shouldHighlight: true}, {string: 'rk', shouldHighlight: false}]);
    });

    it('Should handle special characters @', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('@ancing in the @ark', '@a');
      expect(result).toEqual([{string: '@a', shouldHighlight: true}, {string: 'ncing in the ', shouldHighlight: false}, {string: '@a', shouldHighlight: true}, {string: 'rk', shouldHighlight: false}]);
    });

    it('Should handle special characters !', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('!ancing in the !ark', '!a');
      expect(result).toEqual([{string: '!a', shouldHighlight: true}, {string: 'ncing in the ', shouldHighlight: false}, {string: '!a', shouldHighlight: true}, {string: 'rk', shouldHighlight: false}]);
    });

    it('Should handle special characters starts with @', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('uilib@wix.com', '@wix');
      expect(result).toEqual([{string: 'uilib', shouldHighlight: false}, {string: '@wix', shouldHighlight: true}, {string: '.com', shouldHighlight: false}]);
    });

    it('Should handle empty string .', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('@ancing in the @ark', '');
      expect(result).toEqual([{string: '@ancing in the @ark', shouldHighlight: false}]);
    });
  });

  describe('getArrayPartsByHighlight', () => {

    it('should return the whole string as a single part when highlight array is empty', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('Playground Screen', []);
      expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
    });
    it('should return the whole string as a single part when highlight string is empty', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('Playground Screen', ['']);
      expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
    });
    it('should return the whole string as a single part when highlight string dont match', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('Playground Screen', ['aaa']);
      expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
    });
    it('should break text to parts according to highlight string', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('Playground Screen', ['Scr']);
      expect(result).toEqual([{string: 'Playground ', shouldHighlight: false}, {string: 'Scr', shouldHighlight: true}, {string: 'een', shouldHighlight: false}]);
    });
    
    it('highlight repeats more than once should color the first match', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('Dancing in the Dark', ['Da']);
      expect(result).toEqual([{string: 'Da', shouldHighlight: true}, {string: 'ncing in the Dark', shouldHighlight: false}]);
    });
    
    it('should handle ignore case-sensetive', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('Dancing in the Dark', ['da']);
      expect(result).toEqual([{string: 'Da', shouldHighlight: true}, {string: 'ncing in the Dark', shouldHighlight: false}]);
    });

    it('Should handle special characters @', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('@ancing in the @ark', ['@a']);
      expect(result).toEqual([{string: '@a', shouldHighlight: true}, {string: 'ncing in the @ark', shouldHighlight: false}]);
    });

    it('Should handle special characters !', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('!ancing in the !ark', ['!a']);
      expect(result).toEqual([{string: '!a', shouldHighlight: true}, {string: 'ncing in the !ark', shouldHighlight: false}]);
    });

    it('Should handle special characters starts with @', () => {
      const uut = new Text({});
      const result = uut.getArrayPartsByHighlight('uilib@wix.com', ['@wix']);
      expect(result).toEqual([{string: 'uilib', shouldHighlight: false}, {string: '@wix', shouldHighlight: true}, {string: '.com', shouldHighlight: false}]);
    });
  });
});
