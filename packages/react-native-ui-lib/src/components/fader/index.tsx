import _ from 'lodash';
import React, {useMemo} from 'react';
import {StyleSheet, StyleProp, ImageStyle} from 'react-native';
import View from '../view';
import Image, {ImageProps} from '../image';
import {Colors} from 'style';

export enum FaderPosition {
  START = 'START',
  END = 'END',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM'
}

export type FaderProps = Pick<ImageProps, 'supportRTL'> & {
  /**
   * Whether the fader is visible (default is true)
   */
  visible?: boolean;
  /**
   * The position of the fader (the image is different), defaults to Fader.position.END
   */
  position?: FaderPosition | `${FaderPosition}`;
  /**
   * Set to change from the default size (50) of the fade view.
   */
  size?: number;
  /**
   * Change the default tint color of the fade view.
   */
  tintColor?: string;
};

const DEFAULT_FADE_SIZE = 50;

/**
 * @description: A gradient fading overlay to render on top of overflowing content (like scroll component)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/src/screens/componentScreens/FaderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/Fader/Fader.gif?raw=true
 */
function Fader(props: FaderProps) {
  const {
    size = DEFAULT_FADE_SIZE,
    position = FaderPosition.END,
    visible,
    tintColor = Colors.$backgroundDefault
  } = props;

  const styles = useMemo(() => {
    let containerStyle, imageStyle: StyleProp<ImageStyle>, imageSource;
    switch (position) {
      case FaderPosition.START:
        containerStyle = {...staticStyles.containerLeft, width: size};
        imageStyle = {height: '100%', width: size};
        imageSource = require('./gradientLeft.png');
        break;
      case FaderPosition.END:
        containerStyle = {...staticStyles.containerRight, width: size};
        imageStyle = {height: '100%', width: size};
        imageSource = require('./gradientRight.png');
        break;
      case FaderPosition.TOP:
        containerStyle = {...staticStyles.containerTop, height: size};
        imageStyle = {height: size, width: '100%'};
        imageSource = require('./gradientTop.png');
        break;
      case FaderPosition.BOTTOM:
        containerStyle = {
          ...staticStyles.containerBottom,
          height: size
        };
        imageStyle = {height: size, width: '100%'};
        imageSource = require('./gradientBottom.png');
        break;
    }

    return {
      containerStyle,
      imageStyle,
      imageSource
    };
  }, [size, position]);

  return (
    <View pointerEvents={'none'} style={styles.containerStyle}>
      {(visible || _.isUndefined(visible)) && (
        <Image
          supportRTL
          source={styles.imageSource}
          tintColor={tintColor}
          style={styles.imageStyle}
          resizeMode={'stretch'}
        />
      )}
    </View>
  );
}

Fader.displayName = 'Fader';
Fader.position = FaderPosition;

export default Fader;

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
