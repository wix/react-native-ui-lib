import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  // eslint-disable-next-line no-unused-vars
  ViewStyle,
  // eslint-disable-next-line no-unused-vars
  TransformsStyle,
  // eslint-disable-next-line no-unused-vars
  FlatListProps,
  // eslint-disable-next-line no-unused-vars
  ScrollViewProps,
  // eslint-disable-next-line no-unused-vars
  NativeSyntheticEvent,
  // eslint-disable-next-line no-unused-vars
  NativeScrollEvent,
  // eslint-disable-next-line no-unused-vars
  LayoutChangeEvent
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

const gradientImage = () => require('../../assets/images/gradient.png');
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
    const fadeSize = useRef(DEFAULT_FADE_SIZE);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (options.size) {
        fadeSize.current = options.size;
      }
    }, []);

    const getStyles = useCallback(() => {
      let containerStyle: ViewStyle;
      let imageTransformStyle: TransformsStyle;
      if (options.horizontal) {
        containerStyle = options.setToStart
          ? {...staticStyles.containerLeft, width: fadeSize.current}
          : {...staticStyles.containerRight, width: fadeSize.current};
        const scaleY = height / fadeSize.current;
        const translateY = scaleY ? (fadeSize.current - height) / (2 * scaleY) : 0;
        imageTransformStyle = options.setToStart
          ? {transform: [{rotate: '180deg'}, {scaleY}, {translateY}]}
          : {transform: [{rotate: '0deg'}, {scaleY}, {translateY: -translateY}]};
      } else {
        containerStyle = options.setToStart
          ? {...staticStyles.containerTop, height: fadeSize.current}
          : {...staticStyles.containerBottom, height: fadeSize.current};
        const scaleY = width / fadeSize.current;
        const translateY = scaleY ? (fadeSize.current - width) / (2 * scaleY) : 0;
        imageTransformStyle = options.setToStart
          ? {transform: [{rotate: '270deg'}, {scaleY}, {translateY: -translateY}]}
          : {transform: [{rotate: '90deg'}, {scaleY}, {translateY}]};
      }

      return {
        containerStyle,
        imageTransformStyle
      };
    }, [width, height]);

    const onLayout = useCallback(
      (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width);
        setHeight(event.nativeEvent.layout.height);
      },
      [setWidth, setHeight]
    );
    const renderFader = useCallback(() => {
      const styles = getStyles();

      if (
        options.setToStart
          ? !props.scrollReachedProps.isScrollAtStart
          : !props.scrollReachedProps.isScrollAtEnd
      ) {
        return (
          <View
            pointerEvents={'none'}
            style={styles.containerStyle}
            onLayout={onLayout}
          >
            <Image
              source={gradientImage()}
              tintColor={options.tintColor}
              style={[
                {width: fadeSize.current, height: fadeSize.current},
                styles.imageTransformStyle
              ]}
              resizeMode={'stretch'}
            />
          </View>
        );
      }
    }, [
      getStyles,
      onLayout,
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
