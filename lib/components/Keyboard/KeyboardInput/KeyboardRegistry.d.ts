import EventEmitterManager from './utils/EventEmitterManager';
/**
 * @description: used for registering keyboards and performing certain actions on the keyboards.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardAccessory/demoKeyboards.js
 */
export default class KeyboardRegistry {
    static displayName: string;
    static registeredKeyboards: {
        [key: string]: any;
    };
    static eventEmitter: EventEmitterManager;
    /**
     * Register a new keyboard.
     * componentID (string) - the ID of the keyboard.
     * generator (function) - a function for the creation of the keyboard.
     * params (object) - to be returned when using other methods (i.e. getKeyboards and getAllKeyboards).
     */
    static registerKeyboard: (componentID: string, generator: Function, params?: {}) => void;
    /**
     * Get a specific keyboard
     * componentID (string) - the ID of the keyboard.
     */
    static getKeyboard: (componentID: string) => any;
    /**
     * Get keyboards by IDs
     * componentIDs (string[]) - the ID of the keyboard.
     */
    static getKeyboards: (componentIDs?: never[]) => any[];
    /**
     * Get all keyboards
     */
    static getAllKeyboards: () => any[];
    /**
     * Add a listener for a callback.
     * globalID (string) - ID that includes the componentID and the event name
     *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
     * callback (function) - the callback to be called when the said event happens
     */
    static addListener: (globalID: string, callback: Function) => void;
    /**
     * Notify that an event has occurred.
     * globalID (string) - ID that includes the componentID and the event name
     *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
     * args (object) - data to be sent to the listener.
     */
    static notifyListeners: (globalID: string, args: any) => void;
    /**
     * Remove a listener for a callback.
     * globalID (string) - ID that includes the componentID and the event name
     *                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
     */
    static removeListeners: (globalID: string) => void;
    /**
     * Default event to be used for when an item on the keyboard has been pressed.
     * componentID (string) - the ID of the keyboard.
     * args (object) - data to be sent to the listener.
     */
    static onItemSelected: (componentID: string, args: any) => void;
    /**
     * Request to show the keyboard
     * componentID (string) - the ID of the keyboard.
     */
    static requestShowKeyboard: (componentID: string) => void;
    /**
     * @deprecated
     * iOS only (experimental)
     * Call to make the keyboard full screen
     * componentID (string) - the ID of the keyboard.
     */
    static toggleExpandedKeyboard: (componentID: string) => void;
}
