import type {ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NativeProps extends ViewProps {
  // SafeAreaSpacerView doesn't need additional props beyond basic ViewProps
  // The native implementation handles safe area insets automatically
}

export default codegenNativeComponent<NativeProps>('SafeAreaSpacerView');
