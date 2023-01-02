import {isEmpty} from 'lodash';
import React from 'react';
import {StyleProp, View as RNView, ViewStyle} from 'react-native';
import {useAnimatedStyle} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {asBaseComponent} from '../../commons/new';
import View, {ViewProps} from '../../components/view';
import {PanningDirections, PanningDirectionsEnum} from './panningUtil';
import useHiddenLocation from '../hooks/useHiddenLocation';
import usePanGesture, {
  PanGestureProps,
  PanViewDirections,
  PanViewDirectionsEnum,
  PanViewDismissThreshold,
  DEFAULT_DIRECTIONS
} from './usePanGesture';
export {
  PanningDirections,
  PanningDirectionsEnum,
  PanViewDirections,
  PanViewDirectionsEnum,
  PanViewDismissThreshold,
  DEFAULT_DIRECTIONS
};
import {getAnimation} from '../AnimationUtils';

export interface PanViewProps extends Omit<PanGestureProps, 'hiddenLocation'>, ViewProps {
  /**
   * Add a style to the container
   */
  containerStyle?: StyleProp<ViewStyle>;
}

interface Props extends PanViewProps {
  children?: React.ReactNode | React.ReactNode[];
}

const PanView = (props: Props) => {
  const {
    directions = DEFAULT_DIRECTIONS,
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold,
    containerStyle,
    children,
    ...others
  } = props;

  const {setRef, onLayout, hiddenLocation} = useHiddenLocation<RNView>();
  const {animationDetails, panGestureEvent} = usePanGesture({
    directions,
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold,
    hiddenLocation
  });

  const animatedStyle = useAnimatedStyle(() => {
    const animation = getAnimation(animationDetails);
    const transform = [];
    if (animation.x) {
      transform.push({translateX: animation.x});
    }

    if (animation.y) {
      transform.push({translateY: animation.y});
    }

    return {
      transform
    };
  });

  return (
    <View ref={setRef} style={containerStyle} onLayout={onLayout}>
      <PanGestureHandler onGestureEvent={isEmpty(directions) ? undefined : panGestureEvent}>
        <View reanimated style={animatedStyle}>
          <View {...others}>{children}</View>
        </View>
      </PanGestureHandler>
    </View>
  );
};

PanView.displayName = 'PanView';
PanView.directions = PanViewDirectionsEnum;

export default asBaseComponent<PanViewProps, typeof PanView>(PanView);
