import get from 'lodash/get';
import {ImageProps} from 'react-native';
import Assets from '../assets';
import {Constants} from '../commons/new';

export function isSvgUri(source?: ImageProps['source']) {
  // @ts-expect-error
  return typeof source === 'object' && source?.uri?.endsWith?.('.svg');
}

export function isSvg(source?: ImageProps['source']) {
  return typeof source === 'function' || isSvgUri(source) || (Constants.isWeb && isSvgData(source));
}

export function isBase64ImageContent(data: string) {
  const base64Content = data.split(',')[1];
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(base64Content);
}

export function getAsset(assetName = '', assetGroup = '') {
  return get(Assets, `${assetGroup}.${assetName}`);
}

function isSvgData(source?: ImageProps['source']) {
  const sourceString = (source as string);
  return typeof source === 'string' && (sourceString.includes('</svg>') || sourceString.includes('data:image/svg'));
}
