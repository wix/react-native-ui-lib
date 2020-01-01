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

/**
 * @description: used for registering keyboards and performing certain actions on the keyboards.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/demoKeyboards.js
 */
export default class KeyboardRegistry {
  static displayName = 'KeyboardRegistry';
  static registeredKeyboards = {};
  static eventEmitter = new EventEmitterManager();

  /**
   * Register a new keyboard.
   * componentID (string) - the ID of the keyboard.
   * generator (function) - a function for the creation of the keyboard.
   * params (object) - to be returned when using other methods (i.e. getKeyboards and getAllKeyboards).
   */
  static registerKeyboard = (componentID, generator, params = {}) => {
    if (!_.isFunction(generator)) {
      console.error(`KeyboardRegistry.registerKeyboard: ${componentID} you must register a generator function`);
      return;
    }
    KeyboardRegistry.registeredKeyboards[componentID] = {generator, params, componentID};
    AppRegistry.registerComponent(componentID, generator);
  };

  /**
   * Get a specific keyboard
   * componentID (string) - the ID of the keyboard.
   */
  static getKeyboard = componentID => {
    const res = KeyboardRegistry.registeredKeyboards[componentID];
    if (!res || !res.generator) {
      console.error(`KeyboardRegistry.getKeyboard: ${componentID} used but not yet registered`);
      return undefined;
    }
    return res.generator();
  };

  /**
   * Get keyboards by IDs
   * componentIDs (string[]) - the ID of the keyboard.
   */
  static getKeyboards = (componentIDs = []) => {
    const validKeyboardIDs = _.intersection(componentIDs, Object.keys(KeyboardRegistry.registeredKeyboards));
    return getKeyboardsWithIDs(validKeyboardIDs);
  };

  /**
   * Get all keyboards
   */
  static getAllKeyboards = () => {
    return getKeyboardsWithIDs(Object.keys(KeyboardRegistry.registeredKeyboards));
  };

  /**
   * Add a listener for a callback.
   * globalID (string) - ID that includes the componentID and the event name
   *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
   * callback (function) - the callback to be called when the said event happens
   */
  static addListener = (globalID, callback) => {
    KeyboardRegistry.eventEmitter.listenOn(globalID, callback);
  };

  /**
   * Notify that an event has occurred.
   * globalID (string) - ID that includes the componentID and the event name
   *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
   * args (object) - data to be sent to the listener.
   */
  static notifyListeners = (globalID, args) => {
    KeyboardRegistry.eventEmitter.emitEvent(globalID, args);
  };

  /**
   * Remove a listener for a callback.
   * globalID (string) - ID that includes the componentID and the event name
   *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
   */
  static removeListeners = globalID => {
    KeyboardRegistry.eventEmitter.removeListeners(globalID);
  };

  /**
   * Default event to be used for when an item on the keyboard has been pressed.
   * componentID (string) - the ID of the keyboard.
   * args (object) - data to be sent to the listener.
   */
  static onItemSelected = (componentID, args) => {
    KeyboardRegistry.notifyListeners(`${componentID}.onItemSelected`, args);
  };

  /**
   * Request to show the keyboard
   * componentID (string) - the ID of the keyboard.
   */
  static requestShowKeyboard = componentID => {
    KeyboardRegistry.notifyListeners('onRequestShowKeyboard', {keyboardId: componentID});
  };

  /**
   * iOS only (experimental)
   * Call to make the keyboard full screen
   * componentID (string) - the ID of the keyboard.
   */
  static toggleExpandedKeyboard = componentID => {
    KeyboardRegistry.notifyListeners('onToggleExpandedKeyboard', {keyboardId: componentID});
  };
}
