/* eslint no-underscore-dangle: 0 */

import {NativeModules, NativeEventEmitter} from 'react-native';
import _ from 'lodash';

type SafeAreaInsetsType = { top: number; left: number; bottom: number; right: number; } | null 

let SafeAreaInsetsCache: SafeAreaInsetsType = null;

const NativeSafeAreaManager = NativeModules.SafeAreaManager;

class SafeAreaInsetsManager {

  _defaultInsets: SafeAreaInsetsType = {top: 0, left: 0, bottom: 0, right: 0};
  _safeAreaInsets: SafeAreaInsetsType = {top: 0, left: 0, bottom: 0, right: 0};
  _safeAreaChangedDelegates: Array<any> = [];

  constructor() {
    this.addSafeAreaChangedListener();
  }

  addSafeAreaChangedListener() {
    if (!NativeSafeAreaManager) {
      return;
    }
    const NativeSafeAreaEvents = new NativeEventEmitter(NativeSafeAreaManager);
    NativeSafeAreaEvents.addListener('SafeAreaInsetsDidChangeEvent', (safeAreaInsets) => {
      SafeAreaInsetsCache = safeAreaInsets;
      this._safeAreaInsets = SafeAreaInsetsCache;
      _.forEach(this._safeAreaChangedDelegates, (delegate) => {
        if (delegate.onSafeAreaInsetsDidChangeEvent) {
          delegate.onSafeAreaInsetsDidChangeEvent(this._safeAreaInsets);
        } else {
          console.warn('ERROR', 'SafeAreaInsetsManager', 'safe area changed delegate was added, but it does not implement the onSafeAreaInsetsDidChangeEvent method'); //eslint-disable-line
        }
      });
    });
  }

  async _updateInsets() {
    if (NativeSafeAreaManager && SafeAreaInsetsCache === null) {
      SafeAreaInsetsCache = await NativeSafeAreaManager.getSafeAreaInsets();
      this._safeAreaInsets = SafeAreaInsetsCache;
    }
  }

  async getSafeAreaInsets() {
    await this._updateInsets();
    return this._safeAreaInsets;
  }

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
}

export default new SafeAreaInsetsManager();
