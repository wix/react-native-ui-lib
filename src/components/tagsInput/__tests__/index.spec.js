import _ from 'lodash';
import {Constants} from '../../../helpers';
import TagsInput from '../index';

describe('TagsInput', () => {
  let uut;
  beforeEach(() => {
    uut = new TagsInput({});
    uut.setState = jest.fn(state => _.assign(uut.state, state));
    _.set(uut.state, 'tags', [{}, {}, {}]);
  });

  describe('getLabel', () => {
    it('should return the string value in case item is a string', () => {
      expect(uut.getLabel('value')).toBe('value');
      expect(uut.getLabel('label')).toBe('label');
    });

    it('should return the label prop value in case item is an object and getLabel was not provided', () => {
      expect(uut.getLabel({label: 'labelValue'})).toBe('labelValue');
      expect(uut.getLabel({label2: 'labelValue'})).toBe(undefined);
    });

    it('should return the label according to getLabel callback provided in props', () => {
      const getLabel = jest.fn(item => item.value);
      uut = new TagsInput({getLabel});
      expect(uut.getLabel({value: 'label', label: 'bla'})).toBe('label');
    });

    it('should return the label according to getLabel callback even if item is a string', () => {
      const getLabel = jest.fn(item => `${item}1`);
      uut = new TagsInput({getLabel});
      expect(uut.getLabel('label')).toBe('label1');
    });
  });

  describe('onKeyPress', () => {
    let removeTagSpy;
    beforeEach(() => {
      removeTagSpy = jest.spyOn(uut, 'removeMarkedTag');
    });

    it('should update state - tagIndexToRemove with last tag index', () => {
      const pressEvent = {nativeEvent: {key: 'Backspace'}};
      uut.onKeyPress(pressEvent);
      expect(uut.state.tagIndexToRemove).toBe(2);
    });

    it('should not update state if keyCode is not backspace', () => {
      const pressEvent = {nativeEvent: {key: 'space'}};
      uut.onKeyPress(pressEvent);
      expect(uut.state.tagIndexToRemove).toBe(undefined);
      expect(removeTagSpy).not.toHaveBeenCalled();
    });

    it('should not update state if there are not tags', () => {
      const pressEvent = {nativeEvent: {key: 'Backspace'}};
      _.set(uut.state, 'tags', []);
      uut.onKeyPress(pressEvent);
      expect(uut.state.tagIndexToRemove).toBe(undefined);
      expect(removeTagSpy).not.toHaveBeenCalled();
    });

    it('should ignore key event if platform is Android', () => {
      Constants.isAndroid = true;
      const pressEvent = {};
      _.set(uut.state, 'tags', [{}, {}, {}]);
      uut.onKeyPress(pressEvent);
      expect(uut.state.tagIndexToRemove).toBe(2);
      Constants.isAndroid = false;
    });

    it('should not update state if input value is not empty', () => {
      const pressEvent = {nativeEvent: {key: 'Backspace'}};
      _.set(uut.state, 'tags', [{}, {}, {}]);
      _.set(uut.state, 'value', 'some text');
      uut.onKeyPress(pressEvent);
      expect(uut.state.tagIndexToRemove).toBe(undefined);
      expect(removeTagSpy).not.toHaveBeenCalled();
    });

    it('should invoke onKeyPress callback provided in props with the event', () => {
      const pressEvent = {nativeEvent: {key: 'space'}};
      const onKeyPressCallback = jest.fn();
      uut = new TagsInput({onKeyPress: onKeyPressCallback});

      uut.onKeyPress(pressEvent);
      expect(onKeyPressCallback).toHaveBeenCalledWith(pressEvent);
    });

    it('should not set last tag index if it is already set to last index, instead call remove tag', () => {
      const pressEvent = {nativeEvent: {key: 'Backspace'}};
      _.set(uut.state, 'tagIndexToRemove', 2);
      uut.onKeyPress(pressEvent);
      expect(removeTagSpy).toHaveBeenCalled();
      expect(uut.state.tagIndexToRemove).toBe(undefined);
    });

    it('should not remove tag nor update tagIndexToRemove if pressed any key while tagIndexToRemove was set', () => {
      const pressEvent = {nativeEvent: {key: 'space'}};
      _.set(uut.state, 'tagIndexToRemove', 2);
      uut.onKeyPress(pressEvent);
      expect(removeTagSpy).not.toHaveBeenCalled();
      expect(uut.state.tagIndexToRemove).toBe(2);
    });
  });

  describe('removeMarkedTag', () => {
    const onChangeTagsCallback = jest.fn();
    beforeEach(() => {
      _.set(uut, 'props.onChangeTags', onChangeTagsCallback);
    });
    it('should not change tags if there is no tagIndexToRemove in state', () => {
      const tags = [{}, {}];
      _.set(uut, 'state', {tagIndexToRemove: undefined, tags});
      uut.removeMarkedTag();
      expect(uut.state.tags).toEqual(tags);
      expect(onChangeTagsCallback).not.toHaveBeenCalled();
    });

    it('should remove tag according to the tagIndexToRemove in state and invoke ', () => {
      const tags = [{}, {}, {}];
      const tagIndexToRemove = 2;
      const removedTag = tags[tagIndexToRemove];
      _.set(uut, 'state', {tagIndexToRemove, tags});
      uut.removeMarkedTag();
      expect(uut.state.tags).toEqual([tags[0], tags[1]]);
      expect(onChangeTagsCallback).toHaveBeenCalledWith([tags[0], tags[1]], 'removed', removedTag);
      expect(uut.state.tagIndexToRemove).toBeUndefined();
    });
  });

  describe('onTagPress', () => {
    it('should set tagIndexToRemove according to given index', () => {
      _.set(uut, 'state.tagIndexToRemove', undefined);
      uut.onTagPress(1);
      expect(uut.state.tagIndexToRemove).toBe(1);
      uut.onTagPress(2);
      expect(uut.state.tagIndexToRemove).toBe(2);
    });

    it('should call to removeMarkedTag if the given index is the same as the current tagIndexToRemove', () => {
      const removeTagSpy = jest.spyOn(uut, 'removeMarkedTag');
      _.set(uut, 'state.tagIndexToRemove', 1);
      uut.onTagPress(1);
      expect(removeTagSpy).toHaveBeenCalledWith();
    });
  });
});
