import _pt from "prop-types";
import _ from 'lodash';
import React, { Component } from 'react';
import { ActionSheetIOS, StyleSheet } from 'react-native';
import { Constants } from "../../helpers";
import { Colors } from "../../style";
import { asBaseComponent } from "../../commons/new";
import Dialog from "../dialog";
import View from "../view";
import Text from "../text";
import Image from "../image"; //@ts-ignore

import ListItem from "../listItem";
import PanningProvider from "../panningViews/panningProvider";
const VERTICAL_PADDING = 8;

/**
 * @description: Cross platform Action Sheet, with a support for native iOS solution
 * @gif: https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.js
 */
class ActionSheet extends Component {
  static propTypes = {
    /**
       * Whether to show the action sheet or not
       */
    visible: _pt.bool.isRequired,

    /**
       * Title of the action sheet. Note: if both title and message are not passed will not render the title view at all
       */
    title: _pt.string,

    /**
       * Message of the action sheet
       */
    message: _pt.string,

    /**
       * Index of the option represents the cancel action (to be displayed as the separated bottom bold button)
       */
    cancelButtonIndex: _pt.number,

    /**
       * Index of the option represents the destructive action (will display red text. Usually used for 'delete' or
       * 'abort' actions)
       */
    destructiveButtonIndex: _pt.number,

    /**
       * Should use the native action sheet for iOS
       */
    useNativeIOS: _pt.bool,

    /**
       * When passed (only with useNativeIOS), will display a cancel button at the bottom (overrides cancelButtonIndex)
       */
    showCancelButton: _pt.bool,

    /**
       * Render custom title
       */
    renderTitle: _pt.func,

    /**
       * Render custom action
       * Note: you will need to call onOptionPress so the option's onPress will be called
       */
    renderAction: _pt.func,

    /**
       * Whether or not to handle SafeArea
       */
    useSafeArea: _pt.bool,

    /**
       * testID for e2e tests
       */
    testID: _pt.string
  };
  static displayName = 'ActionSheet';

  constructor(props) {
    super(props);
    this.onOptionPress = this.onOptionPress.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      useNativeIOS
    } = this.props;
    const wasVisible = prevProps.visible;
    const willBeVisible = this.props.visible;

    if (!wasVisible && willBeVisible && useNativeIOS && Constants.isIOS) {
      const {
        title,
        message,
        cancelButtonIndex,
        destructiveButtonIndex,
        options,
        showCancelButton
      } = this.props;
      const optionsArray = options !== undefined ? options : [];
      let cancelBtnIndex = cancelButtonIndex;

      if (showCancelButton) {
        optionsArray.push({
          label: 'Cancel'
        });
        cancelBtnIndex = optionsArray.length - 1;
      }

      ActionSheetIOS.showActionSheetWithOptions({
        title,
        message,
        options: optionsArray.map(option => option?.label || ''),
        cancelButtonIndex: cancelBtnIndex,
        destructiveButtonIndex
      }, this.onOptionPress);
    }
  }

  onOptionPress(optionIndex) {
    _.invoke(this.props, `options[${optionIndex}].onPress`);

    _.invoke(this.props, 'onDismiss');
  }

  handleRenderIcon = option => {
    // @ts-ignore
    let source = option.icon;

    if (!source) {
      source = _.isFunction(option.iconSource) ? option.iconSource() : option.iconSource;
    }

    return source && this.renderIcon(source);
  };

  renderIcon(iconSource) {
    return <Image source={iconSource} resizeMode={'contain'} style={{
      width: 20,
      height: 20,
      marginRight: 16
    }} />;
  }

  renderAction(option, index) {
    return <ListItem style={{
      backgroundColor: 'transparent'
    }} height={48} key={index} testID={option.testID} onPress={() => this.onOptionPress(index)} activeBackgroundColor={Colors.dark80}>
        <View row paddingL-16 flex centerV>
          {this.handleRenderIcon(option)}
          <Text text70 dark10 numberOfLines={1}>
            {option.label}
          </Text>
        </View>
      </ListItem>;
  }

  renderActions() {
    const {
      title,
      options,
      cancelButtonIndex,
      renderAction,
      optionsStyle
    } = this.props;

    const optionsToRender = _.filter(options, (_option, index) => index !== cancelButtonIndex);

    return <View style={[_.isEmpty(title) ? styles.listNoTitle : styles.listWithTitle, optionsStyle]}>
        {_.isFunction(renderAction) ? optionsToRender.map((option, index) => renderAction(option, index, this.onOptionPress)) : _.map(optionsToRender, this.renderAction)}
      </View>;
  }

  renderTitle() {
    const {
      title
    } = this.props;

    if (!_.isEmpty(title)) {
      return <View height={56} paddingL-16 centerV>
          <Text dark40 text70 style={{
          alignSelf: 'flex-start'
        }}>
            {title}
          </Text>
        </View>;
    }
  }

  renderSheet() {
    const {
      renderTitle
    } = this.props;
    const {
      containerStyle
    } = this.props;
    return <View style={[styles.sheet, containerStyle]}>
        {_.isFunction(renderTitle) ? renderTitle() : this.renderTitle()}
        {this.renderActions()}
      </View>;
  }

  render() {
    const {
      useNativeIOS,
      visible,
      onDismiss,
      dialogStyle,
      onModalDismissed,
      testID,
      useSafeArea
    } = this.props;

    if (Constants.isIOS && useNativeIOS) {
      return null;
    }

    return <Dialog useSafeArea={useSafeArea} testID={testID} bottom centerH width="100%" containerStyle={[styles.dialog, dialogStyle]} visible={visible} onDismiss={onDismiss} onModalDismissed={onModalDismissed} panDirection={PanningProvider.Directions.DOWN}>
        {this.renderSheet()}
      </Dialog>;
  }

}

export default asBaseComponent(ActionSheet);
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