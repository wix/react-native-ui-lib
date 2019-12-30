import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {Constants, Colors, Spacings, BaseComponent, View, Image, Button} from 'react-native-ui-lib';


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
class FloatingButton extends BaseComponent {
  static displayName = 'FloatingButton';

  static propTypes = {
    /**
     * Whether the button is visible
     */
    visible: PropTypes.bool,
    /**
     * Button element (all Button's component's props)
     */
    button: PropTypes.shape(Button.propTypes),
    /**
     * Secondary button element (all Button's component's props)
     */
    secondaryButton: PropTypes.shape(Button.propTypes),
    /**
     * The bottom margin of the button, or secondary button if passed
     */
    bottomMargin: PropTypes.number,
    /**
     * The duration of the button's animations (show/hide)
     */
    duration: PropTypes.number,
    /**
     * Whether to show/hide the button without animation
     */
    withoutAnimation: PropTypes.bool,
    /**
     * Whether to show background overlay
     */
    hideBackgroundOverlay: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      shouldAnimateHide: false,
      isVisible: props.visible,
      animating: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {withoutAnimation} = this.props;
    const propsVisible = this.props.visible;
    const nextVisible = nextProps.visible;

    if (!withoutAnimation) {
      const shouldStartAnimation = !this.state.isVisible && nextVisible && !this.state.animating;
      if (shouldStartAnimation) {
        this.setState({animating: true});

        if (nextProps.duration) {
          setTimeout(() => {
            this.setState({isVisible: false, shouldAnimateHide: true});
          }, nextProps.duration);
        }
      }
    }

    this.setState({
      shouldAnimateHide: withoutAnimation ? false : !nextVisible && propsVisible,
      isVisible: nextVisible
    });
  }

  onAnimationEnd = () => {
    this.setState({animating: false});
  };

  renderButton() {
    const {bottomMargin, button, secondaryButton} = this.getThemeProps();
    const bottom = secondaryButton ? Spacings.s4 : bottomMargin || Spacings.s8;
    
    return (
      <Button
        size={'large'}
        style={[styles.shadow, {marginTop: 16, marginBottom: bottom}]}
        {...button}
      />
    );
  }

  renderOverlay = () => {
    if (!this.props.hideBackgroundOverlay) {
      return (
        <View pointerEvents={'none'} style={styles.image}>
          <Image style={styles.image} source={gradientImage()} resizeMode={'stretch'}/>
        </View>
      );
    }
  }

  renderSecondaryButton() {
    const {secondaryButton, bottomMargin} = this.getThemeProps();

    return (
      <Button
        link
        size={'large'}
        {...secondaryButton}
        style={{marginBottom: bottomMargin || Spacings.s7}}
        enableShadow={false}
      />
    );
  }

  render() {
    const {withoutAnimation, secondaryButton} = this.props;
    const {isVisible, shouldAnimateHide} = this.state;
    const Container = !withoutAnimation ? AnimatableView : View;

    // NOTE: Don't show if it should not be visible and it was already animated
    if (!isVisible && !shouldAnimateHide) {
      return false;
    }

    return (
      <Container
        pointerEvents="box-none"
        style={[styles.animatedContainer, Constants.isAndroid && {zIndex: 99}]}
        animation={!isVisible ? 'fadeOutDown' : 'fadeInUp'}
        duration={SHOW_ANIMATION_DURATION}
        delay={!isVisible ? HIDE_ANIMATION_DURATION : SHOW_ANIMATION_DELAY}
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

export default FloatingButton;
