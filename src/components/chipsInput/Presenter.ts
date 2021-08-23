import {Colors} from '../../style';
import {ChipProps, ChipsInputProps} from './index';

export const isContainsInvalid = (chips: Array<ChipProps>) => {
  return chips.filter((chip) => chip.invalid === true)[0] !== undefined;
};

export const getValidationBasedColor = (chips: Array<ChipProps>, defaultChip?: ChipProps) => {
  const dismissColor = defaultChip?.dismissColor || Colors.red30;
  
  return isContainsInvalid(chips) ? dismissColor : Colors.primary;
};

export const getCounterTextColor = (stateChips: Array<ChipProps>, props: ChipsInputProps) => {
  const {maxLength} = props;
  if (isDisabled(props)) {
    return Colors.grey50;
  }
  return maxLength && stateChips.length >= maxLength ? Colors.red30 : Colors.grey30;
};

export const getCounterText = (count: number, maxLength: number) => {
  return `${Math.min(count, maxLength)} / ${maxLength}`;
};

export const getChipDismissColor = (chip: ChipProps, isSelected: boolean, defaultChipProps?: ChipProps) => {
  const dismissColor = defaultChipProps?.dismissColor || Colors.white;
  return !chip.invalid ? dismissColor : isSelected ? Colors.red10 : Colors.red30;
};

export const isDisabled = (props: ChipsInputProps) => {
  const {disableTagRemoval, editable} = props;
  return disableTagRemoval || editable === false;
};

