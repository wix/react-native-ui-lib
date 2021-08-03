import React, {PropsWithChildren, PureComponent} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons/new';
import {Colors, Spacings} from '../../style';
import View from '../view';
import Button, {ButtonProps} from '../button';
import Image from '../image';

export interface FloatingButtonProps {
  /**
   * Whether the button is visible
   */
  visible?: boolean;
  /**
   * Button element (all Button's component's props)
   */
  button?: PropsWithChildren<ButtonProps>;
  /**
   * Secondary button element (all Button's component's props)
   */
  secondaryButton?: PropsWithChildren<ButtonProps>;
  /**
   * The bottom margin of the button, or secondary button if passed
   */
  bottomMargin?: number;
  /**
   * The duration of the button's animations (show/hide)
   */
  duration?: number;
  /**
   * Whether to show/hide the button without animation
   */
  withoutAnimation?: boolean;
  /**
   * Whether to show background overlay
   */
  hideBackgroundOverlay?: boolean;
  /**
   * Used as testing identifier
   * <TestID> - the floatingButton container
   * <TestID>.button - the floatingButton main button
   * <TestID>.secondaryButton - the floatingButton secondaryButton
   */
  testID?: string;
}

const gradientImage = () => require('./gradient.png');

/**
 * @description: Hovering button with gradient background
 * @modifiers: margin, background, color
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true
 */
class FloatingButton extends PureComponent<FloatingButtonProps> {
  static displayName = 'FloatingButton';

  static defaultProps = {
    duration: 300
  };

  initialVisibility?: boolean;
  firstLoad: boolean;
  visibleAnimated: Animated.Value;

  constructor(props: FloatingButtonProps) {
    super(props);

    this.initialVisibility = props.visible;
    this.firstLoad = true;
    this.visibleAnimated = new Animated.Value(Number(!!props.visible));
  }

  componentDidUpdate(prevProps: FloatingButtonProps) {
    const {visible, duration} = this.props;

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
      transform: [{translateY: this.visibleAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [Constants.screenHeight / 2, 0]
      })}]
    };
  }

  renderButton() {
    const {bottomMargin, button, secondaryButton, testID} = this.props;
    const bottom = secondaryButton ? Spacings.s4 : bottomMargin || Spacings.s8;

    return (
      <Button
        size={Button.sizes.large}
        style={[styles.shadow, {marginTop: 16, marginBottom: bottom}]}
        testID={`${testID}.button`}
        {...button}
      />
    );
  }

  renderOverlay = () => {
    if (!this.props.hideBackgroundOverlay) {
      return (
        <View pointerEvents={'none'} style={styles.image}>
          <Image
            style={styles.image}
            source={gradientImage()}
            resizeMode={'stretch'}
          />
        </View>
      );
    }
  };

  renderSecondaryButton() {
    const {secondaryButton, bottomMargin, testID} = this.props;

    return (
      <Button
        link
        size={Button.sizes.large}
        testID={`${testID}.secondaryButton`}
        {...secondaryButton}
        style={{marginBottom: bottomMargin || Spacings.s7}}
        enableShadow={false}
      />
    );
  }

  render() {
    const {withoutAnimation, secondaryButton, visible, testID} = this.props;
    // NOTE: keep this.firstLoad as true as long as the visibility changed to true
    this.firstLoad && !visible ? this.firstLoad = true : this.firstLoad = false;

    // NOTE: On first load, don't show if it should not be visible
    if (this.firstLoad === true && !this.initialVisibility) {
      return false;
    }
    if (!visible && withoutAnimation) {
      return false;
    }

    return (
      <View
        pointerEvents="box-none"
        animated
        style={[styles.container, this.getAnimatedStyle()]}
        testID={testID}
      >
        {this.renderOverlay()}
        {this.renderButton()}
        {secondaryButton && this.renderSecondaryButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    alignItems: 'center',
    zIndex: Constants.isAndroid ? 99 : undefined
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  shadow: {
    shadowColor: Colors.dark40,
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 2
  }
});

export default asBaseComponent<FloatingButtonProps>(FloatingButton);
