
import {ButtonProps, StyleProp, ViewStyle} from 'react-native';
import {BaseComponent} from '../commons';

export interface ActionBarProps {
  height?: number;
  backgroundColor?: string;
  actions?: ButtonProps[];
  centered?: boolean;
  useSafeArea?: boolean;
  keepRelative?: boolean;
  style?: StyleProp<ViewStyle>;
}

export class ActionBar extends BaseComponent<ActionBarProps> {}
