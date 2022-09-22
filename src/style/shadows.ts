import {ShadowStyleIOS} from 'react-native';
import _ from 'lodash';
import Colors from './colors';

type Shadow = {top?: ShadowStyleIOS; bottom?: ShadowStyleIOS} & ShadowStyleIOS;

const isDark = Colors.getScheme() === 'dark';

const Shadows = {
  sh10: {
    top: {
      shadowColor: isDark ? 'transparent' : Colors.grey40,
      shadowOpacity: 0.18,
      shadowRadius: 5,
      shadowOffset: {height: -1, width: 0},
      elevation: isDark ? 0 : 2
    },
    bottom: {
      shadowColor: isDark ? 'transparent' : Colors.grey40,
      shadowOpacity: 0.18,
      shadowRadius: 5,
      shadowOffset: {height: 1, width: 0},
      elevation: isDark ? 0 : 2
    }
  },
  sh20: {
    top: {
      shadowColor: isDark ? 'transparent' : Colors.grey30,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: {height: -2, width: 0},
      elevation: isDark ? 0 : 3
    },
    bottom: {
      shadowColor: isDark ? 'transparent' : Colors.grey30,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: {height: 2, width: 0},
      elevation: isDark ? 0 : 3
    }
  },
  sh30: {
    top: {
      shadowColor: isDark ? 'transparent' : Colors.grey30,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: {height: -5, width: 0},
      elevation: isDark ? 0 : 4
    },
    bottom: {
      shadowColor: isDark ? 'transparent' : Colors.grey30,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: {height: 5, width: 0},
      elevation: isDark ? 0 : 4
    }
  },
  /* Old Presets */
  white10: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.04, shadowRadius: 13.5},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.09, shadowRadius: 2, shadowOffset: {height: 2, width: 0}}
  },
  white20: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.06, shadowRadius: 15},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.04, shadowRadius: 3, shadowOffset: {height: 3, width: 0}}
  },
  white30: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.05, shadowRadius: 12},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.06, shadowRadius: 4.5, shadowOffset: {height: 4, width: 0}}
  },
  white40: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.06, shadowRadius: 18.5},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.07, shadowRadius: 8.5, shadowOffset: {height: 5, width: 0}}
  },
  grey10: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.02, shadowRadius: 13.5},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.03, shadowRadius: 2, shadowOffset: {height: 2, width: 0}}
  },
  grey20: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.03, shadowRadius: 15},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.02, shadowRadius: 3, shadowOffset: {height: 2.5, width: 0}}
  },
  grey30: {
    top: {shadowColor: Colors.grey10, shadowOpacity: 0.04, shadowRadius: 3.5, shadowOffset: {height: 3, width: 0}},
    bottom: {shadowColor: Colors.grey20, shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: {height: 7, width: 0}}
  },
  grey40: {
    top: {shadowColor: Colors.grey10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
    bottom: {shadowColor: Colors.grey20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}}
  },
  // TODO: We should remove dark presets eventually in favor of grey presets (after completing migration properly)
  dark10: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.02, shadowRadius: 13.5},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.03, shadowRadius: 2, shadowOffset: {height: 2, width: 0}}
  },
  dark20: {
    top: {shadowColor: Colors.grey20, shadowOpacity: 0.03, shadowRadius: 15},
    bottom: {shadowColor: Colors.grey10, shadowOpacity: 0.02, shadowRadius: 3, shadowOffset: {height: 2.5, width: 0}}
  },
  dark30: {
    top: {shadowColor: Colors.grey10, shadowOpacity: 0.04, shadowRadius: 3.5, shadowOffset: {height: 3, width: 0}},
    bottom: {shadowColor: Colors.grey20, shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: {height: 7, width: 0}}
  },
  dark40: {
    top: {shadowColor: Colors.grey10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
    bottom: {shadowColor: Colors.grey20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}}
  },

  /**
   * Load custom set of shadows
   * arguments:
   * shadows - map of keys and values
   * e.g
   * grey40: {
   *   top: {shadowColor: Colors.grey10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
   *   bottom: {shadowColor: Colors.grey20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}},
   * }
   */
  loadShadows(shadows: Dictionary<Shadow>) {
    _.forEach(shadows, (value, key) => {
      //@ts-ignore
      this[key] = value;
    });
  }
};

type customPresets = Record<string, Shadow>;

export default Shadows as typeof Shadows & customPresets;
