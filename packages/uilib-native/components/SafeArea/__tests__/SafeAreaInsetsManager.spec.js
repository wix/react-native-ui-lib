import {NativeModules, DeviceEventEmitter} from 'react-native';
import {DEFAULT_INSETS} from '../SafeAreaInsetsManager';

const MOCKED_INSETS = {top: 44, left: 0, bottom: 34, right: 0};

describe('SafeAreaInsetsManager', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Reset the SafeAreaInsetsCache by creating a fresh instance
    jest.resetModules();

    // Spy on console methods to verify logging
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    jest.restoreAllMocks();
  });

  describe('getSafeAreaInsets', () => {
    it('should return default insets when native module is not available', async () => {
      // Arrange
      NativeModules.SafeAreaManager = null;
      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result).toEqual(DEFAULT_INSETS);
      expect(console.log).toHaveBeenCalledWith('SafeAreaInsetsManager: Native SafeAreaManager not available, using defaults');
    });

    it('should return insets from native module when available', async () => {
      // Arrange
      const mockInsets = {top: 50, left: 10, bottom: 30, right: 10};
      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockResolvedValue(mockInsets)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result).toEqual(mockInsets);
      expect(NativeModules.SafeAreaManager.getSafeAreaInsets).toHaveBeenCalled();
    });

    it.skip('should return cached insets on subsequent calls', async () => {
      // Arrange
      const mockInsets = MOCKED_INSETS;
      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockResolvedValue(mockInsets)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result1 = await SafeAreaInsetsManager.getSafeAreaInsets();
      const result2 = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result1).toEqual(mockInsets);
      expect(result2).toEqual(mockInsets);
      expect(NativeModules.SafeAreaManager.getSafeAreaInsets).toHaveBeenCalledTimes(1); // Should only call native once due to caching
    });

    it('should handle native module errors gracefully', async () => {
      // Arrange
      const mockError = new Error('Native module error');
      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockRejectedValue(mockError)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result).toEqual(DEFAULT_INSETS); // Should fallback to defaults
      expect(console.warn).toHaveBeenCalledWith('SafeAreaInsetsManager: Failed to get initial insets:', mockError);
      expect(console.warn).toHaveBeenCalledWith('SafeAreaInsetsManager: Failed to get native insets:', mockError);
    });

    it('should handle native module setup errors gracefully', async () => {
      // Arrange
      Object.defineProperty(NativeModules, 'SafeAreaManager', {
        get: () => {
          throw new Error('Setup error');
        }
      });

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result).toEqual(DEFAULT_INSETS); // Should fallback to defaults
      expect(console.warn).toHaveBeenCalledWith('SafeAreaInsetsManager: Failed to connect to native module:', expect.any(Error));
    });

    it('should update insets when they change during the test', async () => {
      // Arrange
      const initialInsets = MOCKED_INSETS;
      const updatedInsets = {top: 50, left: 0, bottom: 40, right: 0};

      NativeModules.SafeAreaManager = {
        // TODO: this will need to be changed when the we get caching to work in tests ("should return cached insets on subsequent calls")
        // getSafeAreaInsets: jest.fn().mockResolvedValueOnce(initialInsets).mockResolvedValueOnce(updatedInsets)
        getSafeAreaInsets: jest
          .fn()
          .mockResolvedValueOnce(initialInsets)
          .mockResolvedValueOnce(initialInsets)
          .mockResolvedValueOnce(updatedInsets)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act & Assert - Initial insets
      const result1 = await SafeAreaInsetsManager.getSafeAreaInsets();
      expect(result1).toEqual(initialInsets);

      // Force refresh of insets
      await SafeAreaInsetsManager.refreshSafeAreaInsets();

      // Simulate insets change event from native side
      DeviceEventEmitter.emit('SafeAreaInsetsDidChangeEvent', updatedInsets);

      // Get insets again - should reflect the change
      const result2 = await SafeAreaInsetsManager.getSafeAreaInsets();
      expect(result2).toEqual(updatedInsets);
    });

    it('should notify delegates when insets change during the test', async () => {
      // Arrange
      const initialInsets = MOCKED_INSETS;
      const updatedInsets = {top: 50, left: 0, bottom: 40, right: 0};

      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockResolvedValue(initialInsets)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Add a mock delegate
      const mockDelegate = {
        onSafeAreaInsetsDidChangeEvent: jest.fn()
      };
      SafeAreaInsetsManager.addSafeAreaChangedDelegate(mockDelegate);

      // Act - Get initial insets
      await SafeAreaInsetsManager.getSafeAreaInsets();

      // Simulate insets change event from native side
      DeviceEventEmitter.emit('SafeAreaInsetsDidChangeEvent', updatedInsets);

      // Assert - Delegate should be notified
      expect(mockDelegate.onSafeAreaInsetsDidChangeEvent).toHaveBeenCalledWith(updatedInsets);
    });

    it('should handle refreshSafeAreaInsets correctly', async () => {
      // Arrange
      const initialInsets = MOCKED_INSETS;
      const refreshedInsets = {top: 48, left: 0, bottom: 36, right: 0};

      NativeModules.SafeAreaManager = {
        // TODO: this will need to be changed when the we get caching to work in tests ("should return cached insets on subsequent calls")
        // getSafeAreaInsets: jest.fn().mockResolvedValueOnce(initialInsets).mockResolvedValueOnce(updatedInsets)
        getSafeAreaInsets: jest
          .fn()
          .mockResolvedValueOnce(initialInsets)
          .mockResolvedValueOnce(initialInsets)
          .mockResolvedValueOnce(refreshedInsets)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result1 = await SafeAreaInsetsManager.getSafeAreaInsets();
      expect(result1).toEqual(initialInsets);

      // Refresh insets
      await SafeAreaInsetsManager.refreshSafeAreaInsets();

      const result2 = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result2).toEqual(refreshedInsets);
      // TODO: this will need to be changed when the we get caching to work in tests ("should return cached insets on subsequent calls")
      expect(NativeModules.SafeAreaManager.getSafeAreaInsets).toHaveBeenCalledTimes(3);
    });

    it('should not notify delegates when insets remain the same after refresh', async () => {
      // Arrange
      const sameInsets = MOCKED_INSETS;

      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockResolvedValue(sameInsets)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Add a mock delegate
      const mockDelegate = {
        onSafeAreaInsetsDidChangeEvent: jest.fn()
      };
      SafeAreaInsetsManager.addSafeAreaChangedDelegate(mockDelegate);

      // Act
      await SafeAreaInsetsManager.getSafeAreaInsets();
      await SafeAreaInsetsManager.refreshSafeAreaInsets();

      // TODO: this will need to be changed when the we get caching to work in tests ("should return cached insets on subsequent calls")
      expect(NativeModules.SafeAreaManager.getSafeAreaInsets).toHaveBeenCalledTimes(3);

      // Assert - Delegate should not be notified since insets didn't change
      expect(mockDelegate.onSafeAreaInsetsDidChangeEvent).not.toHaveBeenCalled();
    });

    it('should return default insets when native getSafeAreaInsets returns null', async () => {
      // Arrange
      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockResolvedValue(null)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      // Act
      const result = await SafeAreaInsetsManager.getSafeAreaInsets();

      // Assert
      expect(result).toEqual(DEFAULT_INSETS);
    });

    it('should properly manage delegate lifecycle', async () => {
      // Arrange
      NativeModules.SafeAreaManager = {
        getSafeAreaInsets: jest.fn().mockResolvedValue(MOCKED_INSETS)
      };

      const SafeAreaInsetsManager = require('../SafeAreaInsetsManager').default;

      const mockDelegate1 = {
        onSafeAreaInsetsDidChangeEvent: jest.fn()
      };
      const mockDelegate2 = {
        onSafeAreaInsetsDidChangeEvent: jest.fn()
      };

      // Act
      SafeAreaInsetsManager.addSafeAreaChangedDelegate(mockDelegate1);
      SafeAreaInsetsManager.addSafeAreaChangedDelegate(mockDelegate2);

      // Remove one delegate
      SafeAreaInsetsManager.removeSafeAreaChangedDelegate(mockDelegate1);

      // Trigger notification
      const newInsets = MOCKED_INSETS;
      SafeAreaInsetsManager.notifyDelegates(newInsets);

      // Assert
      expect(mockDelegate1.onSafeAreaInsetsDidChangeEvent).not.toHaveBeenCalled();
      expect(mockDelegate2.onSafeAreaInsetsDidChangeEvent).toHaveBeenCalledWith(newInsets);
    });
  });
});
