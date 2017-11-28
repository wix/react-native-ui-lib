import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ActionSheetIOS, TouchableWithoutFeedback, Modal} from 'react-native';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import View from '../view';
import Text from '../text';
import Button from '../button';
import ListItem from '../listItem';

/**
 * @description: Cross platform Action sheet that also support the native iOS solution
 * @gif: https://media.giphy.com/media/3o7aCZHbWJX9CiOV6o/giphy.gif
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
     * Title of the action sheet
     */
    title: PropTypes.string,
    /**
     * Message of the action sheet
     */
    message: PropTypes.string,
    /**
     * Index of the option represents the cancel action
     */
    cancelButtonIndex: PropTypes.number,
    /**
     * Index of the option represents the destructive action (usually used to delete items or abort important actions)
     */
    destructiveButtonIndex: PropTypes.number,
    /**
     * List of options for the action sheet, follows the Button prop types
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
  };

  constructor(props) {
    super(props);

    this.onOptionPress = this.onOptionPress.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  renderSheet() {
    return (
      <Animatable.View animation="slideInUp" duration={600} easing="ease-out-quint">
        <View bg-white>
          {this.renderTitle()}
          {this.renderActions()}
        </View>
      </Animatable.View>
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

  renderActions() {
    const {title, options, cancelButtonIndex} = this.props;
    const optionsToRender = _.filter(options, (option, index) => index !== cancelButtonIndex);
    return (
      <View paddingB-8 paddingT-8={_.isEmpty(title)}>
        {_.map(optionsToRender, this.renderAction)}
      </View>
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
        <View paddingH-20 flex centerV>
          <Text text70 dark10 numberOfLines={1}>
            {option.label}
          </Text>
        </View>
      </ListItem>
    );
  }

  componentWillReceiveProps(nextProps) {
    const {useNativeIOS} = this.getThemeProps();
    const wasVisible = this.props.visible;
    const willBeVisible = nextProps.visible;

    if (!wasVisible && willBeVisible && useNativeIOS && Constants.isIOS) {
      const {title, message, cancelButtonIndex, destructiveButtonIndex, options} = nextProps;

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          message,
          options: _.map(options, 'label'),
          cancelButtonIndex,
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

  render() {
    const {visible, useNativeIOS, onDismiss} = this.getThemeProps();

    if (Constants.isIOS && useNativeIOS) return null;

    return (
      <Modal visible={visible} transparent onRequestClose={onDismiss}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.container}>
            <Animatable.View
              style={styles.overlay}
              animation="fadeIn"
              duration={300}
              easing="ease-out-quint"
              useNativeDriver
            >
              <View flex bottom>
                {this.renderSheet()}
              </View>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.rgba(Colors.black, 0.4),
  },
});
