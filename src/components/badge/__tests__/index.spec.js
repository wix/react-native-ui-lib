import {Badge} from '../index';

describe('Badge', () => {
  describe('Badge Label', () => {
    it('Should return the label sent (unformatted)', () => {
      const uut = new Badge({label: '10'});
      expect(uut.getFormattedLabel()).toEqual('10');
    });
    it('Should return original label if it is NaN (string) ', () => {
      const uut = new Badge({label: 'a'});
      expect(uut.getFormattedLabel()).toEqual('a');
    });
    it('Should return original label if it is NaN (number with +) ', () => {
      const uut = new Badge({label: '99+'});
      expect(uut.getFormattedLabel()).toEqual('99+');
    });
    it('Should return formatted label according to given labelFormatterLimit prop (1) ', () => {
      const uut = new Badge({label: '10000', labelFormatterLimit: 1});
      expect(uut.getFormattedLabel()).toEqual('9+');
    });
    it('Should return formatted label according to given labelFormatterLimit prop (2) ', () => {
      const uut = new Badge({label: '10000', labelFormatterLimit: 2});
      expect(uut.getFormattedLabel()).toEqual('99+');
    });
    it('Should return formatted label according to given labelFormatterLimit prop (3) ', () => {
      const uut = new Badge({label: '10000', labelFormatterLimit: 3});
      expect(uut.getFormattedLabel()).toEqual('999+');
    });
    it('Should return formatted label according to given labelFormatterLimit prop (4) ', () => {
      const uut = new Badge({label: '10000', labelFormatterLimit: 4});
      expect(uut.getFormattedLabel()).toEqual('9999+');
    });
    it('Should not format label if it is not larger than maxLabelNumber', () => {
      const uut = new Badge({label: '999', labelFormatterLimit: 3});
      expect(uut.getFormattedLabel()).toEqual('999');
    });
    it('Should return original label when labelFormatterLimit prop is not included in LABEL_FORMATTER_VALUES array', () => {
      const uut = new Badge({label: '9', labelFormatterLimit: 'a'});
      expect(uut.getFormattedLabel()).toEqual('9');
    });
    it('Should return original label when label is NaN and labelFormatterLimit prop is valid ', () => {
      const uut = new Badge({label: 'a', labelFormatterLimit: 3});
      expect(uut.getFormattedLabel()).toEqual('a');
    });
    it('Should return original label when labelFormatterLimit prop is undefined', () => {
      const uut = new Badge({label: '9', labelFormatterLimit: undefined});
      expect(uut.getFormattedLabel()).toEqual('9');
    });
    it('Should return original label when labelFormatterLimit prop is not included in LABEL_FORMATTER_VALUES array', () => {
      const uut = new Badge({label: '9', labelFormatterLimit: 5});
      expect(uut.getFormattedLabel()).toEqual('9');
    });
    it('Should return original label when labelFormatterLimit prop is not included in LABEL_FORMATTER_VALUES array', () => {
      const uut = new Badge({label: '9', labelFormatterLimit: 0});
      expect(uut.getFormattedLabel()).toEqual('9');
    });
  });

  describe('Badge Size', () => {
    it('Should return pimple badge when no size and no label passed', () => {
      const uut = new Badge({});
      console.log(`uut.size`, uut.size);
      expect(uut.size).toEqual(10);
    });

    it('Should return pimple badge when no label  and size undefined', () => {
      const uut = new Badge({label: undefined, size: undefined});
      console.log(`uut.size`, uut.size);
      expect(uut.size).toEqual(10);
    });

    it('Shouldn\'t return pimple badge when label is undefined and size passed', () => {
      const uut = new Badge({label: undefined, size: 20});
      console.log(`uut.size`, uut.size);
      expect(uut.size).toEqual(20);
    });

    it('Should return size when label is empty string', () => {
      const uut = new Badge({label: '', size: 20});
      console.log(`uut.size`, uut.size);
      expect(uut.size).toEqual(20);
    });
  });
});
