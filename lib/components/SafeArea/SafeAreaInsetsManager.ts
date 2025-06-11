/* eslint no-underscore-dangle: 0 */

import _ from 'lodash';

type SafeAreaInsetsType = { top: number; left: number; bottom: number; right: number; } | null;

class SafeAreaInsetsManager {

  _defaultInsets: SafeAreaInsetsType = {top: 47, left: 0, bottom: 34, right: 0}; // Common iPhone safe area values
  _safeAreaInsets: SafeAreaInsetsType = {top: 47, left: 0, bottom: 34, right: 0};
  _safeAreaChangedDelegates: Array<any> = [];

  constructor() {
    // Initialize with default values
    this._safeAreaInsets = this._defaultInsets;
    console.log('SafeAreaInsetsManager: Using hardcoded safe area insets:', this._defaultInsets);
  }

  async _updateInsets() {
    // Temporarily disabled TurboModule usage - using hardcoded values
    this._safeAreaInsets = this._defaultInsets;
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
