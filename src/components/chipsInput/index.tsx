import React, {useCallback, useMemo, useRef, useState, forwardRef} from 'react';
import {StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {isUndefined, map} from 'lodash';
import {Constants} from '../../commons/new';
import {useCombinedRefs, useDidUpdate} from '../../hooks';
import TextField, {TextFieldProps} from '../textField';
import Assets from '../../assets';
import Chip, {ChipProps} from '../chip';

export enum ChipsInputChangeReason {
  Added = 'added',
  Removed = 'removed'
}

type RenderChip = {index: number; chip: ChipsInputChipProps; isMarkedForRemoval: boolean};

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
    validate,
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

    if (pressedBackspace && !fieldValue.current && chips.length > 0) {
      if (isUndefined(markedForRemoval) || markedForRemoval !== chips.length - 1) {
        setMarkedForRemoval(chips.length - 1);
      } else {
        removeMarkedChip();
      }
    }
  },
  [chips, props.onKeyPress, markedForRemoval, removeMarkedChip]);

  const renderChip = (props: RenderChip) => {
    const {index, chip, isMarkedForRemoval} = props;
    return (
      <Chip
        key={index}
        customValue={index}
        // resetSpacings
        // paddingH-s2
        marginR-s2
        marginB-s2
        dismissIcon={Assets.internal.icons.xSmall}
        recorderTag={'mask'}
        {...defaultChipProps}
        {...(chip.invalid ? invalidChipProps : undefined)}
        {...chip}
        onPress={onChipPress}
        onDismiss={isMarkedForRemoval ? removeMarkedChip : undefined}
      />
    );
  };

  const chipList = useMemo(() => {
    return (
      <>
        {leadingAccessory}
        {map(chips, (chip, index) => {
          const isMarkedForRemoval = index === markedForRemoval;
          if (!maxChips || index < maxChips) {
            return renderChip({index, chip, isMarkedForRemoval});
          }
        })}
      </>
    );
  }, [chips, leadingAccessory, defaultChipProps, removeMarkedChip, markedForRemoval, maxChips]);

  const isRequired = useMemo(() => {
    if (!validate) {
      return false;
    }

    const inputValidators = Array.isArray(validate) ? validate : [validate];
    return inputValidators.includes('required');
  }, [validate]);

  const requiredValidator = useCallback(() => {
    return !isRequired || (chips?.length ?? 0) > 0;
  }, [isRequired, chips]);

  const _validate = useMemo(() => {
    if (!validate) {
      return undefined;
    } else if (isRequired) {
      const inputValidators = Array.isArray(validate) ? validate : [validate];
      return inputValidators.map(validator => (validator === 'required' ? requiredValidator : validator));
    } else {
      return validate;
    }
  }, [validate, isRequired, requiredValidator]);

  useDidUpdate(() => {
    if (others.validateOnChange) {
      // @ts-expect-error
      fieldRef.current?.validate();
    }
  }, [chips, others.validateOnChange]);

  return (
    <TextField
      // @ts-expect-error
      ref={fieldRef}
      leadingAccessory={chipList}
      blurOnSubmit={false}
      style={styles.input}
      {...others}
      onChangeText={onChangeText}
      onSubmitEditing={addChip}
      fieldStyle={[fieldStyle, styles.fieldStyle]}
      onKeyPress={onKeyPress}
      accessibilityHint={props.editable ? 'press keyboard delete button to remove last tag' : undefined}
      validate={_validate}
    />
  );
});

const styles = StyleSheet.create({
  fieldStyle: {
    flexWrap: 'wrap'
  },
  input: {
    flexGrow: undefined
  }
});
// @ts-expect-error
ChipsInput.changeReasons = {
  ADDED: 'added',
  REMOVED: 'removed'
};

export default ChipsInput;
