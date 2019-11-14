
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

declare class ListItemPart extends BaseComponent<ListItemPartProps> {}

export class ListItem extends BaseComponent<ListItemProps> {
  List: typeof ListItemPart;
}
