/// <reference types="react" />
interface Props {
    dialogVisibility: boolean;
    modalVisibility: boolean;
    overlayBackgroundColor: string;
}
declare const OverlayFadingBackground: {
    ({ dialogVisibility, modalVisibility, overlayBackgroundColor }: Props): JSX.Element;
    displayName: string;
};
export default OverlayFadingBackground;
