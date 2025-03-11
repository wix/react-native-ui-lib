import Colors from '../../style/colors';
import Assets from '../../assets';
import {WizardStepsConfig} from './types';

export const StatesConfig: WizardStepsConfig = {
  enabled: {color: Colors.$textNeutralHeavy, circleColor: Colors.$outlineDisabled, enabled: true},
  disabled: {color: Colors.$textDisabled, circleColor: Colors.$outlineDefault},
  error: {
    color: Colors.$iconDangerLight,
    circleColor: Colors.$outlineDanger,
    icon: Assets.components.exclamationSmall,
    enabled: true,
    accessibilityInfo: 'Validation Error'
  },
  skipped: {
    color: Colors.$textDangerLight,
    circleColor: Colors.$outlineDanger,
    enabled: true,
    accessibilityInfo: 'Not completed'
  },
  completed: {
    color: Colors.$iconNeutral,
    circleColor: Colors.$outlineDisabled,
    icon: Assets.components.checkMarkSmall,
    enabled: true,
    accessibilityInfo: 'Completed'
  },
  active: {color: Colors.$textPrimary, circleColor: Colors.$outlinePrimary}
};
