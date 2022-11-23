import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, StyleProp, TextStyle, ImageSourcePropType} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';
import Assets from '../../assets';
import {Colors, Typography} from '../../style';
import View, {ViewProps} from '../../components/view';
import Button, {ButtonProps} from '../../components/button';
import Text from '../../components/text';

export interface ModalTopBarProps {
  /**
   * title to display in the center of the top bar
   */
  title?: string;
  /**
   * title custom style
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * done action props (Button props)
   */
  doneButtonProps?: Omit<ButtonProps, 'onPress'>;
  /**
   * done action label
   */
  doneLabel?: string;
  /**
   * done action icon
   */
  doneIcon?: ImageSourcePropType;
  /**
   * done action callback
   */
  onDone?: (props?: any) => void;
  /**
   * cancel action props (Button props)
   */
  cancelButtonProps?: Omit<ButtonProps, 'onPress'>;
  /**
   * cancel action label
   */
  cancelLabel?: string;
  /**
   * cancel action icon
   */
  cancelIcon?: ImageSourcePropType;
  /**
   * cancel action callback
   */
  onCancel?: (props?: any) => void;
  /**
   * buttons to render on the right side of the top bar
   */
  rightButtons?: topBarButtonProp | topBarButtonProp[];
  /**
   * buttons to render on the left side of the top bar
   */
  leftButtons?: topBarButtonProp | topBarButtonProp[];
  /**
   * whether to include status bar or not (height claculations)
   */
  includeStatusBar?: boolean;
  /**
   * style for the TopBar container
   */
  containerStyle?: ViewProps['style'];
  /**
   * Whether or not to handle SafeArea
   */
  useSafeArea?: boolean;
}

type topBarButtonProp = {
  onPress?: (props: any) => void;
  label?: string;
  icon?: ImageSourcePropType;
  accessibilityLabel?: string;
  buttonProps?: Omit<ButtonProps, 'onPress'>;
};

const TOP_BAR_HEIGHT = Constants.isIOS ? 44 : 56;
const DEFAULT_BUTTON_PROPS = {
  color: Colors.$textPrimary
};

/**
 * @description: Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
class TopBar extends Component<ModalTopBarProps> {
  static displayName = 'Modal.TopBar';

  static defaultProps = {
    doneLabel: 'Save',
    cancelIcon: Assets.icons.x,
    doneButtonProps: {},
    cancelButtonProps: {},
    includeStatusBar: Constants.isIOS
  };

  renderTopBarButton({onPress, label, icon, accessibilityLabel, buttonProps}: topBarButtonProp, key: string) {
    if (onPress && (label || icon)) {
      return (
        <Button
          key={key}
          link
          onPress={onPress}
          label={label}
          labelStyle={[styles.actionLabel, buttonProps?.labelStyle]}
          iconSource={icon}
          iconStyle={[styles.icon, buttonProps?.iconStyle]}
          {...DEFAULT_BUTTON_PROPS}
          accessibilityLabel={accessibilityLabel}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
          {...buttonProps}
        />
      );
    }
  }

  renderDone() {
    const {doneButtonProps, doneLabel, doneIcon, onDone} = this.props;
    return this.renderTopBarButton({
      onPress: onDone,
      label: doneLabel,
      icon: doneIcon,
      accessibilityLabel: 'Done',
      buttonProps: doneButtonProps
    },
    'done');
  }

  renderCancel() {
    const {cancelButtonProps, cancelLabel, cancelIcon, onCancel} = this.props;
    return this.renderTopBarButton({
      onPress: onCancel,
      label: cancelLabel,
      icon: cancelIcon,
      accessibilityLabel: 'Cancel',
      buttonProps: cancelButtonProps
    },
    'cancel');
  }

  renderLeftButtons = () => {
    const {leftButtons} = this.props;
    if (_.isArray(leftButtons)) {
      return _.map(leftButtons, (button, index) => this.renderTopBarButton(button, `left-${index}`));
    } else {
      return leftButtons && this.renderTopBarButton(leftButtons, 'left');
    }
  };

  renderRightButtons = () => {
    const {rightButtons} = this.props;
    if (_.isArray(rightButtons)) {
      return _.map(rightButtons, (button, index) => this.renderTopBarButton(button, `right-${index}`));
    } else {
      return rightButtons && this.renderTopBarButton(rightButtons, 'right');
    }
  };

  render() {
    const {title, titleStyle, includeStatusBar, containerStyle, useSafeArea} = this.props;

    return (
      <View style={containerStyle} useSafeArea={useSafeArea}>
        {includeStatusBar && <View style={styles.statusBar}/>}
        <View style={styles.container}>
          <View row flex bottom paddingL-15 centerV>
            {this.renderCancel()}
            {this.renderLeftButtons()}
          </View>
          <View row flex-3 bottom centerH centerV>
            <Text $textDefault accessible={!!title} numberOfLines={1} text70 style={[styles.title, titleStyle]}>
              {title}
            </Text>
          </View>
          <View row flex bottom right paddingR-15 centerV>
            {this.renderRightButtons()}
            {this.renderDone()}
          </View>
        </View>
      </View>
    );
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

export default asBaseComponent<ModalTopBarProps>(TopBar);
