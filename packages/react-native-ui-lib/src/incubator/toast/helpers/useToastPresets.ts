import 'react';
import {Colors} from 'style';
import {ToastProps, ToastPresets} from '../types';

const checkMarkIcon = require('../assets/checkmarkFlat.png');
const exclamationIcon = require('../assets/exclamationFill.png');
const infoIcon = require('../assets/info.png');
const redCloudIcon = require('../assets/redCloud.png');

const TOAST_PRESETS = {
  [ToastPresets.GENERAL]: {
    icon: infoIcon,
    iconColor: Colors.$iconPrimaryLight,
    accessibilityMessagePrefix: ''
  },
  [ToastPresets.SUCCESS]: {
    icon: checkMarkIcon,
    iconColor: Colors.$iconSuccessLight,
    accessibilityMessagePrefix: 'Success'
  },
  [ToastPresets.FAILURE]: {
    icon: exclamationIcon,
    iconColor: Colors.$iconDangerLight,
    accessibilityMessagePrefix: 'Alert'
  },
  [ToastPresets.OFFLINE]: {
    icon: redCloudIcon,
    iconColor: Colors.$iconPrimaryLight,
    accessibilityMessagePrefix: 'Offline'
  }
};

export default ({preset, icon, iconColor, message}: Pick<ToastProps, 'preset' | 'icon' | 'message' | 'iconColor'>) => {
  const toastPreset = preset ? TOAST_PRESETS[preset] : undefined;

  return {
    icon: icon ?? toastPreset?.icon,
    iconColor: iconColor ?? toastPreset?.iconColor,
    accessibilityMessage: `${toastPreset?.accessibilityMessagePrefix} notification, ${message}`
  };
};
