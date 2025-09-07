import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import _isFunction from "lodash/isFunction";
import React, { Component } from 'react';
import { ActionSheetIOS, StyleSheet } from 'react-native';
import { Colors } from "../../style";
import { asBaseComponent, Constants } from "../../commons/new";
import Dialog from "../dialog";
import View from "../view";
import Text from "../text";
import Image from "../image";
//@ts-ignore
import ListItem from "../listItem";
import PanningProvider from "../panningViews/panningProvider";
import { Dialog as IncubatorDialog } from "../../incubator";
import { LogService } from "../../services";
const VERTICAL_PADDING = 8;
/**
 * @description: Cross platform Action Sheet, with a support for native iOS solution
 * @gif: https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.tsx
 */
class ActionSheet extends Component {
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
    this.props.options?.[optionIndex].onPress?.();
    this.props.onDismiss?.();
  }
  handleRenderIcon = option => {
    // @ts-ignore
    let source = option.icon;
    if (!source) {
      source = _isFunction(option.iconSource) ? option.iconSource() : option.iconSource;
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
    }} height={48} key={index} testID={option.testID} onPress={() => this.onOptionPress(index)} activeBackgroundColor={Colors.$backgroundNeutralLight}>
        <View row paddingL-16 flex centerV>
          {this.handleRenderIcon(option)}
          <Text text70 $textDefault numberOfLines={1} style={option.labelStyle}>
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
    const optionsToRender = _filter(options, (_option, index) => index !== cancelButtonIndex);
    return <View style={[_isEmpty(title) ? styles.listNoTitle : styles.listWithTitle, optionsStyle]}>
        {_isFunction(renderAction) ? optionsToRender.map((option, index) => renderAction(option, index, this.onOptionPress)) : _map(optionsToRender, this.renderAction)}
      </View>;
  }
  renderTitle() {
    const {
      title
    } = this.props;
    if (!_isEmpty(title)) {
      return <View height={56} paddingL-16 centerV>
          <Text $textNeutralLight text70 style={{
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
        {_isFunction(renderTitle) ? renderTitle() : this.renderTitle()}
        {this.renderActions()}
      </View>;
  }
  renderOldDialog() {
    const {
      useNativeIOS,
      visible,
      onDismiss,
      dialogStyle,
      onModalDismissed,
      testID,
      useSafeArea,
      dialogProps
    } = this.props;
    if (Constants.isIOS && useNativeIOS) {
      return null;
    }
    return <Dialog bottom centerH width="100%" panDirection={PanningProvider.Directions.DOWN} {...dialogProps} useSafeArea={useSafeArea} testID={testID} containerStyle={[styles.dialog, dialogStyle]} visible={visible} onDismiss={onDismiss} onDialogDismissed={onModalDismissed}>
        {this.renderSheet()}
      </Dialog>;
  }
  renderNewDialog() {
    const {
      visible,
      onDismiss,
      dialogStyle,
      onModalDismissed,
      testID,
      useSafeArea,
      dialogProps
    } = this.props;
    if (onModalDismissed) {
      LogService.deprecationWarn({
        component: 'ActionSheet',
        oldProp: 'onModalDismissed',
        newProp: 'onDismiss'
      });
    }
    return <IncubatorDialog bottom centerH width="100%" direction={PanningProvider.Directions.DOWN} {...dialogProps} useSafeArea={useSafeArea} testID={testID} containerStyle={[styles.incubatorDialog, dialogStyle]} visible={visible} onDismiss={onDismiss}>
        {this.renderSheet()}
      </IncubatorDialog>;
  }
  render() {
    const {
      migrateDialog
    } = this.props;
    if (migrateDialog) {
      return this.renderNewDialog();
    } else {
      return this.renderOldDialog();
    }
  }
}
export default asBaseComponent(ActionSheet);
const styles = StyleSheet.create({
  sheet: {
    backgroundColor: Colors.$backgroundDefault
  },
  dialog: {
    backgroundColor: Colors.$backgroundDefault
  },
  incubatorDialog: {
    backgroundColor: Colors.$backgroundDefault,
    marginBottom: 0
  },
  listWithTitle: {
    paddingBottom: VERTICAL_PADDING
  },
  listNoTitle: {
    paddingTop: VERTICAL_PADDING,
    paddingBottom: VERTICAL_PADDING
  }
});