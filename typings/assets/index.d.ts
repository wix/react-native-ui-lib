
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

export const Assets: {
  icons: Readonly<IconsList> & {[k: string]: Readonly<IconsList>};
  emojis: Readonly<EmojisList>;
  images: Readonly<ImagesList>;
  loadAssetsGroup: (name: string, assets: any) => void;
} & Record<keyof any, any>;
