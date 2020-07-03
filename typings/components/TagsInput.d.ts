import {ReactElement} from 'react';
import {StyleProp, TextStyle, ViewStyle, AccessibilityProps} from 'react-native';
import {BaseComponent} from '../commons';
import {AccessibilityProps} from '../modifiers';

export type Tag =
  | string
  | { label: string }
  | object;

export type TagsInputRenderTagFunc = (
  tag: Tag,
  index: number,
  shouldMarkTag: boolean,
  label: string
) => ReactElement | ReactElement[];

export type TagsInputOnChangeTagsAction = 'added' | 'removed';

export type TagsInputOnChangeTagsFunc = (tags: Tag[], action: TagsInputOnChangeTagsAction, tag: Tag) => void;

export interface TagsInputProps {
  tags?: Tag[];
  getLabel?: (tag?: Tag) => string;
  renderTag?: TagsInputRenderTagFunc;
  onChangeTags?: TagsInputOnChangeTagsFunc;
  onCreateTag?: (value: string) => string;
  onTagPress?: (index: number, indexToRemove: number) => void;
  disableTagRemoval?: boolean;
  disableTagAdding?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  tagStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  hideUnderline?: boolean;
  placeholderTextColor?: string;
  selectionColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export class TagsInput extends BaseComponent<TagsInputProps & AccessibilityProps> {
  static onChangeTagsActions?: () => void

  blur: () => void;
  focus: () => void;
  clear: () => void;
}
