import React, {useCallback, useMemo, useRef, useState, forwardRef} from 'react';
import {StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {isUndefined, map} from 'lodash';
import {Constants} from '../../helpers';
import {useCombinedRefs} from '../../hooks';
import TextField, {TextFieldProps} from '../TextField';
import Chip, {ChipProps} from '../../components/chip';

const removeIcon = require('./assets/xSmall.png');

export enum ChipsInputChangeReason {
  Added = 'added',
  Removed = 'removed'
}

export type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
  /**
   * Chip items to render in the input
   */
  chips?: ChipProps[];
  /**
   * A default set of chip props to pass to all chips
   */
  defaultChipProps?: ChipProps;
  /**
   * Change callback for when chips changed (either added or removed)
   */
  onChange?: (chips: ChipProps[], changeReason: ChipsInputChangeReason, updatedChip: ChipProps) => void;
  /**
   * Maximum chips
   */
  maxChips?: number;
};

const ChipsInput = (props: ChipsInputProps, refToForward: React.Ref<any>) => {
  const fieldRef = useCombinedRefs(refToForward);
  const {chips = [], defaultChipProps, leadingAccessory, onChange, fieldStyle, maxChips, ...others} = props;
  const [markedForRemoval, setMarkedForRemoval] = useState<number | undefined>(undefined);
  const fieldValue = useRef(others.value);

  const addChip = useCallback(() => {
    const reachedMaximum = maxChips && chips?.length >= maxChips;
    if (fieldValue.current && !reachedMaximum) {
      const newChip = {label: fieldValue.current};
      onChange?.([...chips, newChip], ChipsInputChangeReason.Added, newChip);
      setMarkedForRemoval(undefined);
      // @ts-expect-error
      fieldRef.current.clear();
      fieldValue.current = '';
    }
  }, [onChange, chips, maxChips]);

  const removeMarkedChip = useCallback(() => {
    if (!isUndefined(markedForRemoval)) {
      const removedChip = chips?.splice(markedForRemoval, 1);
      onChange?.([...chips], ChipsInputChangeReason.Removed, removedChip?.[0]);
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
      ref={fieldRef}
      leadingAccessory={chipList}
      blurOnSubmit={false}
      {...others}
      onChangeText={onChangeText}
      onSubmitEditing={addChip}
      fieldStyle={[fieldStyle, styles.fieldStyle]}
      onKeyPress={onKeyPress}
      accessibilityHint={props.editable ? 'press keyboard delete button to remove last tag' : undefined}

      // TODO: remove old props usage reference once the migration to the new implementation is completed
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

const styles = StyleSheet.create({
  fieldStyle: {
    flexWrap: 'wrap'
  }
});

ChipsInput.changeReasons = {
  ADDED: 'added',
  REMOVED: 'removed'
};

export default forwardRef(ChipsInput);

/* TODO: These are old ChipsInput props to have a quick reference to what we had till we complete migration */
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
