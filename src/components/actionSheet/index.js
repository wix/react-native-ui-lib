import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ActionSheetIOS} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import Button from '../button';
import Image from '../image';
import ListItem from '../listItem';


/**
 * @description: Cross platform Action sheet, with a support for native iOS solution
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
  };

  constructor(props) {
    super(props);

    this.onOptionPress = this.onOptionPress.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  static defaultProps = {
    title: undefined,
    message: undefined,
    showCancelButton: false,
  };

  componentWillReceiveProps(nextProps) {
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

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          message,
          options: _.map(optionsArray, 'label'),
          cancelButtonIndex: cancelBtnIndex,
          destructiveButtonIndex,
        },
        this.onOptionPress,
      );
    }
  }

  onOptionPress(optionIndex) {
    _.invoke(this.props, `options[${optionIndex}].onPress`);
    _.invoke(this.props, 'onDismiss');
  }
  
  renderIcon(icon) {
    return (
      <Image source={icon} resizeMode={'contain'} style={{width: 20, height: 20, marginRight: 16}}/>
    );
  }

  renderAction(option, index) {
    return (
      <ListItem
        style={{backgroundColor: 'transparent'}}
        height={48}
        key={index}
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
    const {title, options, cancelButtonIndex} = this.props;
    const optionsToRender = _.filter(options, (option, index) => index !== cancelButtonIndex);
    
    return (
      <View paddingB-8 paddingT-8={_.isEmpty(title)}>
        {_.map(optionsToRender, this.renderAction)}
      </View>
    );
  }

  renderTitle() {
    const {title} = this.props;
    
    if (!_.isEmpty(title)) {
      return (
        <View height={56} paddingL-16 centerV>
          <Text dark40 text70>
            {title}
          </Text>
        </View>
      );
    }
  }

  renderSheet() {    
    return (
      <View bg-white>
        {this.renderTitle()}
        {this.renderActions()}
      </View>
    );
  }

  render() {
    const {visible, useNativeIOS, onDismiss} = this.getThemeProps();
    
    if (Constants.isIOS && useNativeIOS) return null;
    
    return (
      <Dialog
        bottom
        centerH
        width="100%"
        height={null}
        visible={visible}
        onDismiss={onDismiss}
        style={{backgroundColor: Colors.white}}
      >
        {this.renderSheet()}
      </Dialog>
    );
  }
}
