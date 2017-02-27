import {Animated} from 'react-native';
import * as uut from '../../../src/commons/AnimationPresenter';

describe('common/AnimationPresenter', () => {

  describe('getAnimationStyle', () => {
    it('FADE_IN', () => {
      let animationStyle = {};
      const props = {animationType: 'FADE_IN'};
      const state = {
        enterProgress: new Animated.Value(0),
      };

      animationStyle = uut.getAnimationStyle(state, props);
      expect(stringifyAndParse(animationStyle)).toEqual({opacity: 0});

      state.enterProgress = new Animated.Value(100);
      animationStyle = uut.getAnimationStyle(state, props);
      expect(stringifyAndParse(animationStyle)).toEqual({opacity: 1});
    });

    it('FADE_IN_DOWN', () => {
      let animationStyle = {};
      const props = {animationType: 'FADE_IN_DOWN'};
      const state = {};
      state.enterProgress = new Animated.Value(0);

      animationStyle = uut.getAnimationStyle(state, props);
      expect(stringifyAndParse(animationStyle)).toEqual({opacity: 0, transform: [{translateY: -5}]});

      state.enterProgress = new Animated.Value(100);
      animationStyle = uut.getAnimationStyle(state, props);
      expect(stringifyAndParse(animationStyle)).toEqual({opacity: 1, transform: [{translateY: 0}]});
    });
    
    it('FADE_IN_UP', () => {
      let animationStyle = {};
      const props = {animationType: 'FADE_IN_UP'};
      const state = {};
      state.enterProgress = new Animated.Value(0);

      animationStyle = uut.getAnimationStyle(state, props);
      expect(stringifyAndParse(animationStyle)).toEqual({opacity: 0, transform: [{translateY: 5}]});

      state.enterProgress = new Animated.Value(100);
      animationStyle = uut.getAnimationStyle(state, props);
      expect(stringifyAndParse(animationStyle)).toEqual({opacity: 1, transform: [{translateY: 0}]});
    });
  });
});

function stringifyAndParse(animateValueObject) {
  return JSON.parse(JSON.stringify(animateValueObject));
}
