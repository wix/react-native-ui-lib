import {StyleProp, ViewStyle} from 'react-native';
import {DialogProps} from '../Dialog';
import {ButtonProps} from '../../components/button';
import {ImageProps} from '../../components/image';
import {WithScrollReachedProps, WithScrollEnablerProps} from '../../commons/new';

export enum ActionSheetDismissReason {
  ACTION = 'action',
  CANCELED = 'canceled'
}

export type ActionSheetOptionProps = ButtonProps & {
  /**
   * Is this option a section header
   */
  isSectionHeader?: boolean;
  /**
   * Send true to avoid dismissing the ActionSheet on press
   */
  avoidDismiss?: boolean;
  /**
   * Set a function to be executed on press
   */
  onPress?: (selectedOptionProps: ActionSheetOptionProps, selectedOptionIndex: number) => void;

  key?: string | number;
};

export type ActionSheetGridItemProps = ButtonProps & {
  /**
   * Title for the GridItem
   */
  title?: string;
  /**
   * Icon's source for the GridItem
   */
  imageSource?: ImageProps['source'];
  /**
   *ImageStyle
   */
  imageStyle?: ImageProps['imageStyle'];
  /**
   * Action handler for the GridItem
   */
  onPress?: (selectedOptionProps: ActionSheetGridItemProps, selectedOptionIndex: number) => void;
  /**
   * Send true to avoid dismissing the ActionSheet on press
   */
  avoidDismiss?: boolean;
  testID?: string;
};

export interface ActionSheetProps extends Pick<DialogProps, 'visible'> {
  dialogProps?: Omit<DialogProps, 'visible' | 'onDismiss'>;
  /**
   * The callback that is called when the ActionSheet is dismissed
   */
  onDismiss?: (reason: ActionSheetDismissReason) => void;
  /**
   * List of options for the action sheet, follows the Button prop types (supply 'label' string and 'onPress'
   * function)
   */
  options?: ActionSheetOptionProps[];
  /**
   * Options for the action sheet (when wanting an ActionSheet with a GridView).
   *
   * title - title for the GridItem.
   * iconSource - icon's source for the GridItem.
   * onPress - action handler for the GridItem.
   * avoidDismiss - send true to avoid dismissing the ActionSheet on press.
   *
   * Example:
   * [
   *     {title: 'action 1', iconSource: Assets.icons.general.bookings, onPress: () => this.selectAction('action 1'), avoidDismiss: true},
   *     {title: 'action 2', iconSource: Assets.icons.general.forum, onPress: () => this.selectAction('action 2')},
   *     {title: 'action 3', iconSource: Assets.icons.general.groups, onPress: () => this.selectAction('action 3')},
   * ]
   */
  gridOptions?: ActionSheetGridItemProps[];
  /**
   * The number of columns in the GridView
   */
  gridNumColumns?: number;
  /**
   * The options' container style
   */
  optionsContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Index of the option represents the destructive action (will display red text. Usually used for 'delete' or
   * 'abort' actions)
   * Note: this is now used in both platforms, not only for native iOS
   */
  destructiveButtonIndex?: number;
  /**
   * Index of the option represents the prominent action
   * (will display text with theme color. Used for a prominent action)
   */
  prominentButtonIndex?: number;
  /**
   * The props of footer checkbox
   */
  footerCustomElement?: React.ReactElement;
  /**
   * Render custom action
   * Note: you will need to call onOptionPress so the option's onPress will be called
   */
  renderAction?: (option: ActionSheetOptionProps, index: number) => JSX.Element;
  /**
   * Component Test Id
   */
  testID?: string;
}

export interface ScrollReachedProps extends ActionSheetProps, WithScrollReachedProps {}
export interface ScrollEnabledProps extends ScrollReachedProps, WithScrollEnablerProps {}
