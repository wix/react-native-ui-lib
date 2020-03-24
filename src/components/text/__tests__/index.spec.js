import {Text} from '../index';

describe('Text', () => {
  describe('getTextPartsByHighlight', () => {

    it('should return the whole string as a single part when highlight string is empty', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', '');
      expect(result).toEqual(['Playground Screen']);
    });
    it('should return the whole string as a single part when highlight string dont match', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', 'aaa');
      expect(result).toEqual(['Playground Screen']);
    });
    it('should break text to parts according to highlight string', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Playground Screen', 'Scr');
      expect(result).toEqual(['Playground ', 'Scr', 'een']);
    });
    
    it('should handle case when highlight repeats more than once', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Dancing in the Dark', 'Da');
      expect(result).toEqual(['Da', 'ncing in the ', 'Da', 'rk']);
    });
    
    it('should handle ignore case-sensetive', () => {
      const uut = new Text({});
      const result = uut.getTextPartsByHighlight('Dancing in the Dark', 'da');
      expect(result).toEqual(['Da', 'ncing in the ', 'Da', 'rk']);
    });
  });
});
