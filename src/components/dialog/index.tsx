import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, StyleProp, ViewStyle, ModalPropsIOS, AccessibilityProps} from 'react-native';
import {Colors} from '../../style';
import {AlignmentModifiers, extractAlignmentsValues} from '../../commons/modifiers';
import {Constants, asBaseComponent} from '../../commons/new';
import Modal, {ModalProps} from '../modal';
import View from '../view';
import PanListenerView from '../panningViews/panListenerView';
import DialogDismissibleView from './DialogDismissibleView';
import OverlayFadingBackground from './OverlayFadingBackground';
import PanningProvider, {PanningDirections, PanningDirectionsEnum} from '../panningViews/panningProvider';
export {PanningDirections as DialogDirections, PanningDirectionsEnum as DialogDirectionsEnum};

// TODO: KNOWN ISSUES
// 1. iOS pressing on the background while enter animation is happening will not call onDismiss
//    Touch events are not registered?
// 2. SafeArea is transparent
// 3. Check why we need the state change in DialogDismissibleView -> onLayout -> animateTo

interface RNPartialProps
  extends Pick<ModalPropsIOS, 'supportedOrientations'>,
    Pick<AccessibilityProps, 'accessibilityLabel'> {}

export interface DialogProps extends AlignmentModifiers, RNPartialProps {
  /**
   * Control visibility of the dialog
   */
  visible?: boolean;
  /**
   * Dismiss callback for when clicking on the background
   */
  onDismiss?: (props?: any) => void;
  /**
   * Whether or not to ignore background press
   */
  ignoreBackgroundPress?: boolean;
  /**
   * The color of the overlay background
   */
  overlayBackgroundColor?: string;
  /**
   * The dialog width (default: 90%)
   */
  width?: string | number;
  /**
   * The dialog height (default: undefined)
   */
  height?: string | number | null;
  /**
   * The direction of the allowed pan (default is DOWN).
   * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###).
   * Pass null to remove pan.
   */
  panDirection?: PanningDirections;
  /**
   * Whether or not to handle SafeArea
   */
  useSafeArea?: boolean;
  /**
   * Called once the dialog has been dismissed completely
   */
  onDialogDismissed?: (props: any) => void;
  /**
   * If this is added only the header will be pannable;
   * this allows for scrollable content (the children of the dialog)
   * props are transferred to the renderPannableHeader
   */
  renderPannableHeader?: (props: any) => JSX.Element;
  /**
   * The props that will be passed to the pannable header
   */
  pannableHeaderProps?: any;
  /** 
   * Additional props for the modal. 
   */
  modalProps?: ModalProps;
  /**
   * The Dialog`s container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Used as a testing identifier
   */
  testID?: string;
  children?: React.ReactNode;
}

interface DialogState {
  alignments: AlignmentModifiers;
  modalVisibility?: boolean;
  dialogVisibility?: boolean;
  fadeOut?: boolean;
}

const DEFAULT_OVERLAY_BACKGROUND_COLOR = Colors.rgba(Colors.grey20, 0.65);

/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Dialog/Dialog.gif?raw=true
 */
class Dialog extends Component<DialogProps, DialogState> {
  static displayName = 'Dialog';
  static directions = PanningDirectionsEnum;

  static defaultProps = {
    overlayBackgroundColor: DEFAULT_OVERLAY_BACKGROUND_COLOR
  };

  private styles: any;

  constructor(props: DialogProps) {
    super(props);

    this.state = {
      alignments: extractAlignmentsValues(props),
      modalVisibility: props.visible,
      dialogVisibility: props.visible
    };

    this.styles = createStyles(this.props);
    this.setAlignment();
  }

  UNSAFE_componentWillReceiveProps(nextProps: DialogProps) {
    const {visible: nexVisible} = nextProps;
    const {visible} = this.props;

    if (nexVisible && !visible) {
      this.setState({modalVisibility: true, dialogVisibility: true});
    } else if (visible && !nexVisible) {
      this.hideDialogView();
    }
  }

  setAlignment() {
    const {alignments} = this.state;
    if (_.isEmpty(alignments)) {
      this.styles.alignments = this.styles.centerContent;
    } else {
      this.styles.alignments = alignments;
    }
  }

  // TODO: revert adding this workaround once RN fixes https://github.com/facebook/react-native/issues/29455
  onFadeDone = () => {
    if (!this.state.modalVisibility) {
      setTimeout(() => {
        // unfortunately this is needed if a modal needs to open on iOS
        this.props.onDialogDismissed?.(this.props);
      }, 100);
    }
  };

