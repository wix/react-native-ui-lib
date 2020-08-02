import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import Image from '../image';

export enum FaderLocation {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM'
}

export type FaderProps = {
  /**
   * Whether the fader is visible (default is true)
   */
  visible?: boolean;
  /**
   * The location of the fader (the image is different), defaults to Fader.location.RIGHT
   */
  location?: FaderLocation;
  /**
   * Set to change from the default size (50) of the fade view.
   */
  size?: number;
  /**
   * Change the default (white) tint color of the fade view.
   */
  tintColor?: string;
};

const DEFAULT_FADE_SIZE = 50;

function Fader(props: FaderProps) {
  const getFadeSize = useCallback(() => {
    return props.size || DEFAULT_FADE_SIZE;
  }, [props.size]);

  const fadeSize = getFadeSize();
  const getStyles = useCallback(() => {
    const location = props.location || FaderLocation.RIGHT;
    let containerStyle, imageStyle, imageSource;
    switch (location) {
      case FaderLocation.LEFT:
        containerStyle = {...staticStyles.containerLeft, width: fadeSize};
        imageStyle = {height: '100%', width: fadeSize};
        imageSource = require('./gradientLeft.png');
        break;
      case FaderLocation.RIGHT:
        containerStyle = {...staticStyles.containerRight, width: fadeSize};
        imageStyle = {height: '100%', width: fadeSize};
        imageSource = require('./gradientRight.png');
        break;
      case FaderLocation.TOP:
        containerStyle = {...staticStyles.containerTop, height: fadeSize};
        imageStyle = {height: fadeSize, width: '100%'};
        imageSource = require('./gradientTop.png');
        break;
      case FaderLocation.BOTTOM:
        containerStyle = {
          ...staticStyles.containerBottom,
          height: fadeSize
        };
        imageStyle = {height: fadeSize, width: '100%'};
        imageSource = require('./gradientBottom.png');
        break;
    }

    return {
      containerStyle,
      imageStyle,
      imageSource
    };
  }, [fadeSize, props.location]);

  const isVisible = useCallback(() => {
    return props.visible || _.isUndefined(props.visible);
  }, [props.visible]);

  const styles = getStyles();
  const visible = isVisible();

  return (
    <View pointerEvents={'none'} style={styles.containerStyle}>
      {visible && (
        <Image
          source={styles.imageSource}
          tintColor={props.tintColor}
          style={styles.imageStyle}
          resizeMode={'stretch'}
        />
      )}
    </View>
  );
}

Fader.displayName = 'Fader';
Fader.location = FaderLocation;

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
