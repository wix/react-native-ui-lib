import _ from 'lodash';

export default class EventEmitterManager {
  constructor() {
    this.handlerCallbacks = {};
  }

  listenOn(eventName, handlerCallback) {
    if (!this.handlerCallbacks[eventName]) {
      this.handlerCallbacks[eventName] = [];
    }
    if (_.indexOf(this.handlerCallbacks[eventName], handlerCallback) === -1) {
      this.handlerCallbacks[eventName].push(handlerCallback);
    }
  }

  emitEvent(eventName, params = {}) {
    if (this.handlerCallbacks[eventName]) {
      this.handlerCallbacks[eventName].forEach(callback => callback(params));
    }
  }

  removeListeners(eventName) {
    delete this.handlerCallbacks[eventName];
  }

  removeListener(eventName, listener) {
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
