import {getTextPartsByHighlight, getArrayPartsByHighlight} from '../textUtils';

describe('Text', () => {
  const mockHighlightStringProps = {
    onPress: jest.fn(),
    style: {color: 'red'},
    testID: 'highlighted-string-test-id'
  };

  describe('getTextPartsByHighlight', () => {
    describe('Simple string', () => {
      it('should return the whole string as a single part when highlight string is undefined', () => {
        const result = getTextPartsByHighlight('Playground Screen', undefined);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should return the whole string as a single part when highlight string is empty', () => {
        const result = getTextPartsByHighlight('Playground Screen', '');
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should return the whole string as a single part when highlight string dont match', () => {
        const result = getTextPartsByHighlight('Playground Screen', 'aaa');
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should break text to parts according to highlight string', () => {
        const result = getTextPartsByHighlight('Playground Screen', 'Scr');
        expect(result).toEqual([
          {string: 'Playground ', shouldHighlight: false},
          {string: 'Scr', shouldHighlight: true},
          {string: 'een', shouldHighlight: false}
        ]);
      });

      it('should handle case when highlight repeats more than once', () => {
        const result = getTextPartsByHighlight('Dancing in the Dark', 'Da');
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: 'Da', shouldHighlight: true},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('should be case-insensitive', () => {
        const result = getTextPartsByHighlight('Dancing in the Dark', 'da');
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: 'Da', shouldHighlight: true},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters @', () => {
        const result = getTextPartsByHighlight('@ancing in the @ark', '@a');
        expect(result).toEqual([
          {string: '@a', shouldHighlight: true},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: '@a', shouldHighlight: true},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters !', () => {
        const result = getTextPartsByHighlight('!ancing in the !ark', '!a');
        expect(result).toEqual([
          {string: '!a', shouldHighlight: true},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: '!a', shouldHighlight: true},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters starts with @', () => {
        const result = getTextPartsByHighlight('uilib@wix.com', '@wix');
        expect(result).toEqual([
          {string: 'uilib', shouldHighlight: false},
          {string: '@wix', shouldHighlight: true},
          {string: '.com', shouldHighlight: false}
        ]);
      });

      it('Should handle empty string.', () => {
        const result = getTextPartsByHighlight('@ancing in the @ark', '');
        expect(result).toEqual([{string: '@ancing in the @ark', shouldHighlight: false}]);
      });

      it('Should handle full string.', () => {
        const result = getTextPartsByHighlight('Dancing in the Dark', 'Dancing in the Dark');
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: true}]);
      });

      it('Should handle longer string.', () => {
        const result = getTextPartsByHighlight('Dancing in the Dark', 'Dancing in the Darker');
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: false}]);
      });
    });

    describe('HighlightStringProps object', () => {
      it('should return the whole string as a single part when highlight string is empty', () => {
        const highlightString = {
          string: '',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('Playground Screen', highlightString);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should return the whole string as a single part when highlight string dont match', () => {
        const highlightString = {
          string: 'aaa',
          onPress: () => {},
          style: {color: 'red'},
          testID: 'highlighted-string-1'
        };
        const result = getTextPartsByHighlight('Playground Screen', highlightString);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should break text to parts according to highlight string', () => {
        const highlightString = {
          string: 'Scr',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('Playground Screen', highlightString);
        expect(result).toEqual([
          {string: 'Playground ', shouldHighlight: false},
          {string: 'Scr', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'een', shouldHighlight: false}
        ]);
      });

      it('should handle case when highlight repeats more than once', () => {
        const highlightString = {
          string: 'Da',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: 'Da', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('should be case-insensitive', () => {
        const highlightString = {
          string: 'da',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: 'Da', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters @', () => {
        const highlightString = {
          string: '@a',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('@ancing in the @ark', highlightString);
        expect(result).toEqual([
          {string: '@a', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: '@a', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters !', () => {
        const highlightString = {
          string: '!a',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('!ancing in the !ark', highlightString);
        expect(result).toEqual([
          {string: '!a', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the ', shouldHighlight: false},
          {string: '!a', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'rk', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters starts with @', () => {
        const highlightString = {
          string: '@wix',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('uilib@wix.com', highlightString);
        expect(result).toEqual([
          {string: 'uilib', shouldHighlight: false},
          {string: '@wix', shouldHighlight: true, ...mockHighlightStringProps},
          {string: '.com', shouldHighlight: false}
        ]);
      });

      it('Should handle empty string.', () => {
        const highlightString = {
          string: '',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('@ancing in the @ark', highlightString);
        expect(result).toEqual([{string: '@ancing in the @ark', shouldHighlight: false}]);
      });

      it('Should handle full string.', () => {
        const highlightString = {
          string: 'Dancing in the Dark',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: true, ...mockHighlightStringProps}]);
      });

      it('Should handle longer string.', () => {
        const highlightString = {
          string: 'Dancing in the Darker',
          ...mockHighlightStringProps
        };
        const result = getTextPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: false}]);
      });
    });
  });

  describe('getArrayPartsByHighlight', () => {
    describe('Simple string array', () => {
      it('should return the whole string as a single part when highlight array is empty', () => {
        const result = getArrayPartsByHighlight('Playground Screen', []);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should return the whole string as a single part when highlight string is empty', () => {
        const result = getArrayPartsByHighlight('Playground Screen', ['']);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should return the whole string as a single part when highlight string dont match', () => {
        const result = getArrayPartsByHighlight('Playground Screen', ['aaa']);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should break text to parts according to highlight string', () => {
        const result = getArrayPartsByHighlight('Playground Screen', ['Scr']);
        expect(result).toEqual([
          {string: 'Playground ', shouldHighlight: false},
          {string: 'Scr', shouldHighlight: true},
          {string: 'een', shouldHighlight: false}
        ]);
      });

      it('highlight repeats more than once should color the first match', () => {
        const result = getArrayPartsByHighlight('Dancing in the Dark', ['Da']);
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true},
          {string: 'ncing in the Dark', shouldHighlight: false}
        ]);
      });

      it('should be case-insensitive', () => {
        const result = getArrayPartsByHighlight('Dancing in the Dark', ['da']);
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true},
          {string: 'ncing in the Dark', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters @', () => {
        const result = getArrayPartsByHighlight('@ancing in the @ark', ['@a']);
        expect(result).toEqual([
          {string: '@a', shouldHighlight: true},
          {string: 'ncing in the @ark', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters !', () => {
        const result = getArrayPartsByHighlight('!ancing in the !ark', ['!a']);
        expect(result).toEqual([
          {string: '!a', shouldHighlight: true},
          {string: 'ncing in the !ark', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters starts with @', () => {
        const result = getArrayPartsByHighlight('uilib@wix.com', ['@wix']);
        expect(result).toEqual([
          {string: 'uilib', shouldHighlight: false},
          {string: '@wix', shouldHighlight: true},
          {string: '.com', shouldHighlight: false}
        ]);
      });

      it('Should handle full string.', () => {
        const result = getArrayPartsByHighlight('Dancing in the Dark', ['Dancing in the Dark']);
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: true}]);
      });

      it('Should handle longer string.', () => {
        const result = getArrayPartsByHighlight('Dancing in the Dark', ['Dancing in the Darker']);
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: false}]);
      });

      it('Should handle multiple strings.', () => {
        const result = getArrayPartsByHighlight('Dancing in the Dark', ['Dancing', 'Dark']);
        expect(result).toEqual([
          {string: 'Dancing', shouldHighlight: true},
          {string: ' in the ', shouldHighlight: false},
          {string: 'Dark', shouldHighlight: true}
        ]);
      });
    });

    describe('HighlightStringProps objects array', () => {
      it('should return the whole string as a single part when highlight string is empty', () => {
        const highlightString = [{
          string: '',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Playground Screen', highlightString);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should return the whole string as a single part when highlight string dont match', () => {
        const highlightString = [{
          string: 'aaa',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Playground Screen', highlightString);
        expect(result).toEqual([{string: 'Playground Screen', shouldHighlight: false}]);
      });
      it('should break text to parts according to highlight string', () => {
        const highlightString = [{
          string: 'Scr',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Playground Screen', highlightString);
        expect(result).toEqual([
          {string: 'Playground ', shouldHighlight: false},
          {string: 'Scr', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'een', shouldHighlight: false}
        ]);
      });

      it('highlight repeats more than once should color the first match', () => {
        const highlightString = [{
          string: 'Da',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the Dark', shouldHighlight: false}
        ]);
      });

      it('should be case-insensitive', () => {
        const highlightString = [{
          string: 'da',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([
          {string: 'Da', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the Dark', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters @', () => {
        const highlightString = [{
          string: '@a',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('@ancing in the @ark', highlightString);
        expect(result).toEqual([
          {string: '@a', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the @ark', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters !', () => {
        const highlightString = [{
          string: '!a',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('!ancing in the !ark', highlightString);
        expect(result).toEqual([
          {string: '!a', shouldHighlight: true, ...mockHighlightStringProps},
          {string: 'ncing in the !ark', shouldHighlight: false}
        ]);
      });

      it('Should handle special characters starts with @', () => {
        const highlightString = [{
          string: '@wix',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('uilib@wix.com', highlightString);
        expect(result).toEqual([
          {string: 'uilib', shouldHighlight: false},
          {string: '@wix', shouldHighlight: true, ...mockHighlightStringProps},
          {string: '.com', shouldHighlight: false}
        ]);
      });

      it('Should handle full string.', () => {
        const highlightString = [{
          string: 'Dancing in the Dark',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: true, ...mockHighlightStringProps}]);
      });

      it('Should handle longer string.', () => {
        const highlightString = [{
          string: 'Dancing in the Darker',
          ...mockHighlightStringProps
        }];
        const result = getArrayPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([{string: 'Dancing in the Dark', shouldHighlight: false}]);
      });

      it('Should handle multiple string.', () => {
        const mockHighlightStringProps2 = {
          onPress: jest.fn(),
          style: {color: 'blue'},
          testID: 'highlighted-string-test-id-2'
        };

        const highlightString = [
          {
            string: 'Dancing',
            ...mockHighlightStringProps
          },
          {
            string: 'Dark',
            ...mockHighlightStringProps2
          }];
        const result = getArrayPartsByHighlight('Dancing in the Dark', highlightString);
        expect(result).toEqual([
          {string: 'Dancing', shouldHighlight: true, ...mockHighlightStringProps},
          {string: ' in the ', shouldHighlight: false},
          {string: 'Dark', shouldHighlight: true, ...mockHighlightStringProps2}
        ]);
      });
    });
  });
});
