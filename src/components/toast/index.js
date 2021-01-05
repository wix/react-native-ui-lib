import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {AccessibilityInfo, findNodeHandle, StyleSheet, Animated, Easing, ActivityIndicator} from 'react-native';
import {PureBaseComponent} from '../../commons';
import {Colors, Typography, BorderRadiuses} from '../../style';
import Assets from '../../assets';
import View from '../view';
import Image from '../image';
import Button from '../button';
import Text from '../text';


// Create animated view base on uilib view for the safeArea support
const AnimatedView = Animated.createAnimatedComponent(View);
const COLOR = Colors.white;

/**
 * @description: A toast component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ToastsScreen.js
 */
export default class Toast extends PureBaseComponent {
  static displayName = 'Toast';

  static propTypes = {
    /**
     * Whether to show or hide the toast
     */
    visible: PropTypes.bool,
    /**
     * The position of the toast. 'top' or 'bottom'.
     */
    position: PropTypes.oneOf(['top', 'bottom']),
    /**
     * custom zIndex for toast
     */
    zIndex: PropTypes.number,
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
     * should message be centered in the toast
     */
    centerMessage: PropTypes.bool,
    /**
     * a left icon
     */
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * a single action for the user
     */
    action: PropTypes.shape(Button.propTypes),
    /**
     * should show a loader (showDismiss must be false)
     */
    showLoader: PropTypes.bool,
    /**
     * callback for dismiss action
     */
    onDismiss: PropTypes.func,
    /**
     * number of milliseconds to automatically invoke the onDismiss callback
     */
    autoDismiss: PropTypes.number,
    /**
     * show dismiss action (right 'X' button)
     */
    showDismiss: PropTypes.bool,
    /**
     * callback for end of component animation
     */
    onAnimationEnd: PropTypes.func,
    /**
     * render a custom view that will appear permanently above or below a Toast,
     * depends on the Toast's position, and animate with it when the Toast is made visible or dismissed
     */
    renderAttachment: PropTypes.elementType,
    /**
     * render a custom loader component instead of the default when passing showLoader
     */
    customLoader: PropTypes.func
  };

  static defaultProps = {
    position: 'top',
    zIndex: 100
  };

  constructor(props) {
    super(props);

    this.state = {
      toastHeight: 0,
      inAnimation: false
    };

    this.toastAnim = new Animated.Value(0);
  }

  componentDidMount() {
    const {visible} = this.props;

    if (visible) {
      this.toggleToast(visible, {delay: 100});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.toggleToast(this.props.visible);
    }
  }

  playAccessibilityFeatures() {
    const {visible, message, action, showDismiss} = this.props;

    if (visible) {
      if ((this.viewRef && action) || showDismiss) {
        const reactTag = findNodeHandle(this.viewRef);
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      } else {
        AccessibilityInfo.announceForAccessibility(`notification ${message}`);
      }
    }
  }

  setAnimationStatus = inAnimation => this.setState({inAnimation});

  toggleToast(show, {delay} = {}) {
    Animated.timing(this.toastAnim, {
      toValue: Number(show),
      duration: 300,
      delay,
      easing: Easing.bezier(0.215, 0.61, 0.355, 1),
      useNativeDriver: true
    }).start(this.onAnimationEnd);

    this.setAnimationStatus(true);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onAnimationEnd = () => {
    const {visible} = this.props;

    if (visible) {
      this.setDismissTimer();
    } else {
      this.setAnimationStatus(false);
    }

    this.playAccessibilityFeatures();
    _.invoke(this.props, 'onAnimationEnd', visible);
  };

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

  getAbsolutePositionStyle(location) {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      [location]: 0
    };
  }

  onToastLayout = ({
    nativeEvent: {
      layout: {height}
    }
  }) => {
    if (height > this.state.toastHeight) {
      this.setState({
        toastHeight: height
      });
    }
  };

