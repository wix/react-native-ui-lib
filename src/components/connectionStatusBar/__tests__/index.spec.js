import _ from 'lodash';
import ConnectionStatusBar from '../index';

describe('ConnectionStatusBar', () => {
  let uut;
  beforeEach(() => {
    uut = new ConnectionStatusBar({});
    ConnectionStatusBar.unregisterGlobalOnConnectionLost();
  });

  describe('registerGlobalOnConnectionLost', () => {
    it('should register a callback for when connection is lost', () => {
      const callback = jest.fn();
      expect(ConnectionStatusBar.onConnectionLost).toBe(undefined);
      ConnectionStatusBar.registerGlobalOnConnectionLost(callback);
      expect(ConnectionStatusBar.onConnectionLost).toBe(callback);
      ConnectionStatusBar.unregisterGlobalOnConnectionLost();
      expect(ConnectionStatusBar.onConnectionLost).toBe(undefined);
    });

    it('should call onConnectionLost callback when connection state changed from connected to disconnected', () => {
      const callback = jest.fn();
      ConnectionStatusBar.registerGlobalOnConnectionLost(callback);
      _.set(uut, 'state.isConnected', true);

      uut.onConnectionChange({type: 'none'});

      expect(callback).toHaveBeenCalled();
    });

    it('should not call onConnectionLost callback when connection state changed from disconnected to connected', () => {
      const callback = jest.fn();
      ConnectionStatusBar.registerGlobalOnConnectionLost(callback);
      _.set(uut, 'state.isConnected', false);

      uut.onConnectionChange({type: 'wifi'});

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
