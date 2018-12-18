import _ from 'lodash';
import * as Animatable from 'react-native-animatable';


/** Animations Definitions */
const definitions = {
  indexEntrance: {
    from: {opacity: 0, translateY: 40},
    to: {opacity: 1, translateY: 0},
  },
};

class AnimatableManager {
  constructor() {
    this.loadCustomDefinitions(definitions);
    this.animations = getAnimations();
  }

  loadCustomDefinitions(customDefinitions) {
    if (customDefinitions) {
      Animatable.initializeRegistryWithDefinitions(customDefinitions);
      this.updateDefinitions(customDefinitions);
    }
  }

  loadSlideByHeightDefinitions(height, suffix) {
    const definition = {};
    // bottom
    definition[`slideInUp_${suffix}`] = {
      from: {translateY: height},
      to: {translateY: 0},
    };
    definition[`slideOutDown_${suffix}`] = {
      from: {translateY: 0},
      to: {translateY: height},
    };
    // top
    definition[`slideInDown_${suffix}`] = {
      from: {translateY: -height},
      to: {translateY: 0},
    };
    definition[`slideOutUp_${suffix}`] = {
      from: {translateY: 0},
      to: {translateY: -height},
    };
    // relative
    definition[`slideUp_${suffix}`] = {
      from: {height: 0},
      to: {height},
    };
    definition[`slideDown_${suffix}`] = {
      from: {height},
      to: {height: 0},
    };

    Animatable.initializeRegistryWithDefinitions(definition);
    this.updateDefinitions(definition);
  }

  updateDefinitions(newDefinitions) {
    Object.assign(definitions, newDefinitions);
    this.animations = getAnimations();
  }

  /** Presets */
  getSlideInUp(options) {
    return {
      animation: 'slideInUp',
      easing: 'ease-out-quint',
      duration: 500,
      useNativeDriver: true,
      ...options,
    };
  }

  getFadeIn(options) {
    return {
      animation: 'fadeIn',
      easing: 'ease-out-quint',
      duration: 300,
      useNativeDriver: true,
      ...options,
    };
  }

  getFadeInRight(options) {
    return {
      animation: 'fadeInRight',
      easing: 'ease-out-expo',
      duration: 500,
      useNativeDriver: true,
      ...options,
    };
  }

  getRandomDelayFadeInLeft(options, delays = [20, 120, 220]) {
    return {
      animation: 'fadeInLeft',
      easing: 'ease-out-expo',
      duration: 600,
      delay: _.sample(delays),
      useNativeDriver: true,
      ...options,
    };
  }

  getEntranceByIndex(animation, index = 0) {
    return {
      animation,
      easing: 'ease-out-quint',
      duration: 600,
      delay: 10 + ((Number(index) % 12) * 100),
      useNativeDriver: true,
    };
  }

  getZoomInSlideDown(index = 0, options) {
    const {onAnimationEnd, ...others} = options;
    if (index === 0) {
      return {
        animation: 'zoomIn',
        easing: 'linear',
        duration: 200,
        delay: 200,
        useNativeDriver: true,
        onAnimationEnd,
      };
    }
    return {
      animation: 'slideInDown',
      easing: 'ease-out-quint',
      duration: 600,
      useNativeDriver: true,
      ...others,
    };
  }
}

function getAnimations() {
  const animations = {};
  _.forEach(Object.keys(definitions), (key) => {
    animations[key] = `${key}`;
  });
  return animations;
}

export default new AnimatableManager();
