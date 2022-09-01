import { Platform } from 'react-native';

let BlurView = null;
if (Platform.OS === 'web') {
    BlurView = require('./BlurView.web')
} else if (Platform.OS === 'android') {
    BlurView = require('./BlurView.android')
} else {
    BlurView = require('./BlurView.ios')
}

export default BlurView;