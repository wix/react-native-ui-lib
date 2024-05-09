import {type SegmentedControlProps} from './';
import {BorderRadiuses, Colors} from '../../style/';
import {SegmentProps} from './segment';
import type {ColorValue} from 'react-native';

interface useSegmentedControlPresetProps extends SegmentedControlProps, Partial<SegmentProps> {
  segmentDividerWidth: number;
  segmentDividerColor: ColorValue;
  iconTintColor?: string;
}

const useSegmentedControlPreset = (props: SegmentedControlProps): useSegmentedControlPresetProps => {
  const {preset = 'default', activeColor, inactiveColor, outlineColor} = props;
  const presetProps = {
    ...defaultsPresetsProps[preset],
    ...props
  };
  if (activeColor && !outlineColor && preset === 'default') {
    presetProps.outlineColor = activeColor;
  }
  if (activeColor || inactiveColor) {
    delete presetProps.iconTintColor;
  }
  return presetProps;
};

const defaultActiveColor = Colors.$textPrimary;
const formTextColor = Colors.$textDefault;
const defaultsPresetsProps: Record<NonNullable<SegmentedControlProps['preset']>, useSegmentedControlPresetProps> = {
  default: {
    activeColor: defaultActiveColor,
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.$backgroundNeutralLight,
    activeBackgroundColor: Colors.$backgroundDefault,
    inactiveColor: Colors.$textNeutralHeavy,
    outlineColor: defaultActiveColor,
    outlineWidth: 1,
    segmentDividerWidth: 1,
    segmentDividerColor: ''
  },
  form: {
    activeColor: formTextColor,
    inactiveColor: formTextColor,
    backgroundColor: Colors.$backgroundDefault,
    activeBackgroundColor: Colors.$backgroundElevated,
    outlineColor: Colors.$outlinePrimary,
    borderRadius: BorderRadiuses.br20,
    outlineWidth: 2,
    iconTintColor: Colors.$iconDefault,
    segmentDividerWidth: 1,
    segmentDividerColor: Colors.$outlineDefault
  }
};
export default useSegmentedControlPreset;
