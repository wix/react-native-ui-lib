
import {ImageProps as RNImageProps} from 'react-native';
import {PureBaseComponent} from '../commons';
import {OverlayType} from './Overlay';

// Remove broken property `tintColor` from `react-native`'s ImageProps
export interface ImageProps extends Omit<RNImageProps, 'tintColor'> {
  sourceTransformer?: (props: any) => any;
  assetName?: string;
  assetGroup?: string;
  tintColor?: string;
  supportRTL?: boolean;
  cover?: boolean;
  aspectRatio?: number;
  overlayType?: OverlayType;
}

export class Image extends PureBaseComponent<ImageProps> {}
