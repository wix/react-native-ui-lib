/// <reference types="react" />
interface Props {
    testID?: string;
    dialogVisibility?: boolean;
    modalVisibility?: boolean;
    overlayBackgroundColor?: string;
    onFadeDone?: () => void;
}
declare const OverlayFadingBackground: {
    ({ testID, dialogVisibility, modalVisibility, overlayBackgroundColor, onFadeDone }: Props): JSX.Element;
    displayName: string;
};
export default OverlayFadingBackground;
