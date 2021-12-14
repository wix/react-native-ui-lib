import React, {useMemo} from 'react';
import {Constants} from '../../../commons/new';
import SafeAreaSpacerView from '../../../../lib/components/SafeArea/SafeAreaSpacerView';
import {ImperativeDialogProps} from '../types';
import {AlignmentType} from './useAlignmentStyle';

export interface SafeAreaProps extends Pick<ImperativeDialogProps, 'useSafeArea'> {
  alignmentType: AlignmentType;
}

/**
 * TODO: technically useSafeArea can be sent to either PanView or TransitionView.
 * however that causes some performance \ UI bugs (when there is a safe area).
 * TransitionView is less pronouns than PanView but still not good.
 * We think this is because of reanimation 2, we should re-visit this problem later.
 */
const useSafeAreaView = (props: SafeAreaProps) => {
  const {useSafeArea, alignmentType} = props;

  const topSafeArea = useMemo(() => {
    const hasTopSafeArea = useSafeArea && alignmentType !== AlignmentType.BOTTOM;
    if (hasTopSafeArea) {
      return <SafeAreaSpacerView/>;
    }
  }, [useSafeArea, alignmentType]);

  const bottomSafeArea = useMemo(() => {
    const hasBottomSafeArea = Constants.isIphoneX && useSafeArea && alignmentType === AlignmentType.BOTTOM;
    if (hasBottomSafeArea) {
      return <SafeAreaSpacerView/>;
    }
  }, [useSafeArea, alignmentType]);

  return {topSafeArea, bottomSafeArea};
};

export default useSafeAreaView;
