import _pt from "prop-types";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { asBaseComponent } from "../../commons/new";
import { Constants } from "../../helpers";
import Assets from "../../assets";
import { Colors, Typography } from "../../style";
import View from "../../components/view";
import Button from "../../components/button";
import Text from "../../components/text";
const TOP_BAR_HEIGHT = Constants.isIOS ? 44 : 56;
const DEFAULT_BUTTON_PROPS = {
  color: Colors.primary
};
/**
 * @description: Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */

class TopBar extends Component {
  static propTypes = {
    /**
         * title to display in the center of the top bar
         */
    title: _pt.string,

    /**
         * done action label
         */
    doneLabel: _pt.string,

    /**
         * done action callback
         */
    onDone: _pt.func,

    /**
         * cancel action label
         */
    cancelLabel: _pt.string,

    /**
         * cancel action callback
         */
    onCancel: _pt.func,

    /**
         * whether to include status bar or not (height claculations)
         */
    includeStatusBar: _pt.bool
  };
  static displayName = 'Modal.TopBar';
  static defaultProps = {
    doneLabel: 'Save',
    cancelIcon: Assets.icons.x,
    doneButtonProps: {},
    cancelButtonProps: {},
    includeStatusBar: Constants.isIOS
  };

  renderTopBarButton({
    onPress,
    label,
    icon,
    accessibilityLabel,
    buttonProps
  }) {
    if (onPress && (label || icon)) {
      // @ts-ignore
      const {
        iconStyle,
        labelStyle,
        ...otherButtonProps
      } = buttonProps;
      return <Button link onPress={onPress} label={label} labelStyle={[styles.actionLabel, labelStyle]} iconSource={icon} iconStyle={[styles.icon, iconStyle]} {...DEFAULT_BUTTON_PROPS} accessibilityLabel={accessibilityLabel} {...otherButtonProps} hitSlop={{
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
      }} />;
    }
  }

  renderDone() {
    const {
      doneButtonProps,
      doneLabel,
      doneIcon,
      onDone
    } = this.props;
    return this.renderTopBarButton({
      onPress: onDone,
      label: doneLabel,
      icon: doneIcon,
      accessibilityLabel: 'Done',
      buttonProps: doneButtonProps
    });
  }

  renderCancel() {
    const {
      cancelButtonProps,
      cancelLabel,
      cancelIcon,
      onCancel
    } = this.props;
    return this.renderTopBarButton({
      onPress: onCancel,
      label: cancelLabel,
      icon: cancelIcon,
      accessibilityLabel: 'Cancel',
      buttonProps: cancelButtonProps
    });
  }

  render() {
    const {
      title,
      titleStyle,
      includeStatusBar,
      containerStyle
    } = this.props;
    return <View style={containerStyle}>
        {includeStatusBar && <View style={styles.statusBar} />}
        <View style={styles.container}>
          <View row flex bottom paddingL-15 centerV>
            {this.renderCancel()}
          </View>
          <View row flex-3 bottom centerH centerV>
            <Text accessible={!!title} numberOfLines={1} text70 style={[styles.title, titleStyle]}>
              {title}
            </Text>
          </View>
          <View row flex bottom right paddingR-15 centerV>
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
  actionLabel: { ...Typography.text70
  },
  icon: {
    // width: 16,
    // height: 16,
    tintColor: Colors.dark10,
    marginBottom: 2
  }
});
export default asBaseComponent(TopBar);