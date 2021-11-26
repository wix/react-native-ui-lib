import 'react';
import {Colors} from 'style';
import {ToastProps, ToastPreset} from '../types';

const checkMarkIcon = require('../assets/checkmarkFlat.png');
const exclamationIcon = require('../assets/exclamationFill.png');
const infoIcon = require('../assets/info.png');
const redCloudIcon = require('../assets/redCloud.png');

export default ({preset, icon, iconColor, message}: Pick<ToastProps, 'preset' | 'icon' | 'message' | 'iconColor'>) => {
  const getIcon = () => {
    if (icon) {
      return icon;
    }
    if (preset) {
      switch (preset) {
        case ToastPreset.SUCCESS:
          return checkMarkIcon;
        case ToastPreset.FAILURE:
          return exclamationIcon;
        case ToastPreset.OFFLINE:
          return redCloudIcon;
        case ToastPreset.GENERAL:
        default:
          return infoIcon;
      }
    }

    return infoIcon;
  };

  const getIconColor = () => {
    if (icon || iconColor) {
      return iconColor;
    }

    if (preset) {
      switch (preset) {
        case ToastPreset.SUCCESS:
          return Colors.green40;
        case ToastPreset.FAILURE:
          return Colors.red40;
        case ToastPreset.GENERAL:
        default:
          return Colors.getColorTint(Colors.primary, 50);
      }
    } else {
      return Colors.getColorTint(Colors.primary, 50);
    }
  };

  const getAccessibilityMessage = () => {
    let presetText = '';
    if (preset) {
      switch (preset) {
        case ToastPreset.SUCCESS:
          presetText = 'Success';
          break;
        case ToastPreset.FAILURE:
          presetText = 'Alert';
          break;
        default:
          break;
      }
    }

    return `${presetText} notification, ${message}`;
  };

  return {
    icon: getIcon(),
    iconColor: getIconColor(),
    accessibilityMessage: getAccessibilityMessage()
  };
};
