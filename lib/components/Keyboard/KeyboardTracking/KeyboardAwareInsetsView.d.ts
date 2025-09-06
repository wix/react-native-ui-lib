import React from 'react';
import { KeyboardTrackingViewProps } from './KeyboardTrackingView';
type Props = KeyboardTrackingViewProps & {
    offset?: number;
};
/**
 * @description: Used to add an inset when a keyboard is used and might hide part of the screen.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen/InputsScreen.js
 * @notes: This view is useful only for iOS.
 */
declare const KeyboardAwareInsetsView: {
    (props: Props): React.JSX.Element;
    displayName: string;
};
export default KeyboardAwareInsetsView;
