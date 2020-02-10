import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('unicorn.nativeComponents.HighlightOverlayViewScreen', () => require('./HighlightOverlayViewScreen').default);
Navigation.registerComponent('unicorn.nativeComponents.SafeAreaSpacerViewScreen', () => require('./SafeAreaSpacerViewScreen').default);
Navigation.registerComponent('unicorn.nativeComponents.WheelPickerViewScreen', () => require('./WheelPickerViewScreen').default);
Navigation.registerComponent('unicorn.nativeComponents.KeyboardTrackingViewScreen', () => require('./KeyboardTrackingViewScreen').default);

