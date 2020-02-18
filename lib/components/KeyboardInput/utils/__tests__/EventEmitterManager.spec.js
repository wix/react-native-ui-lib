const EventEmitterManager = require('../EventEmitterManager').default;

let EventEmitter;

describe('EventEmitterManager tests', () => {
  let mockCallback;
  let otherMockCallback;

  beforeEach(() => {
    mockCallback = jest.fn();
    otherMockCallback = jest.fn();
    EventEmitter = new EventEmitterManager();
  });

  it('should have a EventEmitterManager default instance', () => {
    expect(EventEmitterManager).toBeDefined();
    expect(EventEmitterManager).not.toBeNull();
  });

  it('should register a listener and receive a callback', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();

    EventEmitter.emitEvent('MyEvent');

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith({});
  });

  it('should register a listener and receive a callback with params', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();

    EventEmitter.emitEvent('MyEvent', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith({param1: 'param1', param2: 'param2'});
  });

  it('should receive only registered events callbacks', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();

    EventEmitter.emitEvent('MyEvent2', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should receive multiple registered events with the same callback', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);
    EventEmitter.listenOn('MyEvent2', mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();

    EventEmitter.emitEvent('MyEvent', {param1: 'param1', param2: 'param2'});
    EventEmitter.emitEvent('MyEvent2', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should receive multiple registered events with different callbacks', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);
    EventEmitter.listenOn('MyEvent2', otherMockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
    expect(otherMockCallback).not.toHaveBeenCalled();

    EventEmitter.emitEvent('MyEvent', {param1: 'param1', param2: 'param2'});
    EventEmitter.emitEvent('MyEvent2', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(otherMockCallback).toHaveBeenCalledTimes(1);
  });

  it('should receive multiple callbacks for the same event', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);
    EventEmitter.listenOn('MyEvent', otherMockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
    expect(otherMockCallback).not.toHaveBeenCalled();

    EventEmitter.emitEvent('MyEvent', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(otherMockCallback).toHaveBeenCalledTimes(1);
  });

  it('should remove listeners', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);
    EventEmitter.removeListeners('MyEvent');

    EventEmitter.emitEvent('MyEvent', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should do nothing when trying to emit an undefined or null even name', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);

    EventEmitter.emitEvent(undefined, {param1: 'param1', param2: 'param2'});
    EventEmitter.emitEvent(null, {param1: 'param1', param2: 'param2'});

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should ignore removing listeners without an event name', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);
    EventEmitter.removeListeners();

    EventEmitter.emitEvent('MyEvent', {param1: 'param1', param2: 'param2'});

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should not register the same callback for the same event', () => {
    EventEmitter.listenOn('MyEvent', mockCallback);
    EventEmitter.listenOn('MyEvent', mockCallback);
    expect(EventEmitter.handlerCallbacks.MyEvent.length).toBe(1);
  });
});
