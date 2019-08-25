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
// 2. Hack to avoid the view returning to be visible after onDismiss
//    DialogDismissibleView --> render --> isDismissed && {opacity: 0}
// 3. Test examples in landscape
// 4. SafeArea is transparent

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
     * The dialog height (default: 70%)
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The direction of the allowed pan (default is DOWN)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    panDirection: PropTypes.oneOf(Object.values(PanningProvider.Directions)),
    /**
     * Disable the pan gesture recognizer
     */
    disablePan: PropTypes.bool,
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
     * Migration flag, send true to use the new (and improved) Dialog, default is false
     */
    migrate: PropTypes.bool,
  };

  static defaultProps = {
    migrate: false,
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: '90%',
    height: '70%',
  };

  constructor(props) {
    super(props);

    this.state = {
      alignments: this.state.alignments,
      dialogKey: undefined,
      visible: props.visible,
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

  componentDidUpdate(prevProps) {
    const {visible} = this.props;
    const {visible: prevVisible} = prevProps;

    if (visible && !prevVisible) {
      this.setState({visible: true});
    } else if (prevVisible && !visible) {
      this.animateDismiss();
    }
  }

  onOrientationChange = () => {
    const dialogKey = Constants.orientation;
    if (this.state.dialogKey !== dialogKey) {
      this.setState({dialogKey});
    }
  };

  generateStyles() {
    if (this.props.migrate) {
      this.dynamicStyles = createStyles(this.props);
    }
  }

  setAlignment() {
    const {alignments} = this.state;
    if (_.isEmpty(alignments)) {
      this.dynamicStyles.alignments = styles.centerContent;
    } else {
      this.dynamicStyles.alignments = alignments;
    }
  }

  onDismiss = () => {
    this.setState({visible: false}, () => _.invoke(this.props, 'onDismiss', this.props));
  };

  setDismissibleViewRef = ref => {
    this.dismissibleViewRef = ref;
  };

  animateDismiss = () => {
    if (!this.dismissibleViewRef) {
      this.onDismiss();
    } else {
      this.dismissibleViewRef.contentRef.animateDismiss();
    }
  };

  renderPannableHeader = directions => {
    const {renderPannableHeader, ...others} = this.props;
    if (renderPannableHeader) {
      return <PanListenerView directions={directions}>{renderPannableHeader(others)}</PanListenerView>;
    }
  };

  getDirection = () => {
    const {panDirection, disablePan, renderPannableHeader} = this.props;
    let direction;
    if (disablePan) {
      direction = undefined;
    } else if (this.props.top) {
      direction = PanningProvider.Directions.UP;
    } else if (!_.isUndefined(renderPannableHeader) || _.isUndefined(panDirection)) {
      direction = PanningProvider.Directions.DOWN;
    } else {
      direction = panDirection;
    }

    return direction;
  };

  // TODO: renderOverlay {_.invoke(this.props, 'renderOverlay')}
  renderVisibleContainer = () => {
    const {children, renderPannableHeader, style, useSafeArea, bottom, top} = this.props;
    const addBottomSafeArea = Constants.isIphoneX && (useSafeArea && bottom);
    const Container = !_.isUndefined(renderPannableHeader) ? View : PanListenerView;
    const direction = this.getDirection();
    const bottomInsets = Constants.getSafeAreaInsets().bottom - 8;
    const alignment = {bottom, top};

    return (
      <View useSafeArea={useSafeArea} style={[this.dynamicStyles.alignments, styles.container]} pointerEvents="box-none">
        <View style={this.dynamicStyles.size} pointerEvents="box-none">
          <PanningProvider>
            <DialogDismissibleView
              direction={direction}
              ref={this.setDismissibleViewRef}
              onDismiss={this.onDismiss}
              containerStyle={this.dynamicStyles.flexType}
              style={this.dynamicStyles.flexType}
              alignment={alignment}
            >
              <Container directions={[direction]} style={[styles.overflow, this.dynamicStyles.flexType, style]}>
                {this.renderPannableHeader([direction])}
                {children}
              </Container>
            </DialogDismissibleView>
          </PanningProvider>
        </View>
        {addBottomSafeArea && <View style={{marginTop: bottomInsets}} />}
      </View>
    );
  };

  renderModal = () => {
    const {dialogKey, visible} = this.state;
    const {overlayBackgroundColor, onModalDismissed, supportedOrientations} = this.getThemeProps();

    return (
      <Modal
        key={dialogKey}
        transparent
        visible={visible}
        animationType={'fade'}
        onBackgroundPress={this.animateDismiss}
        onRequestClose={this.animateDismiss}
        overlayBackgroundColor={overlayBackgroundColor}
        onDismiss={onModalDismissed}
        supportedOrientations={supportedOrientations}
      >
        {this.renderVisibleContainer()}
      </Modal>
    );
  };

  render() {
    const {migrate, ...others} = this.getThemeProps();

    if (migrate) {
      return this.renderModal();
    } else {
      return <DialogDeprecated {...others} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  withHeight: {
    flex: 1,
  },
  dynamicHeight: {
    flex: 0,
  },
  overflow: {
    overflow: 'hidden',
  }
});

function createStyles(props) {
  const {width, height} = props;
  const flexType = height === null ? styles.dynamicHeight : styles.withHeight;
  const dynamicHeight = height === null ? undefined : {height: '100%'};
  return StyleSheet.create({
    size: {width, height},
    flexType,
    height: dynamicHeight,
  });
}

export default Dialog;
