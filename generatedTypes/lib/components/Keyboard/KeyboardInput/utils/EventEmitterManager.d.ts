export default class EventEmitterManager {
    handlerCallbacks: {
        [key: string]: Function[];
    };
    constructor();
    listenOn(eventName: string, handlerCallback: Function): void;
    emitEvent(eventName: string, params?: {}): void;
    removeListeners(eventName: string): void;
    removeListener(eventName: string, listener: Function): void;
}
