import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons/new';
import {Colors, Spacings} from '../../style';
import View from '../view';
import Button, {ButtonPropTypes} from '../button';
import Image from '../image';

export interface FloatingButtonProps {
  /**
   * Whether the button is visible
   */
  visible?: boolean;
  /**
   * Button element (all Button's component's props)
   */
  button?: ButtonPropTypes;
  /**
   * Secondary button element (all Button's component's props)
   */
  secondaryButton?: ButtonPropTypes;
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
}

const SHOW_ANIMATION_DELAY = 350;
const SHOW_ANIMATION_DURATION = 180;
const HIDE_ANIMATION_DURATION = 150;
const gradientImage = () => require('./gradient.png');

/**
 * @description: Hovering button with gradient background
 * @modifiers: margin, background, color
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.js
 * @extends: Button
 * @extendsLink: https://github.com/wix/react-native-ui-lib/blob/master/src/components/button/index.js
 */
class FloatingButton extends PureComponent<FloatingButtonProps> {
  static displayName = 'FloatingButton';

  initialVisibility?: boolean;
  firstLoad: boolean;
  
  constructor(props: FloatingButtonProps) {
    super(props);

    this.initialVisibility = props.visible;
    this.firstLoad = true;
  }

  componentDidMount() {
    this.firstLoad = false;
  }

  onAnimationEnd = () => {
    this.setState({animating: false});
  };

  renderButton() {
    const {bottomMargin, button, secondaryButton} = this.props;
    const bottom = secondaryButton ? Spacings.s4 : bottomMargin || Spacings.s8;

    return (
      <Button
        size={Button.sizes.large}
        style={[styles.shadow, {marginTop: 16, marginBottom: bottom}]}
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
    const {secondaryButton, bottomMargin} = this.props;

    return (
      <Button
        link
        size={Button.sizes.large}
        {...secondaryButton}
        style={{marginBottom: bottomMargin || Spacings.s7}}
        enableShadow={false}
      />
    );
  }

  render() {
    const {withoutAnimation, secondaryButton, visible} = this.props;
    const Container = !withoutAnimation ? AnimatableView : View;

    // NOTE: On first load, don't show if it should not be visible
    if (this.firstLoad === true && !this.initialVisibility) {
      return false;
    }

    return (
      <Container
        pointerEvents="box-none"
        style={[styles.animatedContainer, Constants.isAndroid && {zIndex: 99}]}
        animation={!visible ? 'fadeOutDown' : 'fadeInUp'}
        duration={SHOW_ANIMATION_DURATION}
        delay={!visible ? HIDE_ANIMATION_DURATION : SHOW_ANIMATION_DELAY}
        easing={'ease-out'}
        onAnimationEnd={this.onAnimationEnd}
      >
        {this.renderOverlay()}
        {this.renderButton()}
        {secondaryButton && this.renderSecondaryButton()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    bottom: 0
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
