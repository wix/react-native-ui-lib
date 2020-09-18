
import {StyleProp, ViewStyle} from 'react-native';
import {PureBaseComponent} from '../commons';
import {ButtonProps} from './Button';

export interface StackAggregatorProps {
  collapsed?: boolean;
  disablePresses?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemBorderRadius?: number;
  buttonProps?: ButtonProps;
  onItemPress?: (index: number) => void;
  onCollapseWillChange?: (future: boolean) => void;
  onCollapseChanged?: (collapsed: boolean) => void;
}

export class StackAggregator extends PureBaseComponent<StackAggregatorProps> {}
