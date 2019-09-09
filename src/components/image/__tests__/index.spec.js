import Image from '../index';
import {ThemeManager} from '../../../style';
import Assets from '../../../assets';

describe('Image', () => {
  beforeEach(() => {
    ThemeManager.setComponentTheme('Image', {});
  });

  describe('getImageSource', () => {
    it('should return source prop, if no transformer was sent', () => {
      const uut = new Image({source: 1});
      expect(uut.getImageSource()).toBe(1);
    });

    it('should return transformed source prop, according to sourceTransform prop', () => {
      const sourceTransformer = jest.fn(() => 2);
      const uut = new Image({source: 1, sourceTransformer});
      expect(uut.getImageSource()).toBe(2);
    });

    it('should return transformed source prop, according to sourceTransform in ThemeManager', () => {
      ThemeManager.setTheme({
        components: {
          Image: {
            sourceTransformer: jest.fn(() => 3)
          }
        }
      });
      const uut = new Image({source: 1});
      expect(uut.getImageSource()).toBe(3);
    });

    it('should return transformed source prop, according to sourceTransform prop and other given props', () => {
      const sourceTransformer = jest.fn(({size, source}) => (size === 'small' ? source : 3));
      let uut = new Image({source: 1, size: 'small', sourceTransformer});
      expect(uut.getImageSource()).toBe(1);
      uut = new Image({source: 1, size: 'large', sourceTransformer});
      expect(uut.getImageSource()).toBe(3);
    });

    it('should return asset according to assetName', () => {
      Assets.loadAssetsGroup('icons', {
        test: 'test.png'
      });

      Assets.loadAssetsGroup('icons.general', {
        test: 'test.png'
      });

      let uut = new Image({assetGroup: 'icons', assetName: 'test'});
      expect(uut.getImageSource()).toBe('test.png');

      uut = new Image({assetGroup: 'icons.general', assetName: 'test'});
      expect(uut.getImageSource()).toBe('test.png');
    });

    it('should handle when source sent with uri=null', () => {
      const uut = new Image({source: {uri: null}});
      expect(uut.getImageSource()).toEqual({uri: undefined});
    });

    it('should handle when source sent with uri is empty string', () => {
      const uut = new Image({source: {uri: ''}});
      expect(uut.getImageSource()).toEqual({uri: undefined});
    });
  });
});
