import _pt from "prop-types";
import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from "../../style";
import Constants from "../../helpers/Constants";
import { extractAlignmentsValues } from "../../commons/modifiers";
import { asBaseComponent } from "../../commons/new";
import { LogService } from "../../services";
import Modal from "../modal";
import View from "../view";
import PanListenerView from "../panningViews/panListenerView";
import DialogDismissibleView from "./DialogDismissibleView";
import OverlayFadingBackground from "./OverlayFadingBackground";
import PanningProvider from "../panningViews/panningProvider"; // TODO: KNOWN ISSUES
// 1. iOS pressing on the background while enter animation is happening will not call onDismiss
//    Touch events are not registered?
// 2. SafeArea is transparent
// 3. Check why we need the state change in DialogDismissibleView -> onLayout -> animateTo

const DEFAULT_OVERLAY_BACKGROUND_COLOR = Colors.rgba(Colors.dark10, 0.6);
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Dialog/Dialog.gif?raw=true
 */

class Dialog extends Component {
  static propTypes = {
    /**
         * Control visibility of the dialog
         */
    visible: _pt.bool,

    /**
         * Dismiss callback for when clicking on the background
         */
    onDismiss: _pt.func,

    /**
         * Whether or not to ignore background press
         */
    ignoreBackgroundPress: _pt.bool,

    /**
         * The color of the overlay background
         */
    overlayBackgroundColor: _pt.string,

    /**
         * The dialog width (default: 90%)
         */
    width: _pt.oneOfType([_pt.string, _pt.number]),

    /**
         * The dialog height (default: undefined)
         */
    height: _pt.oneOfType([_pt.string, _pt.number]),

    /**
         * Whether or not to handle SafeArea
         */
    useSafeArea: _pt.bool,

    /**
         * Called once the modal has been dismissed (iOS only) - Deprecated, use onDialogDismissed instead
         */
    onModalDismissed: _pt.func,

    /**
         * Called once the dialog has been dismissed completely
         */
    onDialogDismissed: _pt.func,

    /**
         * If this is added only the header will be pannable;
         * this allows for scrollable content (the children of the dialog)
         * props are transferred to the renderPannableHeader
         */
    renderPannableHeader: _pt.func,

    /**
         * The props that will be passed to the pannable header
         */
    pannableHeaderProps: _pt.any,

    /**
         * Used as a testing identifier
         */
    testID: _pt.string
  };
  static displayName = 'Dialog';
  static defaultProps = {
    overlayBackgroundColor: DEFAULT_OVERLAY_BACKGROUND_COLOR
  };

