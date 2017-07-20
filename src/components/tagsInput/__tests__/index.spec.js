import TagsInput from '../index';

describe('TagsInput', () => {
  describe('getLabel', () => {
    it('should return the string value in case item is a string', () => {
      const uut = new TagsInput({});
      expect(uut.getLabel('value')).toBe('value');
      expect(uut.getLabel('label')).toBe('label');
    });

    it('should return the label prop value in case item is an object and getLabel was not provided', () => {
      const uut = new TagsInput({});
      expect(uut.getLabel({label: 'labelValue'})).toBe('labelValue');
      expect(uut.getLabel({label2: 'labelValue'})).toBe(undefined);
    });

    it('should return the label according to getLabel callback provided in props', () => {
      const getLabel = jest.fn(item => item.value);
      const uut = new TagsInput({getLabel});
      expect(uut.getLabel({value: 'label', label: 'bla'})).toBe('label');
    });

    it('should return the label according to getLabel callback even if item is a string', () => {
      const getLabel = jest.fn(item => `${item}1`);
      const uut = new TagsInput({getLabel});
      expect(uut.getLabel('label')).toBe('label1');
    });
  });
});
