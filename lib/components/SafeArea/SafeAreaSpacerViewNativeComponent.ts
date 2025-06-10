import type {ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// SafeAreaSpacerView doesn't need additional props beyond basic ViewProps
// The native implementation handles safe area insets automatically
export default codegenNativeComponent<ViewProps>('SafeAreaSpacerView');
