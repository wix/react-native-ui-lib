import _ from 'lodash';
import * as Animatable from 'react-native-animatable';


/** Animations Definitions */
const definitions = {
  itemEntrance: {
    from: {opacity: 0, translateY: 40},
    to: {opacity: 1, translateY: 0},
  },
};

const presets = {
  slideInUp: {
    animation: 'slideInUp',
    easing: 'ease-out-quint',
    duration: 500,
    useNativeDriver: true,
  },
  slideInDown: {
    animation: 'slideInDown',
    easing: 'ease-out-quint',
    duration: 500,
    useNativeDriver: true,
  },
  fadeIn: {
    animation: 'fadeIn',
    easing: 'ease-out-quint',
    duration: 300,
    useNativeDriver: true,
  },
  fadeInRight: {
    animation: 'fadeInRight',
    easing: 'ease-out-expo',
    duration: 500,
    useNativeDriver: true,
  },
};

class AnimatableManager {
  constructor() {
    this.loadAnimationDefinitions(definitions);
    this.presets = presets;
  }

  loadAnimationPresets(animationPresets) {
    if (animationPresets) {
      this.presets = Object.assign(presets, animationPresets);
    }
  }

  // NOTE: Should be sent as a parameter to Animatable.initializeRegistryWithDefinitions() call
  loadAnimationDefinitions(animationDefinitions) {
    if (animationDefinitions) {
      Animatable.initializeRegistryWithDefinitions(animationDefinitions); // Make available globally in uilib
      const allDefinitions = Object.assign(definitions, animationDefinitions);
      this.animations = getObjectMap(allDefinitions);
    }
    return definitions;
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
    definition[`slideIn_${suffix}`] = {
      from: {height: 0},
      to: {height},
    };
    definition[`slideOut_${suffix}`] = {
      from: {height},
      to: {height: 0},
    };

    this.loadAnimationDefinitions(definition);
  }

  /** Tools */
  getRandomDelay(delays = [20, 120, 220], options) {
    return {
      animation: 'fadeInLeft',
      easing: 'ease-out-expo',
      duration: 600,
      delay: _.sample(delays),
      useNativeDriver: true,
      ...options,
    };
  }

  getEntranceByIndex = (index = 0, options) => {
    return {
      animation: 'itemEntrance',
      easing: 'ease-out-quint',
      duration: 600,
      delay: 10 + ((Number(index) % 12) * 100),
      useNativeDriver: true,
      ...options,
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

function getObjectMap(object) {
  const map = {};
  _.forEach(Object.keys(object), (key) => {
    map[key] = `${key}`;
  });
  return map;
}

export default new AnimatableManager();
