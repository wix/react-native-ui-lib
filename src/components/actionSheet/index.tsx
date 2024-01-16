import _ from 'lodash';
import React, {Component} from 'react';
import {ActionSheetIOS, StyleSheet, StyleProp, ViewStyle, ImageProps, ImageSourcePropType} from 'react-native';
import {Colors} from '../../style';
import {asBaseComponent, Constants} from '../../commons/new';
import Dialog, {DialogProps} from '../dialog';
import View from '../view';
import Text from '../text';
import {ButtonProps} from '../button';
import Image from '../image';
//@ts-ignore
import ListItem from '../listItem';
import PanningProvider from '../panningViews/panningProvider';
import {Dialog as IncubatorDialog, DialogProps as IncubatorDialogProps} from '../../incubator';
import {LogService} from '../../services';
import {RecorderProps} from 'src/typings/recorderTypes';

const VERTICAL_PADDING = 8;
type ActionSheetOnOptionPress = (index: number) => void;

type ActionSheetProps = RecorderProps & {
  /**
   * Migrate to the Incubator.Dialog component
   */
  migrateDialog?: boolean;
  /**
   * Whether to show the action sheet or not
   */
  visible: boolean;
  /**
   * Title of the action sheet. Note: if both title and message are not passed will not render the title view at all
   */
  title?: string;
  /**
   * Message of the action sheet
   */
  message?: string;
  /**
   * Index of the option represents the cancel action (to be displayed as the separated bottom bold button)
   */
  cancelButtonIndex?: number;
  /**
   * Index of the option represents the destructive action (will display red text. Usually used for 'delete' or
   * 'abort' actions)
   */
  destructiveButtonIndex?: number;
  /**
   * List of options for the action sheet, follows the Button prop types (supply 'label' string and 'onPress'
   * function)
   */
  options?: Array<ButtonProps>;
  /**
   * callback for when dismissing the action sheet, usually used for setting visible prop to false
   */
  onDismiss?: DialogProps['onDismiss'];
  /**
   * Should use the native action sheet for iOS
   */
  useNativeIOS?: boolean;
  /**
   * When passed (only with useNativeIOS), will display a cancel button at the bottom (overrides cancelButtonIndex)
   */
  showCancelButton?: boolean;
  /**
   * Add or override style of the action sheet (wraps the title and actions)
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Add or override style of the dialog wrapping the action sheet
   */
  dialogStyle?: StyleProp<ViewStyle>;
  /**
   * Add or override style of the options list
   */
  optionsStyle?: StyleProp<ViewStyle>;
  /**
   * Render custom title
   */
  renderTitle?: () => JSX.Element;
  /**
   * Render custom action
   * Note: you will need to call onOptionPress so the option's onPress will be called
   */
  renderAction?: (option: ButtonProps, index: number, onOptionPress: ActionSheetOnOptionPress) => JSX.Element;
  /**
   * @deprecated
   * Called once the modal has been dismissed completely
   */
  onModalDismissed?: DialogProps['onDialogDismissed'];
  /**
   * Whether or not to handle SafeArea
   */
  useSafeArea?: boolean;
  /**
   * Additional props to send to the Dialog
   */
  dialogProps?: Omit<
    DialogProps,
    'useSafeArea' | 'testID' | 'containerStyle' | 'visible' | 'onDismiss' | 'onDialogDismissed'
  > | IncubatorDialogProps;
  /**
   * testID for e2e tests
   */
  testID?: string;
};

/**
 * @description: Cross platform Action Sheet, with a support for native iOS solution
 * @gif: https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.tsx
 */
class ActionSheet extends Component<ActionSheetProps> {
  static displayName = 'ActionSheet';
  static defaultProps: Partial<ActionSheetProps> = {
    recorderTag: 'unmask'
  };

