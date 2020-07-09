import React, {useCallback} from 'react';
import {
  StyleSheet,
  // eslint-disable-next-line no-unused-vars
  FlatListProps,
  // eslint-disable-next-line no-unused-vars
  ScrollViewProps,
  // eslint-disable-next-line no-unused-vars
  NativeSyntheticEvent,
  // eslint-disable-next-line no-unused-vars
  NativeScrollEvent
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import forwardRef, {ForwardRefInjectedProps} from '../../commons/forwardRef';
import withScrollReached, {
  // eslint-disable-next-line no-unused-vars
  WithScrollReachedProps,
  // eslint-disable-next-line no-unused-vars
  WithScrollReachedOptionsProps
} from '../../commons/withScrollReached';
import View from '../view';
import Image from '../image';
import Assets from '../../assets';

export type ScrollFaderProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * Use to render the fade
   */
  renderFader: () => React.ReactNode;
};

declare type SupportedViewsProps = FlatListProps<any> | ScrollViewProps;

export type WithScrollFaderOptionsProps = WithScrollReachedOptionsProps & {
  /**
   * Should the fader be set on the start or the end of the scroll (the image is different), defaults to end
   */
  setToStart?: boolean;
  /**
   * Set to change from the default size (50) of the fade view.
   */
  size?: number;
  /**
   * Change the default (white) tint color of the fade view.
   */
  tintColor?: string;
};

export type WithScrollFaderProps = {
  scrollFaderProps: ScrollFaderProps;
  ref?: any;
};

type PropTypes = ForwardRefInjectedProps &
  SupportedViewsProps &
  WithScrollReachedProps;

const DEFAULT_FADE_SIZE = 50;

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
    const getStyles = useCallback(() => {
      const fadeSize = options.size || DEFAULT_FADE_SIZE;

      let containerStyle, imageStyle, imageSource;
      if (options.horizontal) {
        if (options.setToStart) {
          // Left
          containerStyle = {...staticStyles.containerLeft, width: fadeSize};
          imageStyle = {height: '100%', width: fadeSize};
          imageSource = Assets.images.gradientLeft;
        } else {
          // Right
          containerStyle = {...staticStyles.containerRight, width: fadeSize};
          imageStyle = {height: '100%', width: fadeSize};
          imageSource = Assets.images.gradientRight;
        }
      } else if (options.setToStart) {
        // Top
        containerStyle = {...staticStyles.containerTop, height: fadeSize};
        imageStyle = {height: fadeSize, width: '100%'};
        imageSource = Assets.images.gradientTop;
      } else {
        // Bottom
        containerStyle = {
          ...staticStyles.containerBottom,
          height: fadeSize
        };
        imageStyle = {height: fadeSize, width: '100%'};
        imageSource = Assets.images.gradientBottom;
      }

      return {
        containerStyle,
        imageStyle,
        imageSource
      };
    }, []);

    const renderFader = useCallback(() => {
      const styles = getStyles();
      const showImage = options.setToStart
        ? !props.scrollReachedProps.isScrollAtStart
        : !props.scrollReachedProps.isScrollAtEnd;
      return (
        <View pointerEvents={'none'} style={styles.containerStyle}>
          {showImage && (
            <Image
              source={styles.imageSource}
              tintColor={options.tintColor}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          )}
        </View>
      );
    }, [
      getStyles,
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

const staticStyles = StyleSheet.create({
  containerTop: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  containerBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  containerLeft: {
    position: 'absolute',
    left: 0,
    height: '100%'
  },
  containerRight: {
    position: 'absolute',
    right: 0,
    height: '100%'
  }
});
