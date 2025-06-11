/* eslint no-underscore-dangle: 0 */

import _ from 'lodash';
import {TurboModuleRegistry, TurboModule} from 'react-native';

type SafeAreaInsetsType = { top: number; left: number; bottom: number; right: number; } | null;

// TurboModule interface for the new architecture
interface Spec extends TurboModule {
  getSafeAreaInsets(): Promise<SafeAreaInsetsType>;
}

let SafeAreaInsetsCache: SafeAreaInsetsType = null;

// Try to get the native module with proper error handling
let NativeSafeAreaManager: Spec | null = null;

try {
  NativeSafeAreaManager = TurboModuleRegistry.getEnforcing<Spec>('SafeAreaManager');
} catch (error) {
  console.warn('SafeAreaInsetsManager: Failed to load TurboModule SafeAreaManager:', error);
}
class SafeAreaInsetsManager {
  _defaultInsets: SafeAreaInsetsType = {top: 44, left: 0, bottom: 34, right: 0}; // Common iPhone safe area values as fallback
  _safeAreaInsets: SafeAreaInsetsType = {top: 44, left: 0, bottom: 34, right: 0};
  _safeAreaChangedDelegates: Array<any> = [];

  constructor() {
    // Initialize with default values
    this._safeAreaInsets = this._defaultInsets;
  }

  async _updateInsets() {
    if (NativeSafeAreaManager && SafeAreaInsetsCache === null) {
      try {
        SafeAreaInsetsCache = await NativeSafeAreaManager.getSafeAreaInsets();
        this._safeAreaInsets = SafeAreaInsetsCache;
      } catch (error) {
        console.warn('SafeAreaInsetsManager: Failed to get safe area insets:', error);
        // Fallback to default values
        this._safeAreaInsets = this._defaultInsets;
      }
    } else if (SafeAreaInsetsCache !== null) {
      this._safeAreaInsets = SafeAreaInsetsCache;
    } else {
      this._safeAreaInsets = this._defaultInsets;
    }
  }

  async getSafeAreaInsets() {
    await this._updateInsets();
    return this._safeAreaInsets;
  }

  // For backwards compatibility - delegates can still be added but won't receive events
  // until proper event handling is implemented in the native side for TurboModules
  addSafeAreaChangedDelegate(delegate: any) {
    this._safeAreaChangedDelegates.push(delegate);
  }

  removeSafeAreaChangedDelegate(delegateToRemove: any) {
    _.remove(this._safeAreaChangedDelegates, (currentDelegate) => {
      return currentDelegate === delegateToRemove;
    });
  }

  get defaultInsets() {
    return this._defaultInsets;
  }

  // Method to manually refresh safe area insets and notify delegates
  async refreshSafeAreaInsets() {
    const previousInsets = this._safeAreaInsets;
    SafeAreaInsetsCache = null; // Force refresh
    await this._updateInsets();
    
    // Notify delegates if insets changed
    if (!_.isEqual(previousInsets, this._safeAreaInsets)) {
      _.forEach(this._safeAreaChangedDelegates, (delegate) => {
        if (delegate.onSafeAreaInsetsDidChangeEvent) {
          delegate.onSafeAreaInsetsDidChangeEvent(this._safeAreaInsets);
        }
      });
    }
  }
}

const instance = new SafeAreaInsetsManager();

export default instance;
