import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ActionSheetIOS, StyleSheet, ViewPropTypes} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import Button from '../button';
import Image from '../image';
import ListItem from '../listItem';
import PanningProvider from '../panningViews/panningProvider';

const VERTICAL_PADDING = 8;

/**
 * @description: Cross platform Action Sheet, with a support for native iOS solution
 * @gif: https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.js
 */
export default class ActionSheet extends BaseComponent {
  static displayName = 'ActionSheet';
  static propTypes = {
    /**
     * Whether to show the action sheet or not
     */
    visible: PropTypes.bool,
    /**
     * Title of the action sheet. Note: if both title and message are not passed will not render the title view at all
     */
    title: PropTypes.string,
    /**
     * Message of the action sheet
     */
    message: PropTypes.string,
    /**
     * Index of the option represents the cancel action (to be displayed as the separated bottom bold button)
     */
    cancelButtonIndex: PropTypes.number,
    /**
     * Index of the option represents the destructive action (will display red text. Usually used for 'delete' or
     * 'abort' actions)
     */
    destructiveButtonIndex: PropTypes.number,
    /**
     * List of options for the action sheet, follows the Button prop types (supply 'label' string and 'onPress'
     * function)
     */
    options: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
    /**
     * callback for when dismissing the action sheet, usually used for setting visible prop to false
     */
    onDismiss: PropTypes.func,
    /**
     * Should use the native action sheet for iOS
     */
    useNativeIOS: PropTypes.bool,
    /**
     * When passed (only with useNativeIOS), will display a cancel button at the bottom (overrides cancelButtonIndex)
     */
    showCancelButton: PropTypes.bool,
    /**
     * Add or override style of the action sheet (wraps the title and actions)
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Add or override style of the dialog wrapping the action sheet
     */
    dialogStyle: ViewPropTypes.style,
    /**
     * Add or override style of the options list
     */
    optionsStyle: ViewPropTypes.style,
    /**
     * Render custom title
     */
    renderTitle: PropTypes.func,
    /**
     * Render custom action
     * Note: you will need to call onOptionPress so the option's onPress will be called
     */
    renderAction: PropTypes.func,
    /**
     * Called once the modal has been dissmissed (iOS only, modal only)
     */
    onModalDismissed: PropTypes.func,
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.onOptionPress = this.onOptionPress.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  static defaultProps = {
    title: undefined,
    message: undefined
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {useNativeIOS} = this.getThemeProps();
    const wasVisible = this.props.visible;
    const willBeVisible = nextProps.visible;

    if (!wasVisible && willBeVisible && useNativeIOS && Constants.isIOS) {
      const {title, message, cancelButtonIndex, destructiveButtonIndex, options, showCancelButton} = nextProps;

      const optionsArray = options !== undefined ? options : [];
      let cancelBtnIndex = cancelButtonIndex;
      if (showCancelButton) {
        optionsArray.push({label: 'Cancel'});
        cancelBtnIndex = optionsArray.length - 1;
      }

      ActionSheetIOS.showActionSheetWithOptions({
        title,
        message,
        options: _.map(optionsArray, 'label'),
        cancelButtonIndex: cancelBtnIndex,
        destructiveButtonIndex
      },
      this.onOptionPress,);
    }
  }

  onOptionPress(optionIndex) {
    _.invoke(this.props, `options[${optionIndex}].onPress`);
    _.invoke(this.props, 'onDismiss');
  }

  renderIcon(icon) {
    return <Image source={icon} resizeMode={'contain'} style={{width: 20, height: 20, marginRight: 16}}/>;
  }

  renderAction(option, index) {
    return (
      <ListItem
        style={{backgroundColor: 'transparent'}}
        height={48}
        key={index}
        testID={option.testID}
        onPress={() => this.onOptionPress(index)}
        activeBackgroundColor={Colors.dark80}
      >
        <View row paddingL-16 flex centerV>
          {option.icon && this.renderIcon(option.icon)}
          <Text text70 dark10 numberOfLines={1}>
            {option.label}
          </Text>
        </View>
      </ListItem>
    );
  }

  renderActions() {
    const {title, options, cancelButtonIndex, renderAction, optionsStyle} = this.props;
    const optionsToRender = _.filter(options, (option, index) => index !== cancelButtonIndex);

    return (
      <View style={[_.isEmpty(title) ? styles.listNoTitle : styles.listWithTitle, optionsStyle]}>
        {_.isFunction(renderAction)
          ? optionsToRender.map((option, index) => renderAction(option, index, this.onOptionPress))
          : _.map(optionsToRender, this.renderAction)}
      </View>
    );
  }

  renderTitle() {
    const {title} = this.props;

    if (!_.isEmpty(title)) {
      return (
        <View height={56} paddingL-16 centerV>
          <Text dark40 text70 style={{alignSelf: 'flex-start'}}>
            {title}
          </Text>
        </View>
      );
    }
  }

  renderSheet() {
    const {renderTitle} = this.props;
    const {containerStyle} = this.getThemeProps();
    return (
      <View style={[styles.sheet, containerStyle]}>
        {_.isFunction(renderTitle) ? renderTitle() : this.renderTitle()}
        {this.renderActions()}
      </View>
    );
  }

  render() {
    const {
      useNativeIOS,
      visible,
      onDismiss,
      useModal,
      dialogStyle,
      onModalDismissed,
      testID,
      useSafeArea
    } = this.getThemeProps();

    if (Constants.isIOS && useNativeIOS) {
      return null;
    }

    return (
      <Dialog
        migrate
        useSafeArea={useSafeArea}
        testID={testID}
        bottom
        centerH
        width="100%"
        height={null}
        style={[styles.dialog, dialogStyle]}
        visible={visible}
        onDismiss={onDismiss}
        useModal={useModal}
        onModalDismissed={onModalDismissed}
        panDirection={PanningProvider.Directions.DOWN}
      >
        {this.renderSheet()}
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: Colors.white
  },
  dialog: {
    backgroundColor: Colors.white
  },
  listWithTitle: {
    paddingBottom: VERTICAL_PADDING
  },
  listNoTitle: {
    paddingTop: VERTICAL_PADDING,
    paddingBottom: VERTICAL_PADDING
  }
});