  constructor(props) {
    super(props);
    this.state = {
      alignments: extractAlignmentsValues(props),
      orientationKey: Constants.orientation,
      modalVisibility: props.visible,
      dialogVisibility: props.visible
    };
    this.styles = createStyles(this.props);
    this.setAlignment();

    if (!_.isUndefined(props.onModalDismissed)) {
      LogService.deprecationWarn({
        component: 'Dialog',
        oldProp: 'onModalDismissed',
        newProp: 'onDialogDismissed'
      });
    }
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChange);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChange);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      visible: nexVisible
    } = nextProps;
    const {
      visible
    } = this.props;

    if (nexVisible && !visible) {
      this.setState({
        modalVisibility: true,
        dialogVisibility: true
      });
    } else if (visible && !nexVisible) {
      this.hideDialogView();
    }
  }

  onOrientationChange = () => {
    const orientationKey = Constants.orientation;

    if (this.state.orientationKey !== orientationKey) {
      this.setState({
        orientationKey
      });
    }
  };

  setAlignment() {
    const {
      alignments
    } = this.state;

    if (_.isEmpty(alignments)) {
      this.styles.alignments = this.styles.centerContent;
    } else {
      this.styles.alignments = alignments;
    }
  } // TODO: revert adding this workaround once RN fixes https://github.com/facebook/react-native/issues/29455


  onFadeDone = () => {
    if (!this.state.modalVisibility) {
      setTimeout(() => {
        // unfortunately this is needed if a modal needs to open on iOS
        _.invoke(this.props, 'onDialogDismissed', this.props);

        _.invoke(this.props, 'onModalDismissed', this.props);
      }, 100);
    }
  };
  _onDismiss = () => {
    this.setState({
      modalVisibility: false,
      fadeOut: false
    }, () => {
      const props = this.props;

      if (props.visible) {
        _.invoke(props, 'onDismiss', props);
      } // Parity with iOS Modal's onDismiss


      if (Constants.isAndroid) {
        _.invoke(props, 'onDialogDismissed', props);
      }
    });
  };
  onDismiss = () => {
    const fadeOut = Constants.isIOS && this.props.visible;

    if (fadeOut) {
      this.setState({
        fadeOut
      }, this._onDismiss);
    } else {
      this._onDismiss();
    }
  };
  onModalDismissed = () => {
    _.invoke(this.props, 'onDialogDismissed', this.props);

    _.invoke(this.props, 'onModalDismissed', this.props);
  };
  hideDialogView = () => {
    this.setState({
      dialogVisibility: false
    });
  };
  renderPannableHeader = directions => {
    const {
      renderPannableHeader,
      pannableHeaderProps
    } = this.props;

    if (renderPannableHeader) {
      return <PanListenerView directions={directions}>{renderPannableHeader(pannableHeaderProps)}</PanListenerView>;
    }
  };
  getContainerType = () => {
    const {
      panDirection,
      renderPannableHeader
    } = this.props;

    if (!panDirection || renderPannableHeader) {
      return View;
    }

    return PanListenerView;
  };
  renderDialogView = () => {
    const {
      children,
      panDirection = PanningProvider.Directions.DOWN,
      containerStyle,
      testID
    } = this.props;
    const {
      dialogVisibility
    } = this.state;
    const Container = this.getContainerType();
    return <View testID={testID} style={[this.styles.dialogViewSize]} pointerEvents="box-none">
        <PanningProvider>
          <DialogDismissibleView direction={panDirection} visible={dialogVisibility} onDismiss={this.onDismiss} containerStyle={this.styles.flexType} style={this.styles.flexType}>
            <Container directions={[panDirection]} style={[this.styles.overflow, this.styles.flexType, containerStyle]}>
              {this.renderPannableHeader([panDirection])}
              {children}
            </Container>
          </DialogDismissibleView>
        </PanningProvider>
      </View>;
  }; // TODO: renderOverlay {_.invoke(this.props, 'renderOverlay')}

  renderDialogContainer = () => {
    const {
      modalVisibility,
      dialogVisibility,
      fadeOut
    } = this.state;
    const {
      useSafeArea,
      bottom,
      overlayBackgroundColor,
      testID
    } = this.props;
    const addBottomSafeArea = Constants.isIphoneX && useSafeArea && bottom;
    const bottomInsets = Constants.getSafeAreaInsets().bottom - 8; // TODO: should this be here or in the input style?

    const onFadeDone = Constants.isIOS ? this.onFadeDone : undefined;
    return <View useSafeArea={useSafeArea} style={[this.styles.centerHorizontal, this.styles.alignments, this.styles.container]} pointerEvents="box-none">
        <OverlayFadingBackground testID={`${testID}.overlayFadingBackground`} modalVisibility={modalVisibility} dialogVisibility={dialogVisibility} overlayBackgroundColor={overlayBackgroundColor} onFadeDone={onFadeDone} fadeOut={fadeOut} />
        {this.renderDialogView()}
        {addBottomSafeArea && <View style={{
        marginTop: bottomInsets
      }} />}
      </View>;
  };
  render = () => {
    const {
      orientationKey,
      modalVisibility
    } = this.state;
    const {
      testID,
      supportedOrientations,
      accessibilityLabel,
      ignoreBackgroundPress
    } = this.props;
    const onBackgroundPress = !ignoreBackgroundPress ? this.hideDialogView : undefined;
    return <Modal key={orientationKey} testID={`${testID}.modal`} transparent visible={modalVisibility} animationType={'none'} onBackgroundPress={onBackgroundPress} onRequestClose={onBackgroundPress} // onDismiss={this.onModalDismissed}
    supportedOrientations={supportedOrientations} accessibilityLabel={accessibilityLabel}>
        {this.renderDialogContainer()}
      </Modal>;
  };
}

function createStyles(props) {
  const {
    width = '90%',
    height
  } = props;
  const flexType = height ? {
    flex: 1
  } : {
    flex: 0
  };
  return StyleSheet.create({
    dialogViewSize: {
      width,
      height
    },
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

export default asBaseComponent(Dialog);