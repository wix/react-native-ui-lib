import {AppRegistry} from 'react-native';
import _ from 'lodash';
import EventEmitterManager from './utils/EventEmitterManager';

/*
 * Tech debt: how to deal with multiple registries in the app?
 */

const getKeyboardsWithIDs = keyboardIDs => {
  return keyboardIDs.map(keyboardId => {
    return {
      id: keyboardId,
      ...KeyboardRegistry.registeredKeyboards[keyboardId].params
    };
  });
};

export default class KeyboardRegistry {
  static registeredKeyboards = {};
  static eventEmitter = new EventEmitterManager();

  static registerKeyboard = (componentID, generator, params = {}) => {
    if (!_.isFunction(generator)) {
      console.error(`KeyboardRegistry.registerKeyboard: ${componentID} you must register a generator function`);
      return;
    }
    KeyboardRegistry.registeredKeyboards[componentID] = {generator, params, componentID};
    AppRegistry.registerComponent(componentID, generator);
  };

  static getKeyboard = componentID => {
    const res = KeyboardRegistry.registeredKeyboards[componentID];
    if (!res || !res.generator) {
      console.error(`KeyboardRegistry.getKeyboard: ${componentID} used but not yet registered`);
      return undefined;
    }
    return res.generator();
  };

  static getKeyboards = (componentIDs = []) => {
    const validKeyboardIDs = _.intersection(componentIDs, Object.keys(KeyboardRegistry.registeredKeyboards));
    return getKeyboardsWithIDs(validKeyboardIDs);
  };

  static getAllKeyboards = () => {
    return getKeyboardsWithIDs(Object.keys(KeyboardRegistry.registeredKeyboards));
  };

  static addListener = (globalID, callback) => {
    KeyboardRegistry.eventEmitter.listenOn(globalID, callback);
  };

  static notifyListeners = (globalID, args) => {
    KeyboardRegistry.eventEmitter.emitEvent(globalID, args);
  };

  static removeListeners = globalID => {
    KeyboardRegistry.eventEmitter.removeListeners(globalID);
  };

  static onItemSelected = (globalID, args) => {
    KeyboardRegistry.notifyListeners(`${globalID}.onItemSelected`, args);
  };

  static requestShowKeyboard = globalID => {
    KeyboardRegistry.notifyListeners('onRequestShowKeyboard', {keyboardId: globalID});
  };

  /**
   * iOS only
   */
  static toggleExpandedKeyboard = globalID => {
    KeyboardRegistry.notifyListeners('onToggleExpandedKeyboard', {keyboardId: globalID});
  };
}
