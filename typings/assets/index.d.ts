
import {ImageRequireSource} from 'react-native';

export type EmojisList = { readonly [key: string]: string };

export type IconName =
  | 'check'
  | 'checkSmall'
  | 'chevronRight'
  | 'plusSmall'
  | 'search'
  | 'settings'
  | 'x';

export type IconsList = Record<IconName, ImageRequireSource> & { readonly [key: string]: ImageRequireSource };

export type ImageName =
  | 'gradient';

export type ImagesList = Record<ImageName, ImageRequireSource> & { readonly [key: string]: ImageRequireSource };

export namespace Assets {
  const icons: Readonly<IconsList>;
  const emojis: Readonly<EmojisList>;
  const images: Readonly<ImagesList>;
}
