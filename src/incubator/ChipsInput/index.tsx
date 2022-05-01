import React, {useCallback, useMemo, useRef, useState, forwardRef} from 'react';
import {StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {isUndefined, map} from 'lodash';
import {Constants} from '../../commons/new';
import {useCombinedRefs} from '../../hooks';
import TextField, {TextFieldProps} from '../TextField';
import Chip, {ChipProps} from '../../components/chip';

const removeIcon = require('./assets/xSmall.png');

export enum ChipsInputChangeReason {
  Added = 'added',
  Removed = 'removed'
}

export type ChipsInputChipProps = ChipProps & {invalid?: boolean};

export type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
  /**
   * Chip items to render in the input
   */
  chips?: ChipsInputChipProps[];
  /**
   * A default set of chip props to pass to all chips
   */
  defaultChipProps?: ChipProps;
  /**
   * A default set of chip props to pass to all invalid chips
   */
  invalidChipProps?: ChipProps;
  /**
   * Change callback for when chips changed (either added or removed)
   */
  onChange?: (chips: ChipsInputChipProps[], changeReason: ChipsInputChangeReason, updatedChip: ChipProps) => void;
  /**
   * Maximum chips
   */
  maxChips?: number;
};

const ChipsInput = forwardRef((props: ChipsInputProps, refToForward: React.Ref<any>) => {
  const fieldRef = useCombinedRefs(refToForward);
  const {
    chips = [],
    defaultChipProps,
    invalidChipProps,
    leadingAccessory,
    onChange,
    fieldStyle,
    maxChips,
    ...others
  } = props;
  const [markedForRemoval, setMarkedForRemoval] = useState<number | undefined>(undefined);
  const fieldValue = useRef(others.value);

  const addChip = useCallback(() => {
    const reachedMaximum = maxChips && chips?.length >= maxChips;
    if (fieldValue.current && !reachedMaximum) {
      const newChip = {label: fieldValue.current};
      setMarkedForRemoval(undefined);
      // @ts-expect-error
      fieldRef.current.clear();
      fieldValue.current = '';
      /* NOTE: Delay change event to give clear field time to complete and avoid a flickering */
      setTimeout(() => {
        onChange?.([...chips, newChip], ChipsInputChangeReason.Added, newChip);
      }, 0);
    }
  }, [onChange, chips, maxChips]);

  const removeMarkedChip = useCallback(() => {
    if (!isUndefined(markedForRemoval)) {
      const removedChip = chips?.splice(markedForRemoval, 1);
      onChange?.([...chips], ChipsInputChangeReason.Removed, removedChip?.[0]);
      setMarkedForRemoval(undefined);
    }
  }, [chips, markedForRemoval, onChange]);

  const onChipPress = useCallback(({customValue: index}: {customValue: number}) => {
    const selectedChip = chips[index];
    selectedChip?.onPress?.();

    setMarkedForRemoval(index);
  },
  [chips]);

  const onChangeText = useCallback((value: string) => {
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
              {...(chip.invalid ? invalidChipProps : undefined)}
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
    />
  );
});

const styles = StyleSheet.create({
  fieldStyle: {
    flexWrap: 'wrap'
  }
});
// @ts-expect-error
ChipsInput.changeReasons = {
  ADDED: 'added',
  REMOVED: 'removed'
};

export default ChipsInput;
