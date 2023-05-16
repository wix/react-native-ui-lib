import {default as Constants, updateConstants, _reset} from '../Constants';

describe('Constants', () => {
  beforeEach(() => {
    _reset();
  });

  describe('Breakpoints and Page Margins', () => {
    it('getPageMargins without init should return 0 and trigger a warn', () => {
      const warn = console.warn;
      console.warn = jest.fn();
      expect(Constants.getPageMargins()).toBe(0);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith('UILib breakpoints must be set via setBreakpoints before using getPageMargins');
      console.warn = warn;
    });

    it('getPageMargins with one breakpoint', () => {
      const original = {
        screen: {width: Constants.screenWidth, height: Constants.screenHeight},
        window: {width: Constants.windowWidth, height: Constants.windowHeight}
      };
      updateConstants({screen: {width: 50, height: 50}, window: {width: 50, height: 50}});
      Constants.setBreakpoints([{breakpoint: 100, pageMargin: 5}]);
      expect(Constants.getPageMargins()).toBe(0);
      updateConstants(original);
      expect(Constants.getPageMargins()).toBe(5);
    });

    it('getPageMargins with one breakpoint and a default', () => {
      const original = {
        screen: {width: Constants.screenWidth, height: Constants.screenHeight},
        window: {width: Constants.windowWidth, height: Constants.windowHeight}
      };
      updateConstants({screen: {width: 50, height: 50}, window: {width: 50, height: 50}});
      Constants.setBreakpoints([{breakpoint: 100, pageMargin: 5}], {defaultMargin: 3});
      expect(Constants.getPageMargins()).toBe(3);
      updateConstants(original);
      expect(Constants.getPageMargins()).toBe(5);
    });

    it('getPageMargins with three breakpoints', () => {
      const original = {
        screen: {width: Constants.screenWidth, height: Constants.screenHeight},
        window: {width: Constants.windowWidth, height: Constants.windowHeight}
      };
      updateConstants({screen: {width: 50, height: 50}, window: {width: 50, height: 50}});
      Constants.setBreakpoints([
        {breakpoint: 100, pageMargin: 5},
        {breakpoint: 1000, pageMargin: 10}
      ]);
      expect(Constants.getPageMargins()).toBe(0);
      updateConstants({screen: {width: 1200, height: 1200}, window: {width: 1200, height: 1200}});
      expect(Constants.getPageMargins()).toBe(10);
      updateConstants(original);
      expect(Constants.getPageMargins()).toBe(5);
    });

    it('getPageMargins with three breakpoints and a default', () => {
      const original = {
        screen: {width: Constants.screenWidth, height: Constants.screenHeight},
        window: {width: Constants.windowWidth, height: Constants.windowHeight}
      };
      updateConstants({screen: {width: 50, height: 50}, window: {width: 50, height: 50}});
      Constants.setBreakpoints([
        {breakpoint: 100, pageMargin: 5},
        {breakpoint: 1000, pageMargin: 10}
      ],
      {defaultMargin: 3});
      expect(Constants.getPageMargins()).toBe(3);
      updateConstants({screen: {width: 1200, height: 1200}, window: {width: 1200, height: 1200}});
      expect(Constants.getPageMargins()).toBe(10);
      updateConstants(original);
      expect(Constants.getPageMargins()).toBe(5);
    });

    it('setBreakpoints should arrange input in order', () => {
      const original = {
        screen: {width: Constants.screenWidth, height: Constants.screenHeight},
        window: {width: Constants.windowWidth, height: Constants.windowHeight}
      };
      updateConstants({screen: {width: 50, height: 50}, window: {width: 50, height: 50}});
      Constants.setBreakpoints([
        {breakpoint: 1000, pageMargin: 10},
        {breakpoint: 100, pageMargin: 5}
      ]);
      expect(Constants.getPageMargins()).toBe(0);
      updateConstants({screen: {width: 1200, height: 1200}, window: {width: 1200, height: 1200}});
      expect(Constants.getPageMargins()).toBe(10);
      updateConstants(original);
      expect(Constants.getPageMargins()).toBe(5);
    });
  });
});
