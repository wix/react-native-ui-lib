import * as uut from '../helpers/useSizeStyle';

describe('Dialog:useSizeStyle', () => {
  describe('getSizeFromPercentage', () => {
    it('should handle 100%', () => {
      expect(uut.getSizeFromPercentage('100%', 500)).toEqual(500);
    });

    it('should handle two digits', () => {
      expect(uut.getSizeFromPercentage('40%', 200)).toEqual(80);
    });

    it('should handle one digit', () => {
      expect(uut.getSizeFromPercentage('5%', 360)).toEqual(18);
    });
  });

  describe('getSizeAsNumber', () => {
    it('width | undefined', () => {
      expect(uut.getSizeAsNumber(true, undefined)).toEqual(undefined);
    });

    it('width | number', () => {
      expect(uut.getSizeAsNumber(true, 38)).toEqual(38);
    });

    it('width | string', () => {
      expect(uut.getSizeAsNumber(true, '30%')).toEqual(225);
    });

    it('height | undefined', () => {
      expect(uut.getSizeAsNumber(false, undefined)).toEqual(undefined);
    });

    it('height | number', () => {
      expect(uut.getSizeAsNumber(false, 38)).toEqual(38);
    });

    it('height | string', () => {
      expect(uut.getSizeAsNumber(false, '30%')).toEqual(400.2);
    });
  });

  describe('getSize', () => {
    it('width | no default | no width | no style', () => {
      expect(uut.getSize(true, undefined, undefined, {backgroundColor: 'red'})).toEqual(undefined);
    });

    it('width | default | no width | no style', () => {
      expect(uut.getSize(true, 250, undefined, {backgroundColor: 'red'})).toEqual(250);
    });

    it('width | default | no width | no style (has height)', () => {
      expect(uut.getSize(true, 250, undefined, {backgroundColor: 'red', height: 40})).toEqual(250);
    });

    it('width | default | width | no style', () => {
      expect(uut.getSize(true, 250, 30, {backgroundColor: 'red'})).toEqual(30);
    });

    it('width | default | width | style', () => {
      expect(uut.getSize(true, 250, 30, {backgroundColor: 'red', width: 15})).toEqual(30);
    });

    it('width | default | width (percentage) | style', () => {
      expect(uut.getSize(true, 250, '10%', {backgroundColor: 'red', width: 15})).toEqual(75);
    });

    it('width | default | no width | style', () => {
      expect(uut.getSize(true, 250, undefined, {backgroundColor: 'red', width: 15})).toEqual(15);
    });

    it('width | default | no width | style (percentage)', () => {
      expect(uut.getSize(true, 250, undefined, {backgroundColor: 'red', width: '15%'})).toEqual(112.5);
    });

    it('height | no default | no height | no style', () => {
      expect(uut.getSize(false, undefined, undefined, {backgroundColor: 'red'})).toEqual(undefined);
    });

    it('height | default | no height | no style', () => {
      expect(uut.getSize(false, 250, undefined, {backgroundColor: 'red'})).toEqual(250);
    });

    it('height | default | no height | no style (has width)', () => {
      expect(uut.getSize(false, 250, undefined, {backgroundColor: 'red', width: 40})).toEqual(250);
    });

    it('height | default | height | no style', () => {
      expect(uut.getSize(false, 250, 30, {backgroundColor: 'red'})).toEqual(30);
    });

    it('height | default | height (percentage) | style', () => {
      expect(uut.getSize(false, 250, '10%', {backgroundColor: 'red', height: 15})).toEqual(133.4);
    });

    it('height | default | height | style', () => {
      expect(uut.getSize(false, 250, 30, {backgroundColor: 'red', height: 15})).toEqual(30);
    });

    it('height | default | no height | style', () => {
      expect(uut.getSize(false, 250, undefined, {backgroundColor: 'red', height: 15})).toEqual(15);
    });

    it('height | default | no height | style (percentage)', () => {
      expect(uut.getSize(false, 250, undefined, {backgroundColor: 'red', height: '15%'})).toEqual(200.1);
    });
  });
});
