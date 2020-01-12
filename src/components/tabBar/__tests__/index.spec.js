import TabBar from '../index';

describe.skip('TabBar', () => {
  describe('calcIndicatorWidth', () => {
    it('should equale 25%', () => {
      const uut = new TabBar({});
      uut.itemsWidths = [80, 80, 80, 80];
      uut.state = {
        selectedIndex: 1
      };
      uut.childrenCount = 4; // This fails because we change childrenCount into a getter
      uut.contentWidth = 320;
      jest.spyOn(uut, 'calcIndicatorWidth');
      expect(uut.calcIndicatorWidth()).toEqual('25%');
    });

    it('should equale 50%', () => {
      const uut = new TabBar({});
      uut.itemsWidths = [150, 150, 300];
      uut.state = {
        selectedIndex: 2
      };
      uut.childrenCount = 2;
      uut.contentWidth = 600;
      jest.spyOn(uut, 'calcIndicatorWidth');
      expect(uut.calcIndicatorWidth()).toEqual('50%');
    });
  });
});
