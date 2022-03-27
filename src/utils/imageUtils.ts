import get from 'lodash/get';
import {ImageProps} from 'react-native';
import Assets from '../assets';

export function isSvgUri(source: ImageProps['source']) {
  // @ts-expect-error
  return typeof source === 'object' && source?.uri?.endsWith?.('.svg');
}

export function isSvg(source: ImageProps['source']) {
  return typeof source === 'string' || typeof source === 'function' || isSvgUri(source);
}

export function getAsset(assetName = '', assetGroup = '') {
  return get(Assets, `${assetGroup}.${assetName}`);
}
