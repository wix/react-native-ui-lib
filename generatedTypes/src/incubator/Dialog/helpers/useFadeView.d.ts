/// <reference types="react" />
import { ModalProps } from '../../../components/modal';
import { TransitionViewAnimationType } from '../../TransitionView';
import { ImperativeDialogProps } from '../types';
export declare type AnimationType = TransitionViewAnimationType;
export declare type FadeViewProps = Pick<ImperativeDialogProps, 'initialVisibility' | 'testID'> & Pick<ModalProps, 'overlayBackgroundColor'>;
export interface FadeViewMethods {
    hideNow: () => void;
}
declare const useFadeView: (props: FadeViewProps) => {
    FadeView: JSX.Element;
    hideNow: () => void;
    fade: (type: AnimationType) => void;
};
export default useFadeView;
