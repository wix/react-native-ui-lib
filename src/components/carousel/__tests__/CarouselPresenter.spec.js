import * as uut from '../CarouselPresenter';

describe('Carousel presenter', () => {
  it('should getChildrenLength', () => {
    expect(uut.getChildrenLength({children: [{}, {}, {}]})).toBe(3);
    expect(uut.getChildrenLength({children: [{}]})).toBe(1);
    expect(uut.getChildrenLength({})).toBe(0);
  });

  it('should calcOffset', () => {
    expect(uut.calcOffset({pageWidth: 120, children: [{}, {}, {}]}, {currentPage: 0})).toBe(120);
    expect(uut.calcOffset({pageWidth: 120, children: [{}, {}, {}]}, {currentPage: 1})).toBe(240);
    expect(uut.calcOffset({pageWidth: 120, children: [{}, {}, {}]}, {currentPage: 2})).toBe(360);
  });

  it('should calcPageIndex', () => {
    expect(uut.calcPageIndex(120, {pageWidth: 120, children: [{}, {}, {}]})).toBe(0);
    expect(uut.calcPageIndex(245, {pageWidth: 120, children: [{}, {}, {}]})).toBe(1);
    expect(uut.calcPageIndex(481, {pageWidth: 120, children: [{}, {}, {}]})).toBe(0);
    expect(uut.calcPageIndex(5, {pageWidth: 120, children: [{}, {}, {}]})).toBe(2);
  });

  it('should return isOutsideLimits', () => {
    expect(uut.isOutOfBounds(120, {pageWidth: 120, children: [{}, {}, {}]})).toBe(false);
    expect(uut.isOutOfBounds(1125, {pageWidth: 375, children: [{}, {}, {}, {}]})).toBe(false);
    expect(uut.isOutOfBounds(0, {pageWidth: 120, children: [{}, {}, {}]})).toBe(true);
    expect(uut.isOutOfBounds(481, {pageWidth: 120, children: [{}, {}, {}]})).toBe(true);
    expect(uut.isOutOfBounds(1875, {pageWidth: 375, children: [{}, {}, {}, {}]})).toBe(true);
  });

  it('should calcCarouselWidth', () => {
    expect(uut.calcCarouselWidth({pageWidth: 70, children: [{}, {}, {}]})).toBe(210);
    expect(uut.calcCarouselWidth({pageWidth: 50, children: [{}, {}, {}]})).toBe(150);
    expect(uut.calcCarouselWidth({pageWidth: 150, loop: true, children: [{}, {}, {}]})).toBe(750);
  });
});

