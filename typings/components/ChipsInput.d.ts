import {ReactElement} from 'react';
import {StyleProp, TextStyle, ViewStyle, AccessibilityProps, ColorValue} from 'react-native';
import {BaseComponent} from '../commons';
import {AccessibilityProps} from '../modifiers';
import {TextFieldProps} from './Inputs';

export type Tag =
  | string
  | { label: string }
  | object;

export type ChipsInputRenderTagFunc = (
  tag: Tag,
  index: number,
  shouldMarkTag: boolean,
  label: string
) => ReactElement | ReactElement[];

export type ChipsInputOnChangeTagsAction = 'added' | 'removed';

export type ChipsInputOnChangeTagsFunc = (tags: Tag[], action: ChipsInputOnChangeTagsAction, tag: Tag) => void;

export interface ChipsInputProps extends TextFieldProps {
  tags?: Tag[];
  getLabel?: (tag?: Tag) => string;
  renderTag?: ChipsInputRenderTagFunc;
  onChangeTags?: ChipsInputOnChangeTagsFunc;
  onCreateTag?: (value: string) => string;
  onTagPress?: (index: number, indexToRemove: number) => void;
  disableTagRemoval?: boolean;
  disableTagAdding?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  tagStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  hideUnderline?: boolean;
  placeholderTextColor?: ColorValue;
  selectionColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export class ChipsInput extends BaseComponent<ChipsInputProps & AccessibilityProps> {
  static onChangeTagsActions?: () => void

  blur: () => void;
  focus: () => void;
  clear: () => void;
}
