import _map from "lodash/map";
import _isArray from "lodash/isArray";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Constants, asBaseComponent } from "../../commons/new";
import Assets from "../../assets";
import { Colors, Typography } from "../../style";
import View from "../../components/view";
import Button from "../../components/button";
import Text from "../../components/text";
const TOP_BAR_HEIGHT = Constants.isIOS ? 44 : 56;
const DEFAULT_BUTTON_PROPS = {
  color: Colors.$textPrimary
};

/**
 * @description: Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
class TopBar extends Component {
  static displayName = 'Modal.TopBar';
  static defaultProps = {
    doneLabel: 'Save',
    cancelIcon: Assets.internal.icons.x,
    doneButtonProps: {},
    cancelButtonProps: {},
    includeStatusBar: Constants.isIOS
  };
  renderTopBarButton({
    onPress,
    label,
    icon,
    accessibilityLabel,
    buttonProps,
    testID
  }, key) {
    if (onPress && (label || icon)) {
      return <Button key={key} link onPress={onPress} label={label} labelStyle={[styles.actionLabel, buttonProps?.labelStyle]} iconSource={icon} iconStyle={[styles.icon, buttonProps?.iconStyle]} {...DEFAULT_BUTTON_PROPS} accessibilityLabel={accessibilityLabel} hitSlop={{
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
      }} testID={testID} {...buttonProps} />;
    }
  }
  renderDone() {
    const {
      doneButtonProps,
      doneLabel,
      doneIcon,
      onDone,
      testID
    } = this.props;
    return this.renderTopBarButton({
      onPress: onDone,
      label: doneLabel,
      icon: doneIcon,
      accessibilityLabel: 'Done',
      testID: `${testID}.done`,
      buttonProps: doneButtonProps
    }, 'done');
  }
  renderCancel() {
    const {
      cancelButtonProps,
      cancelLabel,
      cancelIcon,
      onCancel,
      testID
    } = this.props;
    return this.renderTopBarButton({
      onPress: onCancel,
      label: cancelLabel,
      icon: cancelIcon,
      accessibilityLabel: 'Cancel',
      testID: `${testID}.cancel`,
      buttonProps: cancelButtonProps
    }, 'cancel');
  }
  renderLeftButtons = () => {
    const {
      leftButtons
    } = this.props;
    if (_isArray(leftButtons)) {
      return _map(leftButtons, (button, index) => this.renderTopBarButton(button, `left-${index}`));
    } else {
      return leftButtons && this.renderTopBarButton(leftButtons, 'left');
    }
  };
  renderRightButtons = () => {
    const {
      rightButtons
    } = this.props;
    if (_isArray(rightButtons)) {
      return _map(rightButtons, (button, index) => this.renderTopBarButton(button, `right-${index}`));
    } else {
      return rightButtons && this.renderTopBarButton(rightButtons, 'right');
    }
  };
  render() {
    const {
      title,
      titleStyle,
      titleAccessibilityProps,
      subtitle,
      subtitleStyle,
      includeStatusBar,
      containerStyle,
      useSafeArea
    } = this.props;
    return <View style={containerStyle} useSafeArea={useSafeArea}>
        {includeStatusBar && <View style={styles.statusBar} />}
        <View style={styles.container}>
          <View row flex paddingL-15 centerV>
            {this.renderCancel()}
            {this.renderLeftButtons()}
          </View>
          <View flex-3 centerH centerV>
            <Text $textDefault accessible={!!title} numberOfLines={1} text70 style={[styles.title, titleStyle]} {...titleAccessibilityProps}>
              {title}
            </Text>
            {subtitle && <Text $textDefault accessible={!!subtitle} bodySmall numberOfLines={1} style={subtitleStyle}>
                {subtitle}
              </Text>}
          </View>
          <View row flex right paddingR-15 centerV>
            {this.renderRightButtons()}
            {this.renderDone()}
          </View>
        </View>
      </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: TOP_BAR_HEIGHT
  },
  statusBar: {
    height: Constants.statusBarHeight
  },
  title: {
    fontWeight: '500'
  },
  actionLabel: {
    ...Typography.text70
  },
  icon: {
    // width: 16,
    // height: 16,
    tintColor: Colors.$iconDefault,
    marginBottom: 2
  }
});
export default asBaseComponent(TopBar);