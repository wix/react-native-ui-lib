import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View as AnimatableView, Text as AnimatableText} from 'react-native-animatable';
import {BlurView} from '@react-native-community/blur';
import {BaseComponent} from '../../commons';
import {AnimatableManager, ThemeManager, Colors, Typography, BorderRadiuses} from '../../style';
import Assets from '../../assets';
import View from '../view';
import Button from '../button';
import Image from '../image';

const DURATION = 300;
const DELAY = 100;
const ANIMATION_SUFFIX = 'toast';

/**
 * @description Toast component for showing a feedback about a user action.
 * @extends: Animatable.View
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @gif: https://media.giphy.com/media/3oFzm1pKqGXybiDUre/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ToastsScreen.js
 */
export default class Toast extends BaseComponent {
  static displayName = 'Toast';
  static propTypes = {
    /**
     * Whether to show or hide the toast
     */
    visible: PropTypes.bool,
    /**
     * The position of the toast. top or bottom
     */
    position: PropTypes.oneOf(['relative', 'top', 'bottom']),
    /**
     * The height of the toast
     */
    height: PropTypes.number,
    /**
     * The background color of the toast
     */
    backgroundColor: PropTypes.string,
    /**
     * the toast content color (message, actions labels)
     */
    color: PropTypes.string,
    /**
     * the toast message
     */
    message: PropTypes.string,
    /**
     * a custom style for the toast message
     */
    messageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * a left icon
     */
    icon: PropTypes.number,
    /**
     * one or two actions for the user to display in the toast
     */
    actions: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
    /**
     * callback for dismiss action
     */
    onDismiss: PropTypes.func,
    /**
     * number of milliseconds to automatically invoke the onDismiss callback
     */
    autoDismiss: PropTypes.number,
    /**
     * show dismiss action
     */
    allowDismiss: PropTypes.bool,
    /**
     * callback for end of component animation
     */
    onAnimationEnd: PropTypes.func,
    /**
     * render a custom toast content (better use with StyleSheet.absoluteFillObject to support safe area)
     */
    renderContent: PropTypes.func,
    /**
     * should message be centered in the toast
     */
    centerMessage: PropTypes.bool,
    /**
     * should the toast appear/disappear with animation
     */
    animated: PropTypes.bool,
    /**
     * enable blur effect for Toast
     */
    enableBlur: PropTypes.bool,
    /**
     * blur option for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
     */
    blurOptions: PropTypes.object,
    /**
     * custom zIndex for toast
     */
    zIndex: PropTypes.number
  };

  static defaultProps = {
    position: 'top',
    color: Colors.white,
    animated: true,
    zIndex: 100
  };

