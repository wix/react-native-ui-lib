import {type SegmentedControlProps, BORDER_WIDTH} from './';
import {BorderRadiuses, Colors} from '../../style/';
import {SegmentProps} from './segment';

const useSegmentedControlPreset = (props: SegmentedControlProps): SegmentedControlProps & Partial<SegmentProps> => {
  const {preset = 'default'} = props;
  return {
    ...defaultsPresetsProps[preset],
    ...props
  };
};

const activeColor = Colors.$textPrimary;
const defaultsPresetsProps: Record<
  NonNullable<SegmentedControlProps['preset']>,
  Partial<SegmentedControlProps> & Partial<SegmentProps>
> = {
  default: {
    activeColor,
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.$backgroundNeutralLight,
    activeBackgroundColor: Colors.$backgroundDefault,
    inactiveColor: Colors.$textNeutralHeavy,
    outlineColor: activeColor,
    outlineWidth: BORDER_WIDTH
  },
  form: {
    backgroundColor: Colors.$backgroundDefault,
    activeBackgroundColor: Colors.$backgroundElevated,
    outlineColor: Colors.$outlinePrimary,
    borderRadius: BorderRadiuses.br20,
    outlineWidth: 2,
    iconStyle: {tintColor: Colors.$iconDefault}
  }
};
export default useSegmentedControlPreset;
/**
 * activeColor = Colors.$textPrimary,
    borderRadius = BorderRadiuses.br100,
    backgroundColor = Colors.$backgroundNeutralLight,
    activeBackgroundColor = Colors.$backgroundDefault,
    inactiveColor = Colors.$textNeutralHeavy,
    outlineColor = activeColor,
    outlineWidth = BORDER_WIDTH,
 */
