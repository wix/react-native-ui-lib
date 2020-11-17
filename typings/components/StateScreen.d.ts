import {ReactNode} from 'react';
import {GestureResponderEvent, ImageSourcePropType} from 'react-native';
import {BaseComponent} from '../commons';

export interface StateScreenProps {
  imageSource?: ImageSourcePropType;
  source?: ImageSourcePropType;
  title: string;
  subtitle?: ReactNode[];
  ctaLabel?: string;
  onCtaPress?: (event: GestureResponderEvent) => void;
  testId?: string;
}

export class StateScreen extends BaseComponent<StateScreenProps> {}
