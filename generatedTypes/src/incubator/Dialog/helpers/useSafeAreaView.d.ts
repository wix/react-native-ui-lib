/// <reference types="react" />
import { ImperativeDialogProps } from '../types';
import { AlignmentType } from './useAlignmentStyle';
export interface SafeAreaProps extends Pick<ImperativeDialogProps, 'useSafeArea'> {
    alignmentType: AlignmentType;
}
/**
 * TODO: technically useSafeArea can be sent to either PanView or TransitionView.
 * however that causes some performance \ UI bugs (when there is a safe area).
 * TransitionView is less pronouns than PanView but still not good.
 * We think this is because of reanimation 2, we should re-visit this problem later.
 */
declare const useSafeAreaView: (props: SafeAreaProps) => {
    topSafeArea: JSX.Element | undefined;
    bottomSafeArea: JSX.Element | undefined;
};
export default useSafeAreaView;
