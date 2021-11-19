import React, {useCallback, useMemo, useRef, useState} from 'react';
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {isUndefined, map} from 'lodash';
import {Constants} from '../../helpers';
import TextField, {TextFieldProps} from '../TextField';
import Chip, {ChipProps} from '../../components/chip';

const removeIcon = require('./assets/xSmall.png');

export type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
  chips?: ChipProps[];
  defaultChipProps: ChipProps;
  onChange?: (chips: ChipProps[]) => void;
};

const ChipsInput = (props: ChipsInputProps) => {
  const {chips = [], defaultChipProps, leadingAccessory, onChange, fieldStyle, ...others} = props;
  const [markedForRemoval, setMarkedForRemoval] = useState<number | undefined>(undefined);
  const field = useRef();
  const fieldValue = useRef(others.value);

  const addChip = useCallback(() => {
    if (fieldValue.current) {
      const newChip = {label: fieldValue.current};
      onChange?.([...chips, newChip]);
      setMarkedForRemoval(undefined);
      // @ts-expect-error
      field.current.clear();
      fieldValue.current = '';
    }
  }, [onChange, chips]);

  const removeMarkedChip = useCallback(() => {
    if (!isUndefined(markedForRemoval)) {
      chips?.splice(markedForRemoval, 1);
      onChange?.([...chips]);
      setMarkedForRemoval(undefined);
    }
  }, [chips, markedForRemoval, onChange]);

  const onChipPress = useCallback(({customValue: index}) => {
    const selectedChip = chips[index];
    selectedChip?.onPress?.();

    setMarkedForRemoval(index);
  },
  [chips]);

  const onChangeText = useCallback(value => {
    fieldValue.current = value;
    props.onChangeText?.(value);

    if (!isUndefined(markedForRemoval)) {
      setMarkedForRemoval(undefined);
    }
  },
  [props.onChangeText, markedForRemoval]);

  const onKeyPress = useCallback((event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    props.onKeyPress?.(event);
    const keyCode = event?.nativeEvent?.key;
    const pressedBackspace = keyCode === Constants.backspaceKey;

    if (pressedBackspace && !fieldValue.current) {
      if (isUndefined(markedForRemoval) || markedForRemoval !== chips.length - 1) {
        setMarkedForRemoval(chips.length - 1);
      } else {
        removeMarkedChip();
      }
    }
  },
  [chips, props.onKeyPress, markedForRemoval, removeMarkedChip]);

  const chipList = useMemo(() => {
    return (
      <>
        {leadingAccessory}
        {map(chips, (chip, index) => {
          const isMarkedForRemoval = index === markedForRemoval;
          return (
            <Chip
              key={index}
              customValue={index}
              // resetSpacings
              // paddingH-s2
              marginR-s2
              marginB-s2
              dismissIcon={removeIcon}
              {...defaultChipProps}
              {...chip}
              onPress={onChipPress}
              onDismiss={isMarkedForRemoval ? removeMarkedChip : undefined}
            />
          );
        })}
      </>
    );
  }, [chips, leadingAccessory, defaultChipProps, removeMarkedChip, markedForRemoval]);

  return (
    <TextField
      // @ts-expect-error
      ref={field}
      leadingAccessory={chipList}
      blurOnSubmit={false}
      {...others}
      onChangeText={onChangeText}
      onSubmitEditing={addChip}
      // @ts-expect-error
      fieldStyle={[fieldStyle, {flexWrap: 'wrap'}]}
      onKeyPress={onKeyPress}
      accessibilityHint={props.editable ? 'press keyboard delete button to remove last tag' : undefined}

      // text80
      // {...others}
      // maxLength={undefined}
      // title={this.props.chips ? undefined : title}
      // value={value}
      // onKeyPress={this.onKeyPress}
      // enableErrors={false}
      // onFocus={this.onFocus}
      // onBlur={this.onBlur}
      // hideUnderline
      // selectionColor={isLastTagMarked ? 'transparent' : selectionColor}
      // style={[inputStyle, styles.alignTextCenter]}
      // containerStyle={{flexGrow: 0}}
      // collapsable={false}
    />
  );
};

export default ChipsInput;

/* Old ChipsInput props to make sure we have parity */
//  /**
//  * list of tags. can be string boolean or custom object when implementing getLabel
//  */
//  chips?: ChipsInputChipProps[];
//  /**
//   * Style your chips
//   */
//  defaultChipProps?: ChipsInputChipProps;
//  /**
//   * callback for extracting the label out of the tag item
//   */
//  getLabel?: (tag: ChipType) => any;
//  /**
//  /**
//   * callback for onChangeTags event
//   */
//  onChangeTags?: () => void;
//  /**
//   * DEPRECATED: use chips instead. callback for creating new tag out of input value (good for composing tag object)
//   */
//  onCreateTag?: (value: any) => void;
//  /**
//   * DEPRECATED: use chips instead. callback for when pressing a tag in the following format (tagIndex, markedTagIndex) => {...}
//   */
//  onTagPress?: (index: number, toRemove?: number) => void;
//  /**
//   * validation message error appears when tag isn't validate
//   */
//  validationErrorMessage?: string;
//  /**
//   * if true, tags *removal* Ux won't be available
//   */
//  disableTagRemoval?: boolean;
//  /**
//   * if true, tags *adding* Ux (i.e. by 'submitting' the input text) won't be available
//   */
//  disableTagAdding?: boolean;
//  /**
//   * custom styling for the component container
//   */
//  containerStyle?: ViewStyle;
//  /**
//   * custom styling for the tag item
//   */
//  tagStyle?: ViewStyle;
//  /**
//   * custom styling for the text input
//   */
//  inputStyle?: RNTextInputProps['style'];
//  /**
//   * should hide input underline
//   */
//  hideUnderline?: boolean;
//  /**
//   *  Maximum numbers of chips
//   */
//  maxLength?: number;
//  /**
//   * Chips with maxHeigh is inside a scrollView
//   */
//  scrollViewProps?: ScrollViewProps;
//  /**
//   * Chips inside a ScrollView
//   */
//  maxHeight?: number;
//  /**
//   * Custom element before the chips, for example 'search' icon, 'To:' label etc'
//   */
//  leftElement?: JSX.Element | JSX.Element[];
