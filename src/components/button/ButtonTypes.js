import _pt from "prop-types";
import React, { PureComponent } from 'react';
export let ButtonSize;

(function (ButtonSize) {
  ButtonSize["xSmall"] = "xSmall";
  ButtonSize["small"] = "small";
  ButtonSize["medium"] = "medium";
  ButtonSize["large"] = "large";
})(ButtonSize || (ButtonSize = {}));

export let ButtonAnimationDirection;

(function (ButtonAnimationDirection) {
  ButtonAnimationDirection["center"] = "center";
  ButtonAnimationDirection["left"] = "left";
  ButtonAnimationDirection["right"] = "right";
})(ButtonAnimationDirection || (ButtonAnimationDirection = {}));

export const DEFAULT_PROPS = {
  iconOnRight: false
};
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendsLink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Sizes.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Typographies.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Outlines.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Corners.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Custom.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Inspirations.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Round.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Full.png?raw=true
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Animated.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.tsx
 */
// @ts-ignore 

class FakeButtonForDocs extends PureComponent {
  static propTypes = {
    /**
         * Text to show inside the button
         */
    label: _pt.string,

    /**
         * The Button text color (inherited from Text component)
         */
    color: _pt.string,

    /**
         * Should the icon be right to the label
         */
    iconOnRight: _pt.bool,

    /**
         * whether the icon should flip horizontally on RTL locals
         */
    supportRTL: _pt.bool,

    /**
         * Color of the button background
         */
    backgroundColor: _pt.string,

    /**
         * Color of the disabled button background
         */
    disabledBackgroundColor: _pt.string,

    /**
         * Size of the button [large, medium, small, xSmall]
         */
    size: _pt.oneOf(["xSmall", "small", "medium", "large"]),

    /**
         * Custom border radius.
         */
    borderRadius: _pt.number,

    /**
         * Actions handler
         */
    onPress: _pt.func,

    /**
         * Disable interactions for the component
         */
    disabled: _pt.bool,

    /**
         * Button will have outline style
         */
    outline: _pt.bool,

    /**
         * The outline color
         */
    outlineColor: _pt.string,

    /**
         * The outline width
         */
    outlineWidth: _pt.number,

    /**
         * Button will look like a link
         */
    link: _pt.bool,

    /**
         * label color for when it's displayed as link
         */
    linkColor: _pt.string,

    /**
         * should the button act as a coast to coast button (no border radius)
         */
    fullWidth: _pt.bool,

    /**
         * should the button be a round button
         */
    round: _pt.bool,

    /**
         * Control shadow visibility (iOS-only)
         */
    enableShadow: _pt.bool,

    /**
         * avoid inner button padding
         */
    avoidInnerPadding: _pt.bool,

    /**
         * avoid minimum width constraints
         */
    avoidMinWidth: _pt.bool,

    /**
         * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
         * better set using ThemeManager
         */
    getActiveBackgroundColor: _pt.func,

    /**
         * should animate layout change
         * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
         */
    animateLayout: _pt.bool,

    /**
         * the direction of the animation ('left' and 'right' will effect the button's own alignment)
         */
    animateTo: _pt.oneOf(["center", "left", "right"])
  };
  // eslint-disable-line
  static displayName = 'Button';
  static defaultProps = DEFAULT_PROPS;

  render() {
    return null;
  }

}