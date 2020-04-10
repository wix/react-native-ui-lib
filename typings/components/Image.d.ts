
import {ImageProps as RNImageProps} from 'react-native';
import {PureBaseComponent} from '../commons';
import {OverlayType} from './Overlay';

// Remove broken property `tintColor` from `react-native`'s ImageProps
export interface ImageProps extends Omit<RNImageProps, 'tintColor' | 'source'> {
  sourceTransformer?: (props: any) => any;
  assetName?: string;
  assetGroup?: string;
  tintColor?: string;
  supportRTL?: boolean;
  cover?: boolean;
  aspectRatio?: number;
  overlayType?: OverlayType;
  source?: RNImageProps['source'];
  imageId?: string;
  useCustomTheme?: boolean;
  overlayColor?: string;
  customOverlayContent?: any;
  size?: number;
}

export class Image extends PureBaseComponent<ImageProps> {
  static getSize(image: string, cb: (width: number, height: number) => void);
  static overlayTypes: {
    VERTICAL: 'vertical'
    TOP: 'top'
    BOTTOM: 'bottom'
    SOLID: 'solid'
  }
}
