import {AppRegistry, View} from 'react-native';
import React from 'react';
import KeyboardRegistry from '../KeyboardRegistry';

describe('KeyboardRegistry - components', () => {
  const mockComponent = 'test_component';
  const anotherMockComponent = 'test_component2';
  const MockElement = React.createElement(View, [], ['Hello world']);
  const AnotherMockElement = React.createElement(View, [], ['Hello world again!']);
  const mockGenerator = () => MockElement;
  const anotherMockGenerator = () => AnotherMockElement;

  beforeEach(() => {
    AppRegistry.registerComponent = jest.fn(AppRegistry.registerComponent);
    console.error = jest.fn();
  });

  it('should register the component in the keyboard registry', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator);
    expect(KeyboardRegistry.getKeyboard(mockComponent)).toEqual(MockElement);
  });

  it('should register the component in the App Registry as well', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator);

    expect(AppRegistry.registerComponent).toHaveBeenCalledTimes(1);
    expect(AppRegistry.registerComponent.mock.calls[0][0]).toEqual(mockComponent);
    expect(AppRegistry.registerComponent.mock.calls[0][1]).toEqual(mockGenerator);
  });

  it('should fail if generator is not provided and produce an error', () => {
    KeyboardRegistry.registerKeyboard(mockComponent);
    expect(AppRegistry.registerComponent).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should only allow to register a generator function and produce an error', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, MockElement);
    expect(AppRegistry.registerComponent).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should produce an error if component was not and return undefined', () => {
    const res = KeyboardRegistry.getKeyboard('not_existing_component');
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(res).toBe(undefined);
  });

  it('should get all keyboards, id of the keyboard included as a param', () => {
    const mockParams = {icon: 5, title: 'mock title'};
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator, mockParams);
    const keyboards = KeyboardRegistry.getAllKeyboards();
    expect(keyboards).toEqual([{id: mockComponent, ...mockParams}]);
  });

  it('should get specific keyboards by demand', () => {
    const mockParams1 = {icon: 5, title: 'mock title'};
    const mockParams2 = {icon: 6, title: 'mock title2'};
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator, mockParams1);
    KeyboardRegistry.registerKeyboard(anotherMockComponent, anotherMockGenerator, mockParams2);

    let keyboards = KeyboardRegistry.getKeyboards([mockComponent]);
    expect(keyboards).toEqual([{id: mockComponent, ...mockParams1}]);

    keyboards = KeyboardRegistry.getKeyboards([anotherMockComponent]);
    expect(keyboards).toEqual([{id: anotherMockComponent, ...mockParams2}]);

    keyboards = KeyboardRegistry.getKeyboards([mockComponent, anotherMockComponent]);
    expect(keyboards).toEqual([{id: mockComponent, ...mockParams1}, {id: anotherMockComponent, ...mockParams2}]);

    keyboards = KeyboardRegistry.getKeyboards(['not_existing']);
    expect(keyboards).toEqual([]);

    keyboards = KeyboardRegistry.getKeyboards(['not_existing', mockComponent]);
    expect(keyboards).toEqual([{id: mockComponent, ...mockParams1}]);

    keyboards = KeyboardRegistry.getKeyboards([]);
    expect(keyboards).toEqual([]);

    keyboards = KeyboardRegistry.getKeyboards();
    expect(keyboards).toEqual([]);
  });

  it('should get specific keyboards by order', () => {
    KeyboardRegistry.registerKeyboard(mockComponent, mockGenerator);
    KeyboardRegistry.registerKeyboard(anotherMockComponent, anotherMockGenerator);

    const keyboards = KeyboardRegistry.getKeyboards([anotherMockComponent, mockComponent]);
    expect(keyboards).toEqual([{id: anotherMockComponent}, {id: mockComponent}]);
  });
});

describe('KeyboardRegistry - listeners', () => {
  const mockId = 'a_listener';
  const mockCallback = () => {};
  const mockArgs = {param1: '1', param2: '2'};

  beforeEach(() => {
    KeyboardRegistry.eventEmitter = {
      listenOn: jest.fn(),
      emitEvent: jest.fn(),
      removeListeners: jest.fn()
    };
  });

  it('should listen', () => {
    KeyboardRegistry.addListener(mockId, mockCallback);
    expect(KeyboardRegistry.eventEmitter.listenOn).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.listenOn.mock.calls[0][0]).toEqual(mockId);
    expect(KeyboardRegistry.eventEmitter.listenOn.mock.calls[0][1]).toEqual(mockCallback);
  });

  it('should notify', () => {
    KeyboardRegistry.notifyListeners(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual(mockId);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual(mockArgs);
  });

  it('should remove', () => {
    KeyboardRegistry.removeListeners(mockId);
    expect(KeyboardRegistry.eventEmitter.removeListeners.mock.calls[0][0]).toEqual(mockId);
  });

  it('should notify when calling onItemSelected with dedicated onItemSelected id', () => {
    KeyboardRegistry.onItemSelected(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual(`${mockId}.onItemSelected`);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual(mockArgs);
  });

  it('should notify when calling requestShowKeyboard with the keyboard id', () => {
    KeyboardRegistry.requestShowKeyboard(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual('onRequestShowKeyboard');
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual({keyboardId: mockId});
  });

  it('should notify when calling requestShowKeyboard with the keyboard id', () => {
    KeyboardRegistry.toggleExpandedKeyboard(mockId, mockArgs);
    expect(KeyboardRegistry.eventEmitter.emitEvent).toHaveBeenCalledTimes(1);
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][0]).toEqual('onToggleExpandedKeyboard');
    expect(KeyboardRegistry.eventEmitter.emitEvent.mock.calls[0][1]).toEqual({keyboardId: mockId});
  });
});
