import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  // eslint-disable-next-line no-unused-vars
  ViewStyle,
  // eslint-disable-next-line no-unused-vars
  ImageStyle,
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

type Styles = {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
};

enum Location {
  Top,
  Bottom,
  Left,
  Right
}

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
    const styles = useRef<Styles>({});
    const [layoutWidth, setLayoutWidth] = useState(0);
    const [layoutHeight, setLayoutHeight] = useState(0);

    const getStyles = useCallback(
      (fadeSize: number) => {
        let location;
        if (options.horizontal) {
          location = options.setToStart ? Location.Left : Location.Right;
        } else {
          location = options.setToStart ? Location.Top : Location.Bottom;
        }

        let containerStyle: ViewStyle;
        let size = layoutWidth,
          inverseTranslate = false,
          rotate,
          translateY;
        switch (location) {
          case Location.Left:
            containerStyle = {...staticStyles.containerLeft, width: fadeSize};
            rotate = '180deg';
            size = layoutHeight;
            break;
          case Location.Right:
            containerStyle = {...staticStyles.containerRight, width: fadeSize};
            rotate = '0deg';
            size = layoutHeight;
            inverseTranslate = true;
            break;
          case Location.Top:
            containerStyle = {...staticStyles.containerTop, height: fadeSize};
            rotate = '270deg';
            inverseTranslate = true;
            break;
          case Location.Bottom:
          default:
            containerStyle = {
              ...staticStyles.containerBottom,
              height: fadeSize
            };
            rotate = '90deg';
            break;
        }

        const scaleY = size / fadeSize;
        translateY = scaleY ? (fadeSize - size) / (2 * scaleY) : 0;
        if (inverseTranslate) {
          translateY = -translateY;
        }

        return {
          containerStyle,
          imageStyle: {
            width: fadeSize,
            height: fadeSize,
            transform: [{rotate}, {scaleY}, {translateY}]
          }
        };
      },
      [layoutWidth, layoutHeight]
    );

    useEffect(() => {
      const fadeSize = options.size || DEFAULT_FADE_SIZE;
      styles.current = getStyles(fadeSize);
    }, [getStyles]);

    const onLayout = useCallback(
      (event: LayoutChangeEvent) => {
        setLayoutWidth(event.nativeEvent.layout.width);
        setLayoutHeight(event.nativeEvent.layout.height);
      },
      [setLayoutWidth, setLayoutHeight]
    );

    const renderFader = useCallback(() => {
      const showImage =
        (layoutWidth > 0 || layoutHeight > 0) &&
        (options.setToStart
          ? !props.scrollReachedProps.isScrollAtStart
          : !props.scrollReachedProps.isScrollAtEnd);
      return (
        <View
          pointerEvents={'none'}
          style={styles.current.containerStyle}
          onLayout={onLayout}
        >
          {showImage && (
            <Image
              source={gradientImage()}
              tintColor={options.tintColor}
              style={styles.current.imageStyle}
              resizeMode={'stretch'}
            />
          )}
        </View>
      );
    }, [
      layoutWidth,
      layoutHeight,
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
