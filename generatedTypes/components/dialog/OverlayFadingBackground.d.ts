/// <reference types="react" />
interface Props {
    testID?: string;
    dialogVisibility?: boolean;
    modalVisibility?: boolean;
    overlayBackgroundColor?: string;
}
declare const OverlayFadingBackground: {
    ({ testID, dialogVisibility, modalVisibility, overlayBackgroundColor }: Props): JSX.Element;
    displayName: string;
};
export default OverlayFadingBackground;
