import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
/** Animations Definitions */

const definitions = {
  itemEntrance: {
    from: {
      opacity: 0,
      translateY: 40
    },
    to: {
      opacity: 1,
      translateY: 0
    }
  },
  itemAddition: {
    from: {
      opacity: 0,
      scale: 0.6,
      translateY: -60
    },
    to: {
      opacity: 1,
      scale: 1,
      translateY: 0
    }
  },
  itemRemoval: {
    from: {
      opacity: 1,
      scale: 1,
      translateY: 0
    },
    to: {
      opacity: 0,
      scale: 0.6,
      translateY: -60
    }
  },
  listItemAddition: {
    from: {
      scaleY: 0.8,
      translateY: -40
    },
    to: {
      scaleY: 1,
      translateY: 0
    }
  }
};
const PRESETS = {
  slideInUp: {
    animation: 'slideInUp',
    easing: 'ease-out-quint',
    duration: 500,
    useNativeDriver: true
  },
  slideInDown: {
    animation: 'slideInDown',
    easing: 'ease-out-quint',
    duration: 500,
    useNativeDriver: true
  },
  fadeIn: {
    animation: 'fadeIn',
    duration: 300,
    useNativeDriver: true
  },
  fadeOut: {
    animation: 'fadeOut',
    duration: 300,
    useNativeDriver: true
  },
  fadeInRight: {
    animation: 'fadeInRight',
    easing: 'ease-out-expo',
    duration: 500,
    useNativeDriver: true
  }
};
/**
 * @description: Animatable animations and presets
 * @extendsnotes: To have access to uilib's animations, and load your custom animations (optional), call:
 * 'Animatable.initializeRegistryWithDefinitions(AnimatableManager.loadAnimationDefinitions(<OPTIONAL_CUSTOM_ANIMATION>));'
 * in your app entry point
 */

export class AnimatableManager {
  presets = PRESETS;

  constructor() {
    this.loadAnimationDefinitions(definitions);
  }

  loadAnimationPresets(animationPresets) {
    if (animationPresets) {
      this.presets = Object.assign(PRESETS, animationPresets);
    }
  } // NOTE: to load globally send as a parameter to Animatable.initializeRegistryWithDefinitions() call


  loadAnimationDefinitions(animationDefinitions) {
    if (animationDefinitions) {
      Animatable.initializeRegistryWithDefinitions(animationDefinitions); // Make available globally in uilib

      Object.assign(definitions, animationDefinitions);
      this.animations = getObjectMap(definitions);
    }

    return definitions;
  } // NOTE: to load globally send as a parameter to Animatable.initializeRegistryWithDefinitions() call


  loadSlideByHeightDefinitions(height, suffix) {
    const definition = {}; // bottom

    definition[`slideInUp_${suffix}`] = {
      from: {
        translateY: height
      },
      to: {
        translateY: 0
      }
    };
    definition[`slideOutDown_${suffix}`] = {
      from: {
        translateY: 0
      },
      to: {
        translateY: height
      }
    }; // top

    definition[`slideInDown_${suffix}`] = {
      from: {
        translateY: -height
      },
      to: {
        translateY: 0
      }
    };
    definition[`slideOutUp_${suffix}`] = {
      from: {
        translateY: 0
      },
      to: {
        translateY: -height
      }
    }; // relative

    definition[`slideIn_${suffix}`] = {
      from: {
        height: 0
      },
      to: {
        height
      }
    };
    definition[`slideOut_${suffix}`] = {
      from: {
        height
      },
      to: {
        height: 0
      }
    };
    return this.loadAnimationDefinitions(definition);
  }
  /** Tools */


  getRandomDelay(delays = [20, 120, 220], options) {
    return {
      animation: 'fadeInLeft',
      easing: 'ease-out-expo',
      duration: 600,
      delay: _.sample(delays),
      useNativeDriver: true,
      ...options
    };
  }

  getEntranceByIndex = (index = 0, options) => {
    return {
      animation: 'itemEntrance',
      easing: 'ease-out-quint',
      duration: 600,
      delay: 10 + Number(index) % 12 * 100,
      useNativeDriver: true,
      ...options
    };
  };

  getZoomInSlideDown(index = 0, options, zoomIndex = 0) {
    const {
      onAnimationEnd,
      ...others
    } = options;

    if (index === zoomIndex) {
      return {
        animation: 'itemAddition',
        easing: 'ease-out-quart',
        duration: 600,
        useNativeDriver: true,
        onAnimationEnd
      };
    }

    if (index > zoomIndex) {
      return {
        animation: 'slideInDown',
        easing: 'ease-out-quart',
        duration: 600,
        useNativeDriver: true,
        ...others
      };
    }
  }

  getSlideInSlideDown(index = 0, options, zoomIndex = 0) {
    const {
      onAnimationEnd,
      ...others
    } = options;

    if (index === zoomIndex) {
      return {
        animation: 'listItemAddition',
        easing: 'ease-out-quart',
        duration: 600,
        delay: 150,
        useNativeDriver: true,
        onAnimationEnd
      };
    }

    if (index > zoomIndex) {
      return {
        animation: 'slideInDown',
        easing: 'ease-out-quart',
        duration: 600,
        useNativeDriver: true,
        ...others
      };
    }
  }

}

function getObjectMap(object) {
  const map = {};

  _.forEach(Object.keys(object), key => {
    map[key] = `${key}`;
  });

  return map;
}

export default new AnimatableManager();