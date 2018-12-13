import _ from 'lodash';


/** Definitions */
const definitions = {
  basicListEntrance: {
    from: {opacity: 0, translateY: 20},
    to: {opacity: 1, translateY: 0},
  }, 
  cardEntrance: {
    from: {opacity: 0, translateY: 40},
    to: {opacity: 1, translateY: 0},
  },
};

class AnimatableManager {
  loadCustomDefinitions(costumDefinitions) {
    return {
      ...definitions,
      ...costumDefinitions,
    };
  }

  /** Presets */
  // Commons
  getFadeIn() {
    return {
      animation: 'fadeIn',
      duration: 300,
      easing: 'ease-out-quint',
      useNativeDriver: true,
    };
  }

  // Components
  getDialogAnimationProps(options) {
    return {
      animation: 'slideInUp',
      duration: 400,
      useNativeDriver: true,
      ...options,
    };
  }

  getCardEntranceAnimationProps(index) {
    return {
      animation: 'cardEntrance',
      duration: 600,
      delay: 10 + ((Number(index) % 12) * 100),
      easing: 'ease-out-quint',
      useNativeDriver: true,
    };
  }

  getCardFadeInAnimationProps() {
    return this.getFadeIn();
  }

  getCardAddingAnimationProps(index, options) {
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

  getActionSheetAnimationProps() {
    return {
      animation: 'slideInUp',
      duration: 600,
      easing: 'ease-out-quint',
    };
  }

  getActionSheetContainerAnimationProps() {
    return this.getFadeIn();
  }

  // Lists (Screens)
  getListEntranceAnimationProps(id) {
    return {
      animation: 'basicListEntrance',
      duration: 500,
      delay: 10 + ((Number(id) % 12) * 40),
      easing: 'ease-out-quint',
    };
  }

  getListFadeInAnimationProps() {
    return {
      animation: 'fadeIn',
      easing: 'ease-out-expo',
      duration: 1000,
      useNativeDriver: true,
    };
  }

  getListLeftFadeInAnimationProps() {
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
