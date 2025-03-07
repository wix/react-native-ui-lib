import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {DialogProps} from '../dialog';
import {GridListItemProps} from '../../components/gridListItem';
import {GridViewProps} from '../../components/gridView';
import {IconProps} from '../../components/icon';
import {WithScrollReachedProps, WithScrollEnablerProps} from '../../commons/new';

export enum ActionSheetDismissReason {
  ACTION = 'action',
  CANCELED = 'canceled'
}

type BaseActionSheetOptionProps = {
  /**
   * Action handler for the GridItem
   */
  onPress?: (selectedOptionProps: ActionSheetGridItemProps, selectedOptionIndex: number) => void;
  /**
   * Send true to avoid dismissing the ActionSheet on press
   */
  avoidDismiss?: boolean;
};

export type ActionSheetOptionProps = BaseActionSheetOptionProps & {
  /**
   * Action title
   */
  title?: string;
  /**
   * title custom style
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Action subtitle
   */
  subtitle?: string;
  /**
   * subtitle custom style
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Icon to display for the action, render before the title
   */
  icon?: IconProps;
  /**
   * Custom element to be rendered on the Action left side
   */
  leftCustomElement?: React.ReactElement;
  /**
   * Custom element to be rendered on the Action right side
   */
  rightCustomElement?: React.ReactElement;
  /**
   * Is this option a section header
   */
  isSectionHeader?: boolean;
  /**
   * Section header style
   */
  sectionHeaderStyle?: StyleProp<ViewStyle>;
  /**
   * Testing identifier
   */
  testID?: string;
  key?: string | number;
};

export type ActionSheetGridItemProps = Omit<GridListItemProps, 'onPress'> & BaseActionSheetOptionProps;

export type ActionSheetGridProps = Omit<GridViewProps, 'items' | 'lastItemLabel' | 'lastItemOverlayColor'> & {
  onItemPress?: (props: any) => void;
};

export type ActionSheetGridList = ActionSheetGridProps & Pick<ActionSheetProps, 'options'>;

export interface ActionSheetProps extends Pick<DialogProps, 'visible'> {
  dialogProps?: Omit<DialogProps, 'visible' | 'onDismiss'>;
  /**
   * The callback that is called when the ActionSheet is dismissed
   */
  onDismiss?: (reason: ActionSheetDismissReason) => void;
  /**
   * List of options for the action sheet
   */
  options?: ActionSheetOptionProps[] | ActionSheetGridItemProps[];
  /**
   * Grid options for the action sheet
   */
  gridOptions?: ActionSheetGridProps;
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
