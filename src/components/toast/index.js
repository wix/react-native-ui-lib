import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {BlurView} from 'react-native-blur';
import { BaseComponent } from '../../commons';
import View from '../view';
import Text from '../text';
import Button from '../button';
import { ThemeManager, Colors, Typography, BorderRadiuses } from '../../style';
import Assets from '../../assets';

/**
 * @description Toast component for showing a feedback about a user action.
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
    position: PropTypes.oneOf(['top', 'bottom']),
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
     * one or two actions for the user to display in the toast
     */
    actions: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
    /**
     * callback for dismiss action
     */
    onDismiss: PropTypes.func,
    /**
     * show dismiss action
     */
    allowDismiss: PropTypes.bool,
    /**
     * should message be centered in the toast
     */
    centerMessage: PropTypes.bool,
    /**
     * should the toast appear/disappear with animation
     */
    animated: PropTypes.bool,
  }

  static defaultProps = {
    position: 'top',
    color: Colors.white,
    animated: true,
  }

  state = {
    isVisible: false,
    animationConfig: this.getAnimationConfig(true),
  }

  componentWillReceiveProps(nextProps) {
    const {visible} = nextProps;
    const {isVisible} = this.state;
    if (visible !== isVisible) {
      this.setState({
        animationConfig: this.getAnimationConfig(visible),
      });
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getPositionStyle() {
    const { position } = this.props;
    if (position === 'top') {
      return { top: 0 };
    }
    return { bottom: 0 };
  }

  calcHeight() {
    const {height, actions} = this.props;
    const hasTwoActions = _.size(actions) === 2;
    if (height) {
      return height;
    }
    return hasTwoActions ? 92 : 48;
  }

  getAnimationConfig(shouldShow) {
    const {animated, position} = this.props;
    const isPositionedTop = position === 'top';
    const enterAnimation = isPositionedTop ? 'slideInDown' : 'slideInUp';
    const exitAnimation = isPositionedTop ? 'slideOutUp' : 'slideOutDown';
    if (animated) {
      return {
        animation: shouldShow ? enterAnimation : exitAnimation,
        duration: 300,
        onAnimationEnd: () => this.onAnimationEnd(),
      };
    }
  }

  renderMessage() {
    const { message, messageStyle, centerMessage, color } = this.props;
    return (
      <View flex centerH={centerMessage}>
        <Text style={[this.styles.message, color && {color}, messageStyle]}>
          {message}
        </Text>
      </View>
    );
  }

  renderOneAction() {
    const action = _.first(this.props.actions);
    if (action) {
      return (
        <Button
          style={this.styles.oneActionStyle}
          size="medium"
          {...action}
        />
      );
    }
  }

  renderTwoActions() {
    const {actions} = this.props;
    return (
      <View row center paddingB-14>
        <Button size="small" {...actions[0]} />
        <Button marginL-12 size="small" {...actions[1]} />
      </View>
    );
  }

  renderDismissButton() {
    const { allowDismiss, onDismiss, color } = this.props;
    if (allowDismiss) {
      return (
        <Button
          link
          iconStyle={[this.styles.dismissIconStyle, color && {tintColor: color}]}
          iconSource={Assets.icons.x}
          onPress={onDismiss}
        />
      );
    }
  }

  render() {
    const {backgroundColor, actions, allowDismiss, blur} = this.getThemeProps();
    const {animationConfig} = this.state;
    const hasOneAction = _.size(actions) === 1;
    const hasTwoActions = _.size(actions) === 2;
    const positionStyle = this.getPositionStyle();
    const height = this.calcHeight();

    const shouldShowToast = this.shouldShowToast();
    if (!shouldShowToast) {
      return null;
    }

    return (
      <Animatable.View
        style={[
          this.styles.container,
          hasOneAction && this.styles.containerWithOneAction,
          positionStyle,
          backgroundColor && {backgroundColor},
          {height},
        ]}
        {...animationConfig}
      >
        {blur && <BlurView style={this.styles.blur} blurType={blur.type || 'light'} blurAmount={blur.amount || 3}/>}
        <View row flex centerV spread>
          {this.renderMessage()}
          {(hasOneAction || allowDismiss) &&
          <View row height="100%">
            {hasOneAction && this.renderOneAction()}
            {this.renderDismissButton()}
          </View>}
        </View>
        {hasTwoActions &&
          <View>
            {this.renderTwoActions()}
          </View>}
      </Animatable.View>
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
      isVisible: visible,
    });
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: Colors.rgba(ThemeManager.primaryColor, 0.8),
      paddingHorizontal: 15,
    },
    containerWithOneAction: {
      paddingRight: 0,
    },
    message: {
      color: Colors.white,
      ...Typography.text80,
    },
    oneActionStyle: {
      borderRadius: BorderRadiuses.br0,
      minWidth: undefined,
      height: '100%',
      backgroundColor: Colors.rgba(ThemeManager.primaryColor, 0.7),
    },
    dismissIconStyle: {
      width: 12,
      height: 12,
      tintColor: Colors.white,
    },
    blur: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });
}
