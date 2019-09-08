import _ from 'lodash';
import Colors from './colors';

const Shadows = {
  white10: {
    top: {shadowColor: Colors.dark20, shadowOpacity: 0.04, shadowRadius: 13.5},
    bottom: {shadowColor: Colors.dark10, shadowOpacity: 0.09, shadowRadius: 2, shadowOffset: {height: 2, width: 0}}
  },
  white20: {
    top: {shadowColor: Colors.dark20, shadowOpacity: 0.06, shadowRadius: 15},
    bottom: {shadowColor: Colors.dark10, shadowOpacity: 0.04, shadowRadius: 3, shadowOffset: {height: 3, width: 0}}
  },
  white30: {
    top: {shadowColor: Colors.dark20, shadowOpacity: 0.05, shadowRadius: 12},
    bottom: {shadowColor: Colors.dark10, shadowOpacity: 0.06, shadowRadius: 4.5, shadowOffset: {height: 4, width: 0}}
  },
  white40: {
    top: {shadowColor: Colors.dark20, shadowOpacity: 0.06, shadowRadius: 18.5},
    bottom: {shadowColor: Colors.dark10, shadowOpacity: 0.07, shadowRadius: 8.5, shadowOffset: {height: 5, width: 0}}
  },
  dark10: {
    top: {shadowColor: Colors.dark20, shadowOpacity: 0.02, shadowRadius: 13.5},
    bottom: {shadowColor: Colors.dark10, shadowOpacity: 0.03, shadowRadius: 2, shadowOffset: {height: 2, width: 0}}
  },
  dark20: {
    top: {shadowColor: Colors.dark20, shadowOpacity: 0.03, shadowRadius: 15},
    bottom: {shadowColor: Colors.dark10, shadowOpacity: 0.02, shadowRadius: 3, shadowOffset: {height: 2.5, width: 0}}
  },
  dark30: {
    top: {shadowColor: Colors.dark10, shadowOpacity: 0.04, shadowRadius: 3.5, shadowOffset: {height: 3, width: 0}},
    bottom: {shadowColor: Colors.dark20, shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: {height: 7, width: 0}}
  },
  dark40: {
    top: {shadowColor: Colors.dark10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
    bottom: {shadowColor: Colors.dark20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}}
  },

  /**
   * Load custom set of shadows
   * arguments:
   * shadows - map of keys and values
   * e.g
   * dark40: {
   *   top: {shadowColor: Colors.dark10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
   *   bottom: {shadowColor: Colors.dark20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}},
   * }
   */
  loadShadows(shadows) {
    _.forEach(shadows, (value, key) => {
      this[key] = value;
    });
  }
};

export default Shadows;
