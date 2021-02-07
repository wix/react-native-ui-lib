import * as uut from '../CarouselPresenter';

describe('Carousel presenter', () => {
  it('should getChildrenLength', () => {
    expect(uut.getChildrenLength({children: [{}, {}, {}]})).toBe(3);
    expect(uut.getChildrenLength({children: [{}]})).toBe(1);
    expect(uut.getChildrenLength()).toBe(0);
  });

  describe('calcOffset', () => {
    it('should calcOffset (default mode)', () => {
      expect(uut.calcOffset({children: [{}, {}, {}], horizontal: true}, {pageWidth: 120, pageHeight: 100, currentPage: 0})).toStrictEqual({x: 0, y: 0});
      expect(uut.calcOffset({children: [{}, {}, {}], horizontal: true}, {pageWidth: 120, pageHeight: 100, currentPage: 1})).toStrictEqual({x: 120, y: 0});
      expect(uut.calcOffset({children: [{}, {}, {}], horizontal: true}, {pageWidth: 120, pageHeight: 100, currentPage: 2})).toStrictEqual({x: 240, y: 0});
      expect(uut.calcOffset({children: [{}, {}, {}], horizontal: false}, {pageWidth: 80, pageHeight: 150, currentPage: 0})).toStrictEqual({x: 0, y: 0});
      expect(uut.calcOffset({children: [{}, {}, {}], horizontal: false}, {pageWidth: 80, pageHeight: 150, currentPage: 1})).toStrictEqual({x: 0, y: 150});
      expect(uut.calcOffset({children: [{}, {}, {}], horizontal: false}, {pageWidth: 80, pageHeight: 150, currentPage: 2})).toStrictEqual({x: 0, y: 300});
    });

    it('should calcOffset (loop mode)', () => {
      expect(uut.calcOffset({loop: true, children: [{}, {}, {}], horizontal: true}, {pageWidth: 120, pageHeight: 100, currentPage: 0})).toStrictEqual({x: 120, y: 0});
      expect(uut.calcOffset({loop: true, children: [{}, {}, {}], horizontal: true}, {pageWidth: 120, pageHeight: 100, currentPage: 1})).toStrictEqual({x: 240, y: 0});
      expect(uut.calcOffset({loop: true, children: [{}, {}, {}], horizontal: true}, {pageWidth: 120, pageHeight: 100, currentPage: 2})).toStrictEqual({x: 360, y: 0});
    });
  });

  describe('calcPageIndex', () => {
    it('should calcPageIndex', () => {
      expect(uut.calcPageIndex(120, {children: [{}, {}, {}]}, 120)).toBe(1);
      expect(uut.calcPageIndex(245, {children: [{}, {}, {}]}, 120)).toBe(2);
      expect(uut.calcPageIndex(481, {children: [{}, {}, {}]}, 120)).toBe(2);
      expect(uut.calcPageIndex(5, {children: [{}, {}, {}]}, 120)).toBe(0);
    });

    it('should calcPageIndex (loop mode)', () => {
      expect(uut.calcPageIndex(120, {loop: true, children: [{}, {}, {}]}, 120)).toBe(0);
      expect(uut.calcPageIndex(245, {loop: true, children: [{}, {}, {}]}, 120)).toBe(1);
      expect(uut.calcPageIndex(481, {loop: true, children: [{}, {}, {}]}, 120)).toBe(0);
      expect(uut.calcPageIndex(5, {loop: true, children: [{}, {}, {}]}, 120)).toBe(2);
    });
  });

  it('should return isOutsideLimits', () => {
    expect(uut.isOutOfBounds(120, {children: [{}, {}, {}]}, 120)).toBe(false);
    expect(uut.isOutOfBounds(1125, {children: [{}, {}, {}, {}]}, 375)).toBe(false);
    expect(uut.isOutOfBounds(0, {children: [{}, {}, {}]}, 120)).toBe(true);
    expect(uut.isOutOfBounds(481, {children: [{}, {}, {}]}, 120)).toBe(true);
    expect(uut.isOutOfBounds(1875, {children: [{}, {}, {}, {}]}, 375)).toBe(true);
  });
});
