import _ from 'lodash';
import * as Animatable from 'react-native-animatable';


/** Animations Definitions */
const definitions = {
  listEntrance: {
    from: {opacity: 0, translateY: 20},
    to: {opacity: 1, translateY: 0},
  }, 
  cardEntrance: {
    from: {opacity: 0, translateY: 40},
    to: {opacity: 1, translateY: 0},
  },
};

class AnimatableManager {
  constructor() {
    this.loadCustomDefinitions(definitions);
  }

  loadCustomDefinitions(costumDefinitions) {
    if (costumDefinitions) {
      Animatable.initializeRegistryWithDefinitions(costumDefinitions);
    }
  }

  /** Presets */
  // Commons
  getFadeInPreset(options) {
    return {
      animation: 'fadeIn',
      duration: 300,
      easing: 'ease-out-quint',
      useNativeDriver: true,
      ...options,
    };
  }

  getSlideInUpPreset(options) {
    return {
      animation: 'slideInUp',
      duration: 500,
      easing: 'ease-out-quint',
      useNativeDriver: true,
      ...options,
    };
  }


  // Components
  // 1- Card
  getCardEntrancePreset(index = 0) {
    return {
      animation: 'cardEntrance',
      duration: 600,
      delay: 10 + ((Number(index) % 12) * 100),
      easing: 'ease-out-quint',
      useNativeDriver: true,
    };
  }

  getCardAddingPreset(index = 0, options) {
    if (index === 0) {
      return {
        animation: 'zoomIn',
        duration: 200,
        delay: 200,
        easing: 'linear',
        useNativeDriver: true,
        ...options,
      };
    }
    return {
      animation: 'slideInDown',
      duration: 600,
      easing: 'ease-out-quint',
      useNativeDriver: true,
      ...options,
    };
  }

  // 2- List
  getListEntrancePreset(index) {
    return {
      animation: 'listEntrance',
      duration: 500,
      delay: 10 + ((Number(index) % 12) * 40),
      easing: 'ease-out-quint',
      useNativeDriver: true,
    };
  }

  getListFadeInPreset() {
    return {
      animation: 'fadeIn',
      easing: 'ease-out-expo',
      duration: 1000,
      useNativeDriver: true,
    };
  }

  getListFadeInLeftPreset() {
    return {
      animation: 'fadeInLeft',
      easing: 'ease-out-expo',
      duration: 600,
      delay: _.sample([20, 120, 220]),
      useNativeDriver: true,
    };
  }

}

export default new AnimatableManager();
