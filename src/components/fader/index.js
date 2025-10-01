import _isUndefined from "lodash/isUndefined";
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import View from "../view";
import Image from "../image";
import { Colors } from "../../style";
export let FaderPosition = /*#__PURE__*/function (FaderPosition) {
  FaderPosition["START"] = "START";
  FaderPosition["END"] = "END";
  FaderPosition["TOP"] = "TOP";
  FaderPosition["BOTTOM"] = "BOTTOM";
  return FaderPosition;
}({});
const DEFAULT_FADE_SIZE = 50;

/**
 * @description: A gradient fading overlay to render on top of overflowing content (like scroll component)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FaderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Fader/Fader.gif?raw=true
 */
function Fader(props) {
  const {
    size = DEFAULT_FADE_SIZE,
    position = FaderPosition.END,
    visible,
    tintColor = Colors.$backgroundDefault
  } = props;
  const styles = useMemo(() => {
    let containerStyle, imageStyle, imageSource;
    switch (position) {
      case FaderPosition.START:
        containerStyle = {
          ...staticStyles.containerLeft,
          width: size
        };
        imageStyle = {
          height: '100%',
          width: size
        };
        imageSource = require("./gradientLeft.png");
        break;
      case FaderPosition.END:
        containerStyle = {
          ...staticStyles.containerRight,
          width: size
        };
        imageStyle = {
          height: '100%',
          width: size
        };
        imageSource = require("./gradientRight.png");
        break;
      case FaderPosition.TOP:
        containerStyle = {
          ...staticStyles.containerTop,
          height: size
        };
        imageStyle = {
          height: size,
          width: '100%'
        };
        imageSource = require("./gradientTop.png");
        break;
      case FaderPosition.BOTTOM:
        containerStyle = {
          ...staticStyles.containerBottom,
          height: size
        };
        imageStyle = {
          height: size,
          width: '100%'
        };
        imageSource = require("./gradientBottom.png");
        break;
    }
    return {
      containerStyle,
      imageStyle,
      imageSource
    };
  }, [size, position]);
  return <View pointerEvents={'none'} style={styles.containerStyle}>
      {(visible || _isUndefined(visible)) && <Image supportRTL source={styles.imageSource} tintColor={tintColor} style={styles.imageStyle} resizeMode={'stretch'} />}
    </View>;
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