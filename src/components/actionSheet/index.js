import React, {PropTypes} from 'react';
import {
  StyleSheet,
  ActionSheetIOS,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors, ThemeManager} from '../../style';
import View from '../view';
import Text from '../text';
import Button from '../button';
import ListItem from '../listItem';

/**
 * @description: Cross platform Action sheet that also support the native iOS solution
 * @gif: http://www.giphy.com/gifs/3o7aCZHbWJX9CiOV6o
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
      <Animatable.View
        animation="slideInUp"
        duration={600}
        easing="ease-out-quint"
      >
        {this.renderTitle()}
        {this.renderActions()}
      </Animatable.View>
    );
  }

  renderTitle() {
    const {title} = this.props;
    if (!_.isEmpty(title)) {
      return (
        <View bg-dark80 height={35} center>
          <Text dark50>
            {title}
          </Text>
        </View>
      );
    }
  }

  renderActions() {
    const {options} = this.props;
    return (
      <View bg-white>
        {_.map(options, this.renderAction)}
      </View>
    );
  }

  renderAction(option, index) {
    const {cancelButtonIndex} = this.props;
    const isCancelAction = cancelButtonIndex === index;

    return (
      <ListItem
        height={isCancelAction ? 48 : 56.5}
        style={styles.action}
        key={index}
        onPress={() => this.onOptionPress(index)}
      >
        <View paddingL-20 flex centerV centerH={isCancelAction}>
          <Text text70 dark10 blue30={isCancelAction}>
            {option.label}
          </Text>
        </View>
      </ListItem>
    );
  }

  componentWillReceiveProps(nextProps) {
    const wasVisible = this.props.visible;
    const willBeVisible = nextProps.visible;

    if (
      !wasVisible &&
      willBeVisible &&
      nextProps.useNativeIOS &&
      Constants.isIOS
    ) {
      const {
        title,
        message,
        cancelButtonIndex,
        destructiveButtonIndex,
        options,
      } = nextProps;

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
    _.invoke(this.props, 'onDismiss');
    _.invoke(this.props, `options[${optionIndex}].onPress`);
  }

  render() {
    const {visible, useNativeIOS, onDismiss} = this.props;

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
    backgroundColor: Colors.rgba(Colors.dark10, 0.3),
  },
  action: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