  constructor(props: ActionSheetProps) {
    super(props);

    this.onOptionPress = this.onOptionPress.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  componentDidUpdate(prevProps: ActionSheetProps) {
    const {useNativeIOS} = this.props;
    const wasVisible = prevProps.visible;
    const willBeVisible = this.props.visible;

    if (!wasVisible && willBeVisible && useNativeIOS && Constants.isIOS) {
      const {title, message, cancelButtonIndex, destructiveButtonIndex, options, showCancelButton} = this.props;

      const optionsArray = options !== undefined ? options : [];
      let cancelBtnIndex = cancelButtonIndex;
      if (showCancelButton) {
        optionsArray.push({label: 'Cancel'});
        cancelBtnIndex = optionsArray.length - 1;
      }

      ActionSheetIOS.showActionSheetWithOptions({
        title,
        message,
        options: optionsArray.map(option => option?.label || ''),
        cancelButtonIndex: cancelBtnIndex,
        destructiveButtonIndex
      },
      this.onOptionPress);
    }
  }

  onOptionPress(optionIndex: number) {
    this.props.options?.[optionIndex].onPress?.();
    this.props.onDismiss?.();
  }

  handleRenderIcon = (option: ButtonProps) => {
    // @ts-ignore
    let source = option.icon;
    if (!source) {
      source = _.isFunction(option.iconSource) ? option.iconSource() : (option.iconSource as ImageProps['source']);
    }
    return source && this.renderIcon(source);
  };

  renderIcon(iconSource: ImageSourcePropType) {
    const {recorderTag} = this.props;
    return <Image source={iconSource} resizeMode={'contain'} style={{width: 20, height: 20, marginRight: 16}} recorderTag={recorderTag}/>;
  }

  renderAction(option: ButtonProps, index: number) {
    const {recorderTag} = this.props;
    return (
      <ListItem
        style={{backgroundColor: 'transparent'}}
        height={48}
        key={index}
        testID={option.testID}
        onPress={() => this.onOptionPress(index)}
        activeBackgroundColor={Colors.grey80}
        recorderTag={recorderTag}
      >
        <View row paddingL-16 flex centerV recorderTag={recorderTag}>
          {this.handleRenderIcon(option)}
          <Text text70 grey10 numberOfLines={1} style={option.labelStyle} recorderTag={recorderTag}>
            {option.label}
          </Text>
        </View>
      </ListItem>
    );
  }

  renderActions() {
    const {title, options, cancelButtonIndex, renderAction, optionsStyle, recorderTag} = this.props;
    const optionsToRender = _.filter(options, (_option, index) => index !== cancelButtonIndex);

    return (
      <View style={[_.isEmpty(title) ? styles.listNoTitle : styles.listWithTitle, optionsStyle]} recorderTag={recorderTag}>
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
          <Text grey40 text70 style={{alignSelf: 'flex-start'}}>
            {title}
          </Text>
        </View>
      );
    }
  }

  renderSheet() {
    const {renderTitle, recorderTag} = this.props;
    const {containerStyle} = this.props;
    return (
      <View style={[styles.sheet, containerStyle]} recorderTag={recorderTag}>
        {_.isFunction(renderTitle) ? renderTitle() : this.renderTitle()}
        {this.renderActions()}
      </View>
    );
  }

  renderOldDialog() {
    const {useNativeIOS, visible, onDismiss, dialogStyle, onModalDismissed, testID, useSafeArea, dialogProps, recorderTag} =
      this.props;

    if (Constants.isIOS && useNativeIOS) {
      return null;
    }

    return (
      <Dialog
        bottom
        centerH
        width="100%"
        panDirection={PanningProvider.Directions.DOWN}
        {...dialogProps}
        useSafeArea={useSafeArea}
        testID={testID}
        containerStyle={[styles.dialog, dialogStyle]}
        visible={visible}
        onDismiss={onDismiss}
        onDialogDismissed={onModalDismissed}
        recorderTag={recorderTag}
      >
        {this.renderSheet()}
      </Dialog>
    );
  }

  renderNewDialog() {
    const {visible, onDismiss, dialogStyle, onModalDismissed, testID, useSafeArea, dialogProps, recorderTag} = this.props;

    if (onModalDismissed) {
      LogService.deprecationWarn({component: 'ActionSheet', oldProp: 'onModalDismissed', newProp: 'onDismiss'});
    }

    return (
      // @ts-expect-error height might be null here
      <IncubatorDialog
        bottom
        centerH
        width="100%"
        direction={PanningProvider.Directions.DOWN}
        {...dialogProps}
        useSafeArea={useSafeArea}
        testID={testID}
        containerStyle={[styles.incubatorDialog, dialogStyle]}
        visible={visible}
        onDismiss={onDismiss}
        recorderTag={recorderTag}
      >
        {this.renderSheet()}
      </IncubatorDialog>
    );
  }

  render() {
    const {migrateDialog} = this.props;
    if (migrateDialog) {
      return this.renderNewDialog();
    } else {
      return this.renderOldDialog();
    }
  }
}

export default asBaseComponent<ActionSheetProps>(ActionSheet);

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: Colors.white
  },
  dialog: {
    backgroundColor: Colors.white
  },
  incubatorDialog: {
    backgroundColor: Colors.white,
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
