import React, { PropsWithChildren } from 'react';
import { DialogCloseButtonProps } from './types';
interface InternalDialogCloseButtonProps extends PropsWithChildren<DialogCloseButtonProps> {
    close: () => void;
}
declare const useDialogContent: (props: InternalDialogCloseButtonProps) => {
    renderDialogContent: () => React.JSX.Element;
    containerStyle: false | "" | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<import("react-native").ViewStyle | import("react-native").Falsy | import("react-native").RegisteredStyle<import("react-native").ViewStyle>> | (import("react-native").StyleProp<import("react-native").ViewStyle> | {
        backgroundColor: string;
    })[] | null | undefined;
    containerProps: Omit<import("../../components/view").ViewProps, "style" | "testID" | "ref" | "onLayout" | "animated" | "reanimated"> | undefined;
};
export default useDialogContent;
