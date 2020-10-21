import * as uut from '../AnimationPresenter';

describe('AnimationPresenter', () => {
  describe('generateSource', () => {
    it('should just return the the source given in props', () => {
      const animationSource = {a: 'nimation'};
      expect(uut.generateSource({source: animationSource})).toEqual(animationSource);
    });

    it('should just return the the source template parsed if exists', () => {
      const animationSource = {template: '{"a": "nimation"}'};
      expect(uut.generateSource({source: animationSource})).toEqual(JSON.parse(animationSource.template));
    });

    it('should use default color from template config', () => {
      const animationSource = {template: '{"a": "nimation", "b": [COLOR]}', config: {color: '#f4a142'}};
      expect(
        uut.generateSource({
          source: animationSource
        })
      ).toEqual(JSON.parse('{"a": "nimation", "b": [0.957, 0.631, 0.259, 1]}'));
    });

    it('should return the the source template parsed with color value inject', () => {
      const animationSource = {template: '{"a": "nimation", "b": [COLOR]}'};
      expect(
        uut.generateSource({
          source: animationSource,
          color: '#f4a142'
        })
      ).toEqual(JSON.parse('{"a": "nimation", "b": [0.957, 0.631, 0.259, 1]}'));
      expect(
        uut.generateSource({
          source: animationSource,
          color: '#5fcc75'
        })
      ).toEqual(JSON.parse('{"a": "nimation", "b": [0.373, 0.8, 0.459, 1]}'));
    });

    it('should handle animation with multiple colors', () => {
      const animationSource = {template: '{"a": "nimation", "b": [COLOR1], "C": {"D": [COLOR2]}}'};
      expect(
        uut.generateSource({
          source: animationSource,
          color: ['#f4a142', '#5fcc75']
        })
      ).toEqual(JSON.parse('{"a": "nimation", "b": [0.957, 0.631, 0.259, 1], "C": {"D": [0.373, 0.8, 0.459, 1]}}'));
    });
  });

  describe('convertColorToDecimalArray', () => {
    it('should return array representation of the given color', () => {
      expect(uut.convertColorToDecimalArray('#f4a142')).toEqual([0.957, 0.631, 0.259, 1]);
      expect(uut.convertColorToDecimalArray('#5fcc75BF')).toEqual([0.373, 0.8, 0.459, 0.7490196078431373]);
    });
  });

  describe('getAnimationProps', () => {
    it('should return default values when there is no config or props were sent', () => {
      const source = {template: 'template'};
      expect(uut.getAnimationProps({source})).toEqual({
        duration: 1000,
        width: 50,
        height: 50,
        loop: false,
        toValue: 1
      });
    });

    it('should extract props from source config', () => {
      const source = {
        template: 'template',
        config: {duration: 600, width: 100, height: 120, loop: true}
      };
      expect(uut.getAnimationProps({source})).toEqual({
        duration: 600,
        width: 100,
        height: 120,
        loop: true,
        toValue: 1
      });
    });

    it('should prefer component props over source config', () => {
      const source = {
        template: 'template',
        config: {duration: 600, width: 100, height: 120}
      };
      const props = {
        source,
        duration: 800,
        width: 400,
        height: 300
      };
      expect(uut.getAnimationProps(props)).toEqual({
        duration: 800,
        width: 400,
        height: 300,
        loop: false,
        toValue: 1
      });
    });

    it('should determine target value according to progress', () => {
      const source = {template: 'template'};
      expect(uut.getAnimationProps({source, progress: 0.65})).toEqual({
        duration: 1000,
        width: 50,
        height: 50,
        loop: false,
        toValue: 0.65
      });
    });
  });
});
