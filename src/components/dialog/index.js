import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Modal from '../../screensComponents/modal';
import View from '../view';
import PanListenerView from '../panningViews/panListenerView';
import PanDismissibleView from '../panningViews/panDismissibleView';
import PanningProvider from '../panningViews/panningProvider';
import DialogDeprecated from './dialogDeprecated';

/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://media.giphy.com/media/9S58XdLCoUiLzAc1b1/giphy.gif
 */

const DIALOG_MARGIN = 12;

class Dialog extends BaseComponent {
  static displayName = 'Dialog';
  static propTypes = {
    ...DialogDeprecated.propTypes,
    /**
     * Migration flag, send true to use the new (and improved) Dialog, default is false
     */
    migrate: PropTypes.bool,

    /**
     * Use the template configuration (default is false)
     */
    useTemplate: PropTypes.bool,
  };

  static defaultProps = {
    migrate: false,
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
  };

  static getDialogMaxHeight() {
    const dialogMaxHeight = getDialogMaxHeight();
    return dialogMaxHeight - 2 * DIALOG_MARGIN;
  }

  static getDialogWidth() {
    const dialogWidth = getDialogWidth();
    return dialogWidth - 2 * DIALOG_MARGIN;
  }

  constructor(props) {
    super(props);

    this.state = {
      alignments: this.state.alignments,
      dialogKey: undefined,
    };

    if (props.dismissSwipeDirection) {
      console.warn("Dialog component's prop 'dismissSwipeDirection' is deprecated, please remove it");
    }

    if (props.migrate) {
      this.setAlignment();
      if (!_.isUndefined(props.useModal)) {
        console.warn("Dialog component's prop 'useModal' is deprecated (when using 'migrate'), please remove it");
      }
    }

    if (this.props.useTemplate) {
      this.calcDialogDimensionByOrientation();
    }
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChange);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChange);
  }

  onOrientationChange = () => {
    if (this.props.useTemplate) {
      this.calcDialogDimensionByOrientation();
    }

    const dialogKey = Constants.orientation;
    if (this.state.dialogKey !== dialogKey) {
      this.setState({dialogKey});
    }
  };

  calcDialogDimensionByOrientation = () => {
    const isInLandscape = Constants.orientation === Constants.orientations.LANDSCAPE;
    const showOnBottom = !(Constants.isTablet || isInLandscape);
    if (showOnBottom) {
      this.dynamicStyles.alignments = styles.bottomContent;
    } else {
      this.dynamicStyles.alignments = styles.centerContent;
    }

    this.dynamicStyles.size = {width: getDialogWidth()};
    this.dynamicStyles.presetHeight = {maxHeight: getDialogMaxHeight()};
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
    _.invoke(this.props, 'onDismiss', this.props);
  };

  setPanDismissibleViewRef = ref => {
    this.panDismissibleViewRef = ref;
  };

  animateDismiss = () => {
    if (!this.panDismissibleViewRef) {
      this.onDismiss();
    } else {
      this.panDismissibleViewRef.contentRef.animateDismiss();
    }
  };

  renderHeader = directions => {
    const {renderHeader, ...others} = this.props;
    if (renderHeader) {
      return <PanListenerView directions={directions}>{renderHeader(others)}</PanListenerView>;
    }
  };

  getDirections = () => {
    const {panDirections, disablePan, renderHeader} = this.props;
    let directions;
    if (disablePan) {
      directions = [];
    } else if (this.props.top) {
      directions = [PanningProvider.Directions.UP];
    } else if (!_.isUndefined(renderHeader) || _.isUndefined(panDirections)) {
      directions = [PanningProvider.Directions.DOWN];
    } else {
      directions = panDirections;
    }

    return directions;
  };

  // TODO: renderOverlay
  // TODO: animation configuration
  renderVisibleContainer = () => {
    const {children, renderHeader, style, useSafeArea, bottom, useTemplate} = this.props;
    const addBottomSafeArea = Constants.isIphoneX && ((useSafeArea && bottom) || useTemplate);
    const Container = !_.isUndefined(renderHeader) ? View : PanListenerView;
    const directions = this.getDirections();
    const bottomInsets = Constants.getSafeAreaInsets().bottom - 8;

    return (
      <SafeAreaView style={[styles.safeArea, this.dynamicStyles.alignments]} pointerEvents="box-none">
        <View style={this.dynamicStyles.size}>
          <PanningProvider>
            <PanDismissibleView
              directions={directions}
              ref={this.setPanDismissibleViewRef}
              onDismiss={this.onDismiss}
              style={this.dynamicStyles.flexType}
            >
              <Container
                directions={directions}
                style={[
                  this.dynamicStyles.flexType,
                  this.dynamicStyles.presetStyle,
                  this.dynamicStyles.presetHeight,
                  style,
                ]}
              >
                {this.renderHeader(directions)}
                {children}
              </Container>
            </PanDismissibleView>
          </PanningProvider>
          {_.invoke(this.props, 'renderOverlay')}
        </View>
        {addBottomSafeArea && <View style={{marginTop: bottomInsets}} />}
      </SafeAreaView>
    );
  };

  renderModal = () => {
    const {dialogKey} = this.state;
    const {visible, overlayBackgroundColor, onModalDismissed, supportedOrientations} = this.getThemeProps();

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

function getDialogMaxHeight() {
  const isInLandscape = Constants.orientation === Constants.orientations.LANDSCAPE;
  return Constants.screenHeight * (Constants.isTablet || isInLandscape ? 0.9 : 0.75);
}

function getDialogWidth() {
  const isInLandscape = Constants.orientation === Constants.orientations.LANDSCAPE;
  return Constants.isTablet || isInLandscape ? 450 : Constants.screenWidth;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  withHeight: {
    flex: 1,
  },
  dynamicHeight: {
    flex: 0,
    overflow: 'hidden',
  },
  defaultDialogStyle: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: DIALOG_MARGIN,
    marginBottom: Constants.isIphoneX ? 0 : DIALOG_MARGIN,
  },
});

function createStyles(props) {
  const {useTemplate, width, height} = props;
  const size = useTemplate ? {} : {width, height};
  const flexType = height === null || useTemplate ? styles.dynamicHeight : styles.withHeight;
  const presetStyle = useTemplate ? styles.defaultDialogStyle : {};
  return StyleSheet.create({
    size,
    flexType,
    presetStyle,
  });
}

export default Dialog;
