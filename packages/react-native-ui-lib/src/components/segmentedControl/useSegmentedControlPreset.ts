import type {SegmentedControlProps, SegmentedControlPreset} from './';
import {BorderRadiuses, Colors} from '../../style/';
import {SegmentProps} from './segment';
import type {ColorValue} from 'react-native';

interface useSegmentedControlPresetProps extends SegmentedControlProps, Partial<SegmentProps> {
  segmentDividerWidth: number;
  segmentDividerColor: ColorValue;
  iconTintColor?: string;
}
const DEFAULT_ACTIVE_COLOR = Colors.$textPrimary;
const FORM_TEXT_COLOR = Colors.$textDefault;

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

const defaultsPresetsProps: Record<`${SegmentedControlPreset}`, Omit<useSegmentedControlPresetProps, 'segments'>> = {
  default: {
    activeColor: DEFAULT_ACTIVE_COLOR,
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.$backgroundNeutralLight,
    activeBackgroundColor: Colors.$backgroundDefault,
    inactiveColor: Colors.$textNeutralHeavy,
    outlineColor: DEFAULT_ACTIVE_COLOR,
    outlineWidth: 1,
    segmentDividerWidth: 0,
    segmentDividerColor: ''
  },
  form: {
    activeColor: FORM_TEXT_COLOR,
    inactiveColor: FORM_TEXT_COLOR,
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
