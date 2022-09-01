import { Platform } from 'react-native';

let VibrancyView = null;
if (Platform.OS === 'web') {
    VibrancyView = require('./VibrancyView.web')
} else if (Platform.OS === 'android') {
    VibrancyView = require('./VibrancyView.android')
} else {
    VibrancyView = require('./VibrancyView.ios')
}

export default VibrancyView;