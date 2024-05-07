import {type SegmentedControlProps} from './';
import {BorderRadiuses, Colors} from '../../style/';
import {SegmentProps} from './segment';

type useSegmentedControlPresetProps = SegmentedControlProps & Partial<SegmentProps>;

const useSegmentedControlPreset = (props: SegmentedControlProps): useSegmentedControlPresetProps => {
  const {preset = 'default', activeColor, outlineColor} = props;
  const presetProps = {
    ...defaultsPresetsProps[preset],
    ...props
  };
  if (activeColor && !outlineColor && preset === 'default') {
    presetProps.outlineColor = activeColor;
  }

  return presetProps;
};

const defaultActiveColor = Colors.$textPrimary;
const formTextColor = Colors.$textDefault;
const defaultsPresetsProps: Record<
  NonNullable<SegmentedControlProps['preset']>,
  useSegmentedControlPresetProps
> = {
  default: {
    activeColor: defaultActiveColor,
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.$backgroundNeutralLight,
    activeBackgroundColor: Colors.$backgroundDefault,
    inactiveColor: Colors.$textNeutralHeavy,
    outlineColor: defaultActiveColor,
    outlineWidth: 1
  },
  form: {
    activeColor: formTextColor,
    inactiveColor: formTextColor,
    backgroundColor: Colors.$backgroundDefault,
    activeBackgroundColor: Colors.$backgroundElevated,
    outlineColor: Colors.$outlinePrimary,
    borderRadius: BorderRadiuses.br20,
    outlineWidth: 2,
    iconStyle: {tintColor: Colors.$iconDefault}
  }
};
export default useSegmentedControlPreset;
