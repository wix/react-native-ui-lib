import React, {PropsWithChildren, PureComponent} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';
import {Colors, Shadows, Spacings} from '../../style';
import View from '../view';
import Image from '../image';
import Button, {ButtonProps} from '../button';

export enum FloatingButtonLayouts {
  VERTICAL = 'Vertical',
  HORIZONTAL = 'Horizontal'
}
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
   * Whether the buttons get the container's full with (vertical layout only)
   */
  fullWidth?: boolean;
  /**
   * Button layout direction: vertical or horizontal
   */
  buttonLayout?: FloatingButtonLayouts | `${FloatingButtonLayouts}`;
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
  static floatingButtonLayouts = FloatingButtonLayouts;

  static defaultProps = {
    duration: 300,
    buttonLayout: FloatingButtonLayouts.VERTICAL
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
      transform: [
        {
          translateY: this.visibleAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [Constants.screenHeight / 2, 0]
          })
        }
      ]
    };
  };

  get isSecondaryHorizontal() {
    const {secondaryButton, buttonLayout} = this.props;
    return secondaryButton && buttonLayout === FloatingButtonLayouts.HORIZONTAL;
  }

  get isSecondaryVertical() {
    const {secondaryButton, buttonLayout} = this.props;
    return secondaryButton && buttonLayout === FloatingButtonLayouts.VERTICAL;
  }

  renderButton() {
    const {bottomMargin, button, fullWidth, testID} = this.props;

    const bottom = this.isSecondaryVertical ? Spacings.s4 : bottomMargin || Spacings.s8;
    const left = this.isSecondaryHorizontal || fullWidth ? Spacings.s4 : undefined;
    const right = this.isSecondaryHorizontal ? 20 : fullWidth ? Spacings.s4 : undefined;
    const shadowStyle = !button?.outline && !button?.link && styles.shadow;
    const marginStyle = {marginTop: 16, marginBottom: bottom, marginLeft: left, marginRight: right};

    return (
      <Button
        size={Button.sizes.large}
        flex={!!this.isSecondaryHorizontal}
        style={[shadowStyle, marginStyle]}
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
            tintColor={Colors.$backgroundDefault}
          />
        </View>
      );
    }
  };

  renderSecondaryButton() {
    const {secondaryButton, bottomMargin, testID, buttonLayout} = this.props;

    const bgColor = secondaryButton?.backgroundColor || Colors.$backgroundDefault;
    const isHorizontal = buttonLayout === FloatingButtonLayouts.HORIZONTAL;
    const buttonStyle = isHorizontal ? 
      [styles.shadow, styles.secondaryMargin, {backgroundColor: bgColor}] : {marginBottom: bottomMargin || Spacings.s7};
    
    return (
      <Button
        outline={isHorizontal}
        flex={isHorizontal}
        link={!isHorizontal}
        size={Button.sizes.large}
        testID={`${testID}.secondaryButton`}
        {...secondaryButton}
        style={buttonStyle}
        enableShadow={false}
      />
    );
  }

  render() {
    const {withoutAnimation, visible, fullWidth, testID} = this.props;
    // NOTE: keep this.firstLoad as true as long as the visibility changed to true
    this.firstLoad && !visible ? (this.firstLoad = true) : (this.firstLoad = false);

    // NOTE: On first load, don't show if it should not be visible
    if (this.firstLoad === true && !this.initialVisibility) {
      return false;
    }
    if (!visible && withoutAnimation) {
      return false;
    }

    return (
      <View
        row={this.isSecondaryHorizontal}
        center={this.isSecondaryHorizontal || !fullWidth}
        pointerEvents="box-none"
        animated
        style={[styles.container, this.getAnimatedStyle()]}
        testID={testID}
      >
        {this.renderOverlay()}
        {this.isSecondaryHorizontal && this.renderSecondaryButton()}
        {this.renderButton()}
        {this.isSecondaryVertical && this.renderSecondaryButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: undefined,
    zIndex: Constants.isAndroid ? 99 : undefined
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  shadow: {
    ...Shadows.sh20.bottom
  },
  secondaryMargin: {
    marginTop: Spacings.s4,
    marginBottom: Spacings.s7,
    marginLeft: 20
  }
});

export default asBaseComponent<FloatingButtonProps, typeof FloatingButton>(FloatingButton);
