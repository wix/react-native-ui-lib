import TabBar from '../index';

describe('TabBar', () => {
  // it('should calcIndicatorWidth return appropriate size according to TabBarItems count', () => {
  //   let uut = new TabBar({});
  //   expect(uut.calcIndicatorWidth()).toBe('0%');
  //   uut = new TabBar({children: [1]});
  //   expect(uut.calcIndicatorWidth()).toBe('100%');
  //   uut = new TabBar({children: [1, 2]});
  //   expect(uut.calcIndicatorWidth()).toBe('50%');
  //   uut = new TabBar({children: [1, 2, 3]});
  //   expect(uut.calcIndicatorWidth()).toBe('33%');
  //   uut = new TabBar({children: [1, 2, 3, 4]});
  //   expect(uut.calcIndicatorWidth()).toBe('25%');
  // });

  it('should render scrollBar when mode is type SCROLL', () => {
    const uut = new TabBar({mode: TabBar.modes.FIT});
    jest.spyOn(uut, 'renderScrollBar');
    expect(uut.renderScrollBar).not.toBeCalled();
  });
});
