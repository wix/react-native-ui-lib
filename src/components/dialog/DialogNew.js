import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Modal from '../modal';
import View from '../view';
import PanListenerView from '../panningViews/panListenerView';
import DialogDismissibleView from './DialogDismissibleView';
import PanningProvider from '../panningViews/panningProvider';

const CLOSE_REASON = {
  /**
   * Closed by the developer - visible prop was changed from true to false 
   */
  CLOSED: 'closed',
  /**
   * Canceled by the user - background was pressed (iOS, Android), back button was pressed (Android) etc.
   */
  CANCELED: 'canceled'
};

// TODO: KNOWN ISSUES
// 1. iOS pressing on the background while enter animation is happening will not call onDismiss
//    Touch events are not registered?
// 2. SafeArea is transparent
// 3. Check why we need the state change in DialogDismissibleView -> onLayout -> animateTo

/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://media.giphy.com/media/9S58XdLCoUiLzAc1b1/giphy.gif
 */
class Dialog extends BaseComponent {
  // TODO: change after migrate is removed
  static displayName = 'Dialog (new)';
  static propTypes = {
    /**
     * Control visibility of the dialog
     */
    visible: PropTypes.bool,
    /**
     * Will be called once the dialog is closed (after the animation has ended)
     * Usage: `onDismiss(closeReason, props) {...}`
     */
    onDismiss: PropTypes.func,
    /**
     * The color of the overlay background
     */
    overlayBackgroundColor: PropTypes.string,
    /**
     * The dialog width (default: 90%)
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The dialog height (default: undefined)
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The direction of the allowed pan (default is DOWN).
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###).
     * Pass null to remove pan.
     */
    panDirection: PropTypes.oneOf(Object.values(PanningProvider.Directions)),
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea: PropTypes.bool,
    /**
     * If this is added only the header will be pannable;
     * this allows for scrollable content (the children of the dialog)
     * props are transferred to the renderPannableHeader
     */
    renderPannableHeader: PropTypes.elementType,
    /**
     * The props that will be passed to the pannable header
     */
    pannableHeaderProps: PropTypes.any,
    /**
     * The Dialog`s container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  };

  static defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6)
  };

  static closeReason = CLOSE_REASON;

  constructor(props) {
    super(props);

    this.state = {
      dialogWasCanceled: false,
      alignments: this.state.alignments,
      orientationKey: Constants.orientation,
      modalVisibility: props.visible,
      dialogVisibility: props.visible
    };

    this.setAlignment();
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChange);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChange);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {visible: nexVisible} = nextProps;
    const {visible} = this.props;

    if (nexVisible && !visible) {
      this.setState({modalVisibility: true, dialogVisibility: true});
    } else if (visible && !nexVisible) {
      this.hideDialogView();
    }
  }

  onOrientationChange = () => {
    const orientationKey = Constants.orientation;
    if (this.state.orientationKey !== orientationKey) {
      this.setState({orientationKey});
    }
  };

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  setAlignment() {
    const {alignments} = this.state;
    if (_.isEmpty(alignments)) {
      this.styles.alignments = this.styles.centerContent;
    } else {
      this.styles.alignments = alignments;
    }
  }

  onIosModalDismissed = () => {
    const props = this.getThemeProps();
    const {dialogWasCanceled} = this.state;
    const closeReason = dialogWasCanceled ? Dialog.closeReason.CANCELED : Dialog.closeReason.CLOSED;
    _.invoke(props, 'onDismiss', closeReason, props);
    this.setState({dialogWasCanceled: false}); // modalVisibility will be set to false in onDismiss
  }

  onDismiss = () => {
    if (Constants.isAndroid) {
      const props = this.getThemeProps();
      if (!props.visible) {
        _.invoke(props, 'onDismiss', Dialog.closeReason.CLOSED, props);
        this.setState({modalVisibility: false}); // dialogWasCanceled already false
      } else {
        this.setState({modalVisibility: false}, () => {
          _.invoke(props, 'onDismiss', Dialog.closeReason.CANCELED, props);
          this.setState({dialogWasCanceled: false}); // modalVisibility already false
        });
      }
    } else {
      this.setState({modalVisibility: false}); // dialogWasCanceled already false
    }
  };

  // if coming from onBackgroundPress\onRequestClose this will be an object,
  // but we do not want to override the true state when coming from UNSAFE_componentWillReceiveProps
  hideDialogView = (isCancelObject) => {
    const dialogWasCanceled = !_.isUndefined(isCancelObject);
    if (dialogWasCanceled) {
      this.setState({dialogVisibility: false, dialogWasCanceled});
    } else {
      this.setState({dialogVisibility: false});
    }
  };

  renderPannableHeader = directions => {
    const {renderPannableHeader, pannableHeaderProps} = this.getThemeProps();
    if (renderPannableHeader) {
      return <PanListenerView directions={directions}>{renderPannableHeader(pannableHeaderProps)}</PanListenerView>;
    }
  };

  renderDialogView = () => {
    const {children, renderPannableHeader, panDirection = PanningProvider.Directions.DOWN, containerStyle, testID} = this.getThemeProps();
    const {dialogVisibility} = this.state;
    const Container = renderPannableHeader ? View : PanListenerView;

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

  // TODO: renderOverlay {_.invoke(this.getThemeProps(), 'renderOverlay')}
  renderDialogContainer = () => {
    const {useSafeArea, bottom} = this.getThemeProps();
    const addBottomSafeArea = Constants.isIphoneX && (useSafeArea && bottom);
    const bottomInsets = Constants.getSafeAreaInsets().bottom - 8; // TODO: should this be here or in the input style?

    return (
      <View
        useSafeArea={useSafeArea}
        style={[this.styles.centerHorizontal, this.styles.alignments, this.styles.container]}
        pointerEvents="box-none"
      >
        {this.renderDialogView()}
        {addBottomSafeArea && <View style={{marginTop: bottomInsets}}/>}
      </View>
    );
  };

  render = () => {
    const {orientationKey, modalVisibility} = this.state;
    const {overlayBackgroundColor, supportedOrientations, accessibilityLabel} = this.getThemeProps();

    return (
      <Modal
        key={orientationKey}
        transparent
        visible={modalVisibility}
        animationType={'fade'}
        onBackgroundPress={this.hideDialogView}
        onRequestClose={this.hideDialogView}
        overlayBackgroundColor={overlayBackgroundColor}
        onDismiss={this.onIosModalDismissed}
        supportedOrientations={supportedOrientations}
        accessibilityLabel={accessibilityLabel}
      >
        {this.renderDialogContainer()}
      </Modal>
    );
  };
}

function createStyles(props) {
  const {width = '90%', height} = props;
  const flexType = height ? {flex: 1} : {flex: 0};
  return StyleSheet.create({
    dialogViewSize: {width, height},
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

export default Dialog;