  constructor(props) {
    super(props);

    const {animated} = this.props;

    this.state = {
      isVisible: false,
      animationConfig: animated ? this.getAnimation(true) : {},
      contentAnimation: animated ? this.getContentAnimation(true) : {},
      duration: DURATION,
      delay: DELAY
    };

    if (animated) {
      AnimatableManager.loadSlideByHeightDefinitions(getHeight(this.props), ANIMATION_SUFFIX);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {visible, animated} = nextProps;
    const {isVisible} = this.state;
    if (visible !== isVisible) {
      if (animated) {
        AnimatableManager.loadSlideByHeightDefinitions(getHeight(this.props), ANIMATION_SUFFIX);
      }

      const newState = animated
        ? {
          animationConfig: this.getAnimation(visible),
          contentAnimation: this.getContentAnimation(visible)
        }
        : {
          animationConfig: {},
          contentAnimation: {}
        };
      this.setState(newState);
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getPositionStyle() {
    const {position} = this.props;

    return position === 'relative' ? {position} : getAbsolutePositionStyle(position);
  }

  getAnimation(shouldShow) {
    const {position, useNativeDriver} = this.props;
    const animationDescriptor = getAnimationDescriptor(position, this.state);
    const {animation, duration, delay} = shouldShow ? animationDescriptor.enter : animationDescriptor.exit;

    return {animation, duration, delay, useNativeDriver, onAnimationEnd: () => this.onAnimationEnd()};
  }

  getContentAnimation(shouldShow) {
    const {position} = this.props;
    const {duration, delay} = this.state;

    if (position === 'relative') {
      return {
        animation: shouldShow ? 'fadeIn' : 'fadeOut',
        duration,
        delay: shouldShow ? delay : 0,
        onAnimationEnd: () => this.onAnimationEnd()
      };
    }
  }

  getBlurOptions() {
    const {blurOptions} = this.getThemeProps();

    return {
      blurType: 'light',
      amount: 5,
      ...blurOptions
    };
  }

  renderContent() {
    const {actions, allowDismiss, renderContent, icon, color} = this.getThemeProps();

    if (_.isFunction(renderContent)) {
      return renderContent(this.props);
    }

    const hasOneAction = _.size(actions) === 1;
    const hasTwoActions = _.size(actions) === 2;
    const height = getHeight(this.props);

    return (
      <View row={!hasTwoActions} height={height} centerV spread>
        {icon && (
          <View>
            <Image source={icon} resizeMode={'contain'} style={this.styles.icon} tintColor={color}/>
          </View>
        )}
        {this.renderMessage()}
        {(hasOneAction || allowDismiss) && (
          <View row height="100%" marginL-8>
            {hasOneAction && this.renderOneAction()}
            {this.renderDismissButton()}
          </View>
        )}
        {hasTwoActions && this.renderTwoActions()}
      </View>
    );
  }

  renderMessage() {
    const {message, messageStyle, centerMessage, color} = this.props;
    const {contentAnimation} = this.state;
    return (
      <View flex centerH={centerMessage} centerV>
        <AnimatableText style={[this.styles.message, color && {color}, messageStyle]} {...contentAnimation}>
          {message}
        </AnimatableText>
      </View>
    );
  }

  renderOneAction() {
    const action = _.first(this.props.actions);
    const {contentAnimation} = this.state;

    if (action) {
      return (
        <AnimatableView {...contentAnimation}>
          <Button
            size="medium"
            style={this.styles.oneActionStyle}
            backgroundColor={Colors.rgba(ThemeManager.primaryColor, 0.7)}
            {...action}
          />
        </AnimatableView>
      );
    }
  }

  renderTwoActions() {
    const {actions, backgroundColor} = this.props;
    const {contentAnimation} = this.state;

    return (
      <AnimatableView style={[this.styles.containerWithTwoActions, {backgroundColor}]} {...contentAnimation}>
        <Button size="small" {...actions[0]}/>
        <Button marginL-12 size="small" {...actions[1]}/>
      </AnimatableView>
    );
  }

  renderDismissButton() {
    const {allowDismiss, color} = this.props;
    const {contentAnimation} = this.state;
    if (allowDismiss) {
      return (
        <AnimatableView style={{justifyContent: 'center'}} {...contentAnimation}>
          <Button
            link
            iconStyle={[this.styles.dismissIconStyle, color && {tintColor: color}]}
            iconSource={Assets.icons.x}
            onPress={this.onDismiss}
          />
        </AnimatableView>
      );
    }
  }

  // This weird layout should support iphoneX safe area
  render() {
    const {backgroundColor, actions, enableBlur, testID, zIndex, renderContent} = this.getThemeProps();
    const {animationConfig} = this.state;
    const hasOneAction = _.size(actions) === 1;
    const hasTwoActions = _.size(actions) === 2;
    const positionStyle = this.getPositionStyle();
    const height = getHeight(this.props);
    const blurOptions = this.getBlurOptions();

    const shouldShowToast = this.shouldShowToast();
    if (!shouldShowToast) {
      return null;
    }

    return (
      <View style={[positionStyle]} useSafeArea testID={testID}>
        <View height={height}/>
        <AnimatableView
          style={[
            this.styles.container,
            !renderContent && !hasTwoActions && {paddingHorizontal: 20},
            backgroundColor && {backgroundColor},
            hasOneAction && this.styles.containerWithOneAction,
            {zIndex}
          ]}
          {...animationConfig}
        >
          {enableBlur && <BlurView style={this.styles.blurView} {...blurOptions}/>}
          {this.renderContent()}
        </AnimatableView>
      </View>
    );
  }

  shouldShowToast() {
    const {visible} = this.props;
    const {isVisible} = this.state;
    return isVisible || (visible && !isVisible);
  }

  onAnimationEnd() {
    const {visible} = this.props;
    this.setState({
      isVisible: visible
    });
    this.setDismissTimer();
    _.invoke(this.props, 'onAnimationEnd', visible);
  }

  setDismissTimer() {
    const {autoDismiss, onDismiss} = this.props;
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        this.onDismiss(timer);
      }, autoDismiss);
    }
  }

  onDismiss = timer => {
    if (timer) {
      clearTimeout(timer);
    }
    _.invoke(this.props, 'onDismiss');
  };
}

function createStyles() {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.rgba(ThemeManager.primaryColor, 0.8)
    },
    containerWithOneAction: {
      paddingRight: 0
    },
    containerWithTwoActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 14
    },
    message: {
      color: Colors.white,
      ...Typography.text80
    },
    oneActionStyle: {
      borderRadius: BorderRadiuses.br0,
      minWidth: undefined,
      height: '100%'
    },
    dismissIconStyle: {
      width: 12,
      height: 12,
      tintColor: Colors.white
    },
    blurView: {
      ...StyleSheet.absoluteFillObject
    },
    icon: {
      flex: 1,
      width: 24,
      height: 24,
      marginRight: 16
    }
  });
}

function getAnimationDescriptor(name, {duration = DURATION, delay = DELAY}) {
  const defaultProps = {duration, delay: 0};
  const animationDescriptorMap = {
    top: {
      enter: {...defaultProps, animation: AnimatableManager.animations.slideInDown_toast},
      exit: {...defaultProps, animation: AnimatableManager.animations.slideOutUp_toast}
    },
    bottom: {
      enter: {...defaultProps, animation: AnimatableManager.animations.slideInUp_toast},
      exit: {...defaultProps, animation: AnimatableManager.animations.slideOutDown_toast}
    },
    relative: {
      enter: {...defaultProps, animation: AnimatableManager.animations.slideIn_toast},
      exit: {...defaultProps, animation: AnimatableManager.animations.slideOut_toast, delay}
    }
  };
  return animationDescriptorMap[name] || {};
}

function getAbsolutePositionStyle(location) {
  return {
    position: 'absolute',
    left: 0,
    right: 0,
    [location]: 0
  };
}

function getHeight({height, actions}) {
  if (_.isUndefined(height)) {
    return _.size(actions) === 2 ? 92 : 48;
  }
  return height;
}
