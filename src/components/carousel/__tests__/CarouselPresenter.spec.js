import * as uut from '../CarouselPresenter';

describe('Carousel presenter', () => {
  it('should getChildrenLength', () => {
    expect(uut.getChildrenLength({migrate: true, children: [{}, {}, {}]})).toBe(3);
    expect(uut.getChildrenLength({migrate: true, children: [{}]})).toBe(1);
    expect(uut.getChildrenLength({migrate: true})).toBe(0);
  });

  describe('calcOffset', () => {
    it('should calcOffset (default mode)', () => {
      expect(uut.calcOffset({migrate: true, children: [{}, {}, {}]}, {pageWidth: 120, currentPage: 0})).toBe(0);
      expect(uut.calcOffset({migrate: true, children: [{}, {}, {}]}, {pageWidth: 120, currentPage: 1})).toBe(120);
      expect(uut.calcOffset({migrate: true, children: [{}, {}, {}]}, {pageWidth: 120, currentPage: 2})).toBe(240);
    });

    it('should calcOffset (loop mode)', () => {
      expect(uut.calcOffset({migrate: true, loop: true, children: [{}, {}, {}]}, {pageWidth: 120, currentPage: 0})).toBe(120);
      expect(uut.calcOffset({migrate: true, loop: true, children: [{}, {}, {}]}, {pageWidth: 120, currentPage: 1})).toBe(240);
      expect(uut.calcOffset({migrate: true, loop: true, children: [{}, {}, {}]}, {pageWidth: 120, currentPage: 2})).toBe(360);
    });
  });

  describe('calcPageIndex', () => {
    it('should calcPageIndex', () => {
      expect(uut.calcPageIndex(120, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(1);
      expect(uut.calcPageIndex(245, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(2);
      expect(uut.calcPageIndex(481, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(2);
      expect(uut.calcPageIndex(5, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(0);
    });

    it('should calcPageIndex (loop mode)', () => {
      expect(uut.calcPageIndex(120, {migrate: true, loop: true, children: [{}, {}, {}]}, 120)).toBe(0);
      expect(uut.calcPageIndex(245, {migrate: true, loop: true, children: [{}, {}, {}]}, 120)).toBe(1);
      expect(uut.calcPageIndex(481, {migrate: true, loop: true, children: [{}, {}, {}]}, 120)).toBe(0);
      expect(uut.calcPageIndex(5, {migrate: true, loop: true, children: [{}, {}, {}]}, 120)).toBe(2);
    });
  });

  it('should return isOutsideLimits', () => {
    expect(uut.isOutOfBounds(120, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(false);
    expect(uut.isOutOfBounds(1125, {migrate: true, children: [{}, {}, {}, {}]}, 375)).toBe(false);
    expect(uut.isOutOfBounds(0, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(true);
    expect(uut.isOutOfBounds(481, {migrate: true, children: [{}, {}, {}]}, 120)).toBe(true);
    expect(uut.isOutOfBounds(1875, {migrate: true, children: [{}, {}, {}, {}]}, 375)).toBe(true);
  });
});
