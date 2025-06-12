import _ from 'lodash';

export default class EventEmitterManager {
  handlerCallbacks: {[key: string]: Function[]} = {};
  constructor() {
    this.handlerCallbacks = {};
  }

  listenOn(eventName: string, handlerCallback: Function) {
    if (!this.handlerCallbacks[eventName]) {
      this.handlerCallbacks[eventName] = [];
    }
    if (_.indexOf(this.handlerCallbacks[eventName], handlerCallback) === -1) {
      this.handlerCallbacks[eventName].push(handlerCallback);
    }
  }

  emitEvent(eventName: string, params = {}) {
    if (this.handlerCallbacks[eventName]) {
      this.handlerCallbacks[eventName].forEach(callback => callback(params));
    }
  }

  removeListeners(eventName: string) {
    delete this.handlerCallbacks[eventName];
  }

  removeListener(eventName: string, listener: Function) {
    const handlers = this.handlerCallbacks[eventName];

    if (handlers) {
      handlers.forEach((handler, index) => {
        if (handler === listener) {
          handlers.splice(index, 1);
        }
      });
    }
  }
}