  _onDismiss = () => {
    this.setState({modalVisibility: false, fadeOut: false}, () => {
      const props = this.props;
      if (props.visible) {
        props.onDismiss?.(props);
      }
      // Parity with iOS Modal's onDismiss
      if (Constants.isAndroid) {
        props.onDialogDismissed?.(props);
      }
    });
  };

  onDismiss = () => {
    const fadeOut = Constants.isIOS && this.props.visible;

    if (fadeOut) {
      this.setState({fadeOut}, this._onDismiss);
    } else {
      this._onDismiss();
    }
  };

  hideDialogView = () => {
    this.setState({dialogVisibility: false});
  };

  renderPannableHeader = (directions: PanningDirections[]) => {
    const {renderPannableHeader, pannableHeaderProps} = this.props;
    if (renderPannableHeader) {
      return <PanListenerView directions={directions}>{renderPannableHeader(pannableHeaderProps)}</PanListenerView>;
    }
  };

  getContainerType = () => {
    const {panDirection, renderPannableHeader} = this.props;
    if (!panDirection || renderPannableHeader) {
      return View;
    }
    return PanListenerView;
  };

  renderDialogView = () => {
    const {children, panDirection = PanningProvider.Directions.DOWN, containerStyle, testID} = this.props;
    const {dialogVisibility} = this.state;
    const Container = this.getContainerType();

    return (
      <View testID={testID} style={[this.styles.dialogViewSize]} pointerEvents="box-none">
        <PanningProvider>
          <DialogDismissibleView
            direction={panDirection}
            visible={dialogVisibility}
            onDismiss={this.onDismiss}
            containerStyle={this.styles.flexType}
            style={this.styles.flexType}
          >
            <Container directions={[panDirection]} style={[this.styles.overflow, this.styles.flexType, containerStyle]}>
              {this.renderPannableHeader([panDirection])}
              {children}
            </Container>
          </DialogDismissibleView>
        </PanningProvider>
      </View>
    );
  };

  // TODO: renderOverlay {_.invoke(this.props, 'renderOverlay')}
  renderDialogContainer = () => {
    const {modalVisibility, dialogVisibility, fadeOut} = this.state;
    const {useSafeArea, bottom, overlayBackgroundColor, testID} = this.props;
    const addBottomSafeArea = Constants.isIphoneX && useSafeArea && bottom;
    const bottomInsets = Constants.getSafeAreaInsets().bottom - 8; // TODO: should this be here or in the input style?
    const onFadeDone = Constants.isIOS ? this.onFadeDone : undefined;

    return (
      <View
        useSafeArea={useSafeArea}
        style={[this.styles.centerHorizontal, this.styles.alignments, this.styles.container]}
        pointerEvents="box-none"
      >
        <OverlayFadingBackground
          testID={`${testID}.overlayFadingBackground`}
          modalVisibility={modalVisibility}
          dialogVisibility={dialogVisibility}
          overlayBackgroundColor={overlayBackgroundColor}
          onFadeDone={onFadeDone}
          fadeOut={fadeOut}
        />
        {this.renderDialogView()}
        {addBottomSafeArea && <View style={{marginTop: bottomInsets}}/>}
      </View>
    );
  };

  render = () => {
    const {modalVisibility} = this.state;
    const {testID, supportedOrientations, accessibilityLabel, ignoreBackgroundPress, modalProps} = this.props;
    const onBackgroundPress = !ignoreBackgroundPress ? this.hideDialogView : undefined;

    return (
      <Modal
        testID={`${testID}.modal`}
        transparent
        visible={modalVisibility}
        animationType={'none'}
        onBackgroundPress={onBackgroundPress}
        onRequestClose={onBackgroundPress}
        supportedOrientations={supportedOrientations}
        accessibilityLabel={accessibilityLabel}
        {...modalProps}
      >
        {this.renderDialogContainer()}
      </Modal>
    );
  };
}

function createStyles(props: DialogProps) {
  const {width = '90%', height} = props;
  const flexType = height ? {flex: 1} : {flex: 0};
  return StyleSheet.create({
    dialogViewSize: {width, height: height ?? undefined},
    flexType,
    container: {
      flex: 1
    },
    centerHorizontal: {
      alignItems: 'center'
    },
    centerContent: {
      justifyContent: 'center'
    },
    overflow: {
      overflow: 'hidden'
    }
  });
}

export default asBaseComponent<DialogProps, typeof Dialog>(Dialog);
