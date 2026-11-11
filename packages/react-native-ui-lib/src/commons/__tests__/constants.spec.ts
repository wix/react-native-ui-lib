import {default as Constants, updateConstants, _reset} from '../Constants';

describe('Constants', () => {
  beforeEach(() => {
    _reset();
  });

  describe('Breakpoints and Page Margins', () => {
    it('getPageMargins without init should return 0', () => {
      expect(Constants.getPageMargins()).toBe(0);
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

  describe('isLiquidGlass', () => {
    const loadConstants = (os: string, version: number | string) => {
      let constants: typeof Constants;
      jest.isolateModules(() => {
        const {Platform} = require('react-native');
        const original = {OS: Platform.OS, Version: Platform.Version};
        Object.defineProperty(Platform, 'OS', {value: os, configurable: true, writable: true});
        Object.defineProperty(Platform, 'Version', {value: version, configurable: true, writable: true});
        constants = require('../Constants').default;
        Object.defineProperty(Platform, 'OS', {value: original.OS, configurable: true, writable: true});
        Object.defineProperty(Platform, 'Version', {value: original.Version, configurable: true, writable: true});
      });
      return constants!;
    };

    it('is on by default on iOS 26 and later', () => {
      expect(loadConstants('ios', '26.0').isLiquidGlass).toBe(true);
    });

    it('can be turned off and back on by apps that opt out of Liquid Glass', () => {
      const constants = loadConstants('ios', '26.0');
      constants.isLiquidGlass = false;
      expect(constants.isLiquidGlass).toBe(false);
      constants.isLiquidGlass = true;
      expect(constants.isLiquidGlass).toBe(true);
    });

    it('stays off below iOS 26', () => {
      const constants = loadConstants('ios', '18.5');
      expect(constants.isLiquidGlass).toBe(false);
      constants.isLiquidGlass = true;
      expect(constants.isLiquidGlass).toBe(false);
    });
  });
});
