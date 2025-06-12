/* eslint no-underscore-dangle: 0 */

import _ from 'lodash';
import {NativeModules, DeviceEventEmitter, Platform} from 'react-native';

type SafeAreaInsetsType = { top: number; left: number; bottom: number; right: number; } | null;

let SafeAreaInsetsCache: SafeAreaInsetsType = null;

class SafeAreaInsetsManager {

  _defaultInsets: SafeAreaInsetsType = {top: 47, left: 0, bottom: 34, right: 0}; // Common iPhone safe area values
  _safeAreaInsets: SafeAreaInsetsType = {top: 47, left: 0, bottom: 34, right: 0};
  _safeAreaChangedDelegates: Array<any> = [];
  _nativeModule: any = null;

  constructor() {
    // Initialize with default values
    this._safeAreaInsets = this._defaultInsets;
    
    // Try to connect to native module
    this.setupNativeConnection();
  }

  setupNativeConnection() {
    try {
      // Access the native module directly without causing getConstants
      this._nativeModule = NativeModules.SafeAreaManager;
      
      if (this._nativeModule) {
        console.log('SafeAreaInsetsManager: Connected to native SafeAreaManager');
        
        // Set up event listener using DeviceEventEmitter instead of NativeEventEmitter
        // This avoids getConstants issues
        this.setupEventListener();
        
        // Get initial safe area insets
        this.getInitialInsets();
      } else {
        console.log('SafeAreaInsetsManager: Native SafeAreaManager not available, using defaults');
      }
    } catch (error) {
      console.warn('SafeAreaInsetsManager: Failed to connect to native module:', error);
    }
  }

  setupEventListener() {
    if (Platform.OS !== 'ios') {
      return;
    }

    try {
      // Use DeviceEventEmitter instead of NativeEventEmitter to avoid getConstants
      console.log('SafeAreaInsetsManager: Setting up DeviceEventEmitter listener...');
      
      DeviceEventEmitter.addListener('SafeAreaInsetsDidChangeEvent', (data) => {
        console.log('SafeAreaInsetsManager: Received safe area change event:', data);
        if (data) {
          SafeAreaInsetsCache = data;
          this._safeAreaInsets = data;
          this.notifyDelegates(data);
        }
      });
      
      console.log('SafeAreaInsetsManager: DeviceEventEmitter listener setup complete');
    } catch (error) {
      console.warn('SafeAreaInsetsManager: Failed to setup event listener:', error);
    }
  }

  async getInitialInsets() {
    if (!this._nativeModule) {
      return;
    }

    try {
      console.log('SafeAreaInsetsManager: Getting initial insets from native...');
      const insets = await this._nativeModule.getSafeAreaInsets();
      console.log('SafeAreaInsetsManager: Received initial insets:', insets);
      
      if (insets) {
        SafeAreaInsetsCache = insets;
        this._safeAreaInsets = insets;
        // Don't notify delegates yet as components might not be ready
      }
    } catch (error) {
      console.warn('SafeAreaInsetsManager: Failed to get initial insets:', error);
    }
  }

  notifyDelegates(insets: SafeAreaInsetsType) {
    console.log('SafeAreaInsetsManager: Notifying', this._safeAreaChangedDelegates.length, 'delegates');
    _.forEach(this._safeAreaChangedDelegates, (delegate) => {
      if (delegate.onSafeAreaInsetsDidChangeEvent) {
        delegate.onSafeAreaInsetsDidChangeEvent(insets);
      }
    });
  }

  async _updateInsets() {
    if (this._nativeModule && SafeAreaInsetsCache === null) {
      try {
        SafeAreaInsetsCache = await this._nativeModule.getSafeAreaInsets();
        this._safeAreaInsets = SafeAreaInsetsCache;
      } catch (error) {
        console.warn('SafeAreaInsetsManager: Failed to get native insets:', error);
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

  addSafeAreaChangedDelegate(delegate: any) {
    console.log('SafeAreaInsetsManager: Adding delegate, total will be:', this._safeAreaChangedDelegates.length + 1);
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
      this.notifyDelegates(this._safeAreaInsets);
    }
  }
}

const instance = new SafeAreaInsetsManager();

export default instance;
