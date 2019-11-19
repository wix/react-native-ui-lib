import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Modal from '../../screensComponents/modal';
import View from '../view';
import PanListenerView from '../panningViews/panListenerView';
import DialogDismissibleView from './DialogDismissibleView';
import PanningProvider from '../panningViews/panningProvider';
import DialogDeprecated from './dialogDeprecated';

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
  static displayName = 'Dialog';
  static propTypes = {
    /**
     * Control visibility of the dialog
     */
    visible: PropTypes.bool,
    /**
     * Dismiss callback for when clicking on the background
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
     * The direction of the allowed pan (default is DOWN)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    panDirection: PropTypes.oneOf(Object.values(PanningProvider.Directions)),
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea: PropTypes.bool,
    /**
     * Called once the modal has been dissmissed (iOS only, modal only)
     */
    onModalDismissed: PropTypes.func,
    /**
     * If this is added only the header will be pannable;
     * this allows for scrollable content (the children of the dialog)
     * props are transferred to the renderPannableHeader
     */
    renderPannableHeader: PropTypes.func,
    /**
     * The props that will be passed to the pannable header
     */
    pannableHeaderProps: PropTypes.any,
    /**
     * Migration flag, send true to use the new (and improved) Dialog, default is false
     */
    migrate: PropTypes.bool,
    /**
     * The Dialog`s container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  };

  static defaultProps = {
    migrate: false,
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: '90%'
  };

  constructor(props) {
    super(props);

    this.state = {
      alignments: this.state.alignments,
      orientationKey: Constants.orientation,
      modalVisibility: props.visible,
      dialogVisibility: props.visible
    };

    if (props.migrate) {
      this.setAlignment();
    }
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
    if (this.props.migrate) {
      this.styles = createStyles(this.props);
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

  onDismiss = () => {
    this.setState({modalVisibility: false}, () => {
      if (this.props.visible) {
        _.invoke(this.props, 'onDismiss', this.props);
      }
    });
  };

  hideDialogView = () => {
    this.setState({dialogVisibility: false});
  };

  renderPannableHeader = directions => {
    const {renderPannableHeader, pannableHeaderProps} = this.props;
    if (renderPannableHeader) {
      return <PanListenerView directions={directions}>{renderPannableHeader(pannableHeaderProps)}</PanListenerView>;
    }
  };

  renderDialogView = () => {
    const {children, renderPannableHeader, panDirection, containerStyle, testID} = this.props;
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

  // TODO: renderOverlay {_.invoke(this.props, 'renderOverlay')}
  renderDialogContainer = () => {
    const {useSafeArea, bottom} = this.props;
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

  renderModal = () => {
    const {orientationKey, modalVisibility} = this.state;
    const {overlayBackgroundColor, onModalDismissed, supportedOrientations} = this.getThemeProps();

    return (
      <Modal
        key={orientationKey}
        transparent
        visible={modalVisibility}
        animationType={'fade'}
        onBackgroundPress={this.hideDialogView}
        onRequestClose={this.hideDialogView}
        overlayBackgroundColor={overlayBackgroundColor}
        onDismiss={onModalDismissed}
        supportedOrientations={supportedOrientations}
      >
        {this.renderDialogContainer()}
      </Modal>
    );
  };

  render() {
    const {migrate, ...others} = this.getThemeProps();

    if (migrate) {
      return this.renderModal();
    } else {
      return <DialogDeprecated {...others}/>;
    }
  }
}

function createStyles(props) {
  const {width, height} = props;
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
