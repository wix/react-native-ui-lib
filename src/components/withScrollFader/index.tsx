import React, {useCallback} from 'react';
import {
  FlatListProps,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import forwardRef, {ForwardRefInjectedProps} from '../../commons/forwardRef';
import withScrollReached, {
  WithScrollReachedProps,
  WithScrollReachedOptionsProps
} from '../../commons/withScrollReached';
import Fader, {FaderProps} from '../fader';

export type ScrollFaderProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * Use to render the fade
   */
  renderFader: () => React.ReactNode;
};

declare type SupportedViewsProps = FlatListProps<any> | ScrollViewProps;

export type WithScrollFaderOptionsProps = WithScrollReachedOptionsProps &
  FaderProps;

export type WithScrollFaderProps = {
  scrollFaderProps: ScrollFaderProps;
  ref?: any;
};

type PropTypes = ForwardRefInjectedProps &
  SupportedViewsProps &
  WithScrollReachedProps;

/**
 * @description: Creates a fade view over a scroll (when needed)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WithScrollFaderScreen.tsx
 * @notes: Send `props.scrollFaderProps.onScroll` to your onScroll and receive the fade component via props.scrollFaderProps.renderFader
 */
function withScrollFader<PROPS>(
  WrappedComponent: React.ComponentType<PROPS & WithScrollFaderProps>,
  options: WithScrollFaderOptionsProps = {}
): React.ComponentType<PROPS> {
  const ContentFader = (props: PROPS & PropTypes) => {
    const renderFader = useCallback(() => {
      const visible =
        options.location === Fader.location.LEFT ||
        options.location === Fader.location.TOP
          ? !props.scrollReachedProps.isScrollAtStart
          : !props.scrollReachedProps.isScrollAtEnd;
      return <Fader visible={visible} location={options.location} />;
    }, [
      props.scrollReachedProps.isScrollAtStart,
      props.scrollReachedProps.isScrollAtEnd
    ]);

    return (
      <WrappedComponent
        {...props}
        scrollFaderProps={{
          onScroll: props.scrollReachedProps.onScroll,
          renderFader
        }}
        ref={props.forwardedRef}
      />
    );
  };

  return withScrollReached(forwardRef(ContentFader), {
    horizontal: options.horizontal,
    threshold: options.threshold
  });
}

export default withScrollFader;
