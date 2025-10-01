import React from 'react';
interface Props {
    testID?: string;
    dialogVisibility?: boolean;
    modalVisibility?: boolean;
    overlayBackgroundColor?: string;
    onFadeDone?: () => void;
    fadeOut?: boolean;
}
declare const OverlayFadingBackground: {
    ({ testID, dialogVisibility, modalVisibility, overlayBackgroundColor, onFadeDone: propsOnFadeDone, fadeOut }: Props): React.JSX.Element;
    displayName: string;
};
export default OverlayFadingBackground;
