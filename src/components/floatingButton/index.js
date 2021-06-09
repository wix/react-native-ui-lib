import _pt from "prop-types";
import React, { PureComponent } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Constants } from "../../helpers";
import { asBaseComponent } from "../../commons/new";
import { Colors, Spacings } from "../../style";
import View from "../view";
import Button from "../button";
import Image from "../image";

const gradientImage = () => require("./gradient.png");
/**
 * @description: Hovering button with gradient background
 * @modifiers: margin, background, color
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx
 * @extends: Button
 * @extendsLink: https://github.com/wix/react-native-ui-lib/blob/master/src/components/button/index.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true
 */


class FloatingButton extends PureComponent {
  static propTypes = {
    /**
       * Whether the button is visible
       */
    visible: _pt.bool,

    /**
       * The bottom margin of the button, or secondary button if passed
       */
    bottomMargin: _pt.number,

    /**
       * The duration of the button's animations (show/hide)
       */
    duration: _pt.number,

    /**
       * Whether to show/hide the button without animation
       */
    withoutAnimation: _pt.bool,

    /**
       * Whether to show background overlay
       */
    hideBackgroundOverlay: _pt.bool,

    /**
       * Used as testing identifier
       */
    testID: _pt.string
  };
  static displayName = 'FloatingButton';
  static defaultProps = {
    duration: 300
  };

  constructor(props) {
    super(props);
    this.initialVisibility = props.visible;
    this.firstLoad = true;
    this.visibleAnimated = new Animated.Value(Number(!!props.visible));
  }

  componentDidUpdate(prevProps) {
    const {
      visible,
      duration
    } = this.props;

    if (prevProps.visible !== visible) {
      Animated.timing(this.visibleAnimated, {
        toValue: Number(!!visible),
        duration,
        useNativeDriver: true
      }).start();
    }
  }

  getAnimatedStyle = () => {
    return {
      opacity: this.visibleAnimated,
      transform: [{
        translateY: this.visibleAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [Constants.screenHeight / 2, 0]
        })
      }]
    };
  };

  renderButton() {
    const {
      bottomMargin,
      button,
      secondaryButton
    } = this.props;
    const bottom = secondaryButton ? Spacings.s4 : bottomMargin || Spacings.s8;
    return <Button size={Button.sizes.large} style={[styles.shadow, {
      marginTop: 16,
      marginBottom: bottom
    }]} {...button} />;
  }

  renderOverlay = () => {
    if (!this.props.hideBackgroundOverlay) {
      return <View pointerEvents={'none'} style={styles.image}>
          <Image style={styles.image} source={gradientImage()} resizeMode={'stretch'} />
        </View>;
    }
  };

  renderSecondaryButton() {
    const {
      secondaryButton,
      bottomMargin
    } = this.props;
    return <Button link size={Button.sizes.large} {...secondaryButton} style={{
      marginBottom: bottomMargin || Spacings.s7
    }} enableShadow={false} />;
  }

  render() {
    const {
      withoutAnimation,
      secondaryButton,
      visible
    } = this.props; // NOTE: keep this.firstLoad as true as long as the visibility changed to true

    this.firstLoad && !visible ? this.firstLoad = true : this.firstLoad = false; // NOTE: On first load, don't show if it should not be visible

    if (this.firstLoad === true && !this.initialVisibility) {
      return false;
    }

    if (!visible && withoutAnimation) {
      return false;
    }

    return <View pointerEvents="box-none" animated style={[styles.container, this.getAnimatedStyle()]}>
        {this.renderOverlay()}
        {this.renderButton()}
        {secondaryButton && this.renderSecondaryButton()}
      </View>;
  }

}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject,
    top: undefined,
    alignItems: 'center',
    zIndex: Constants.isAndroid ? 99 : undefined
  },
  image: { ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  shadow: {
    shadowColor: Colors.dark40,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 2
  }
});
export default asBaseComponent(FloatingButton);