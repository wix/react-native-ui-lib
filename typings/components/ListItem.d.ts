
import {ComponentType} from 'react';
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {BaseComponent} from '../commons';

export interface ListItemPartProps {
  left?: boolean;
  middle?: boolean;
  right?: boolean;
  row?: boolean;
  column?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface ListItemProps {
  height?: number | string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  containerElement?: ComponentType;
}

export class ListItem extends BaseComponent<ListItemProps> {}

export namespace ListItem {
  export class Part extends BaseComponent<ListItemPartProps> {}
}