  renderMessage() {
    const {message, centerMessage, color} = this.getThemeProps();
    const textColor = color || COLOR;
    const textAlign = centerMessage ? 'center' : 'left';

    return (
      <Text
        ref={r => (this.viewRef = r)}
        style={[this.styles.message, {color: textColor, textAlign}]}
        accessibilityLabel={`notification ${message}`}
      >
        {message}
      </Text>
    );
  }

  renderAction() {
    const {showLoader, showDismiss, action, color, backgroundColor, customLoader} = this.props;
    const textColor = color || COLOR;

    // NOTE: order does matter
    if (showLoader && !showDismiss) {
      if (customLoader) {
        return (
          <View center marginR-20>
            {customLoader()}
          </View>
        );
      }

      return <ActivityIndicator size={'small'} animating color={Colors.white} style={{marginRight: 20}}/>;
    }

    if (showDismiss) {
      return (
        <Button
          link
          iconStyle={{tintColor: textColor}}
          iconSource={Assets.icons.x}
          onPress={this.onDismiss}
          paddingR-20
          accessibilityLabel={'dismiss'}
          accessibilityRole={'button'}
        />
      );
    }

    if (action) {
      const actionBg = backgroundColor || Colors.rgba(Colors.primary, 0);

      return (
        <Button
          style={this.styles.action}
          backgroundColor={actionBg}
          color={textColor}
          {...action}
          labelStyle={Typography.text70BO}
          accessibilityRole={'button'}
        />
      );
    }
  }

  renderIcon() {
    const {icon, color} = this.props;
    const tintColor = color || COLOR;

    if (icon) {
      return <Image source={icon} resizeMode={'contain'} style={this.styles.icon} tintColor={tintColor}/>;
    }
  }

  renderContent() {
    const {children} = this.getThemeProps();

    if (!_.isUndefined(children)) {
      return children;
    }

    return (
      <View row>
        <View flex style={this.styles.toastContent}>
          {this.renderIcon()}
          {this.renderMessage()}
        </View>
        {this.renderAction()}
      </View>
    );
  }

  renderAttachmentContent() {
    const {renderAttachment} = this.props;

    if (renderAttachment) {
      return <View pointerEvents={'box-none'}>{renderAttachment()}</View>;
    }
  }

  render() {
    const {toastHeight, inAnimation} = this.state;
    const {visible, backgroundColor, position, zIndex, style, renderAttachment, testID} = this.getThemeProps();
    const positionStyle = this.getAbsolutePositionStyle(position);

    if (!visible && !inAnimation) {
      if (renderAttachment) {
        return (
          <View style={[positionStyle, {zIndex}]} pointerEvents={'box-none'}>
            {this.renderAttachmentContent()}
          </View>
        );
      }
      return null;
    }

    const bg = backgroundColor || Colors.primary;
    const isTop = position === 'top';
    const positionMultiplier = isTop ? -1 : 1;
    const translateY = this.toastAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [positionMultiplier * (toastHeight || 500), 0]
    });
    const opacity = this.toastAnim.interpolate({
      inputRange: [0, 0.01, 1],
      outputRange: [0, 1, 1]
    });

    return (
      <AnimatedView
        testID={testID}
        style={[positionStyle, {zIndex, transform: [{translateY}]}]}
        pointerEvents={'box-none'}
      >
        {!isTop && !!toastHeight && this.renderAttachmentContent()}
        <AnimatedView
          useSafeArea
          style={[{backgroundColor: bg, opacity}, style]}
          onLayout={this.onToastLayout}
          pointerEvents={visible ? 'auto' : 'none'}
        >
          {this.renderContent()}
        </AnimatedView>
        {isTop && !!toastHeight && this.renderAttachmentContent()}
      </AnimatedView>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    toastContent: {
      minHeight: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12
    },
    message: {
      flex: 1,
      ...Typography.text70
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 16
    },
    action: {
      borderRadius: BorderRadiuses.br0,
      minWidth: undefined,
      paddingRight: 20
    }
  });
}
