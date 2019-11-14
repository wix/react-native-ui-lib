
import {ImageRequireSource} from 'react-native';

export type EmojisList = { readonly [key: string]: string };

export type IconNames =
  | 'check'
  | 'checkSmall'
  | 'chevronRight'
  | 'plusSmall'
  | 'search'
  | 'settings'
  | 'x';

export type IconsList = Record<IconNames, ImageRequireSource> & { readonly [key: string]: ImageRequireSource };

export type ImageNames =
  | 'gradient';

export type ImagesList = Record<ImageNames, ImageRequireSource> & { readonly [key: string]: ImageRequireSource };

export namespace Assets {
  const icons: Readonly<IconsList>;
  const emojis: Readonly<EmojisList>;
  const images: Readonly<ImagesList>;
}
