import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  processColor,
  BackHandler
} from 'react-native';
import KeyboardTrackingView from '../KeyboardTracking/KeyboardTrackingView';
import CustomKeyboardView from './CustomKeyboardView';
import KeyboardUtils from './utils/KeyboardUtils';

const IsIOS = Platform.OS === 'ios';
const IsAndroid = Platform.OS === 'android';

class KeyboardAccessoryView extends Component {
  static propTypes = {
    renderContent: PropTypes.func,
    onHeightChanged: PropTypes.func,
    /**
     * iOS only.
     * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.).
     * This is required.
     */
    kbInputRef: PropTypes.object,
    kbComponent: PropTypes.string,
    kbInitialProps: PropTypes.object,
    onItemSelected: PropTypes.func,
    onRequestShowKeyboard: PropTypes.func,
    onKeyboardResigned: PropTypes.func,
    iOSScrollBehavior: PropTypes.number,
    revealKeyboardInteractive: PropTypes.bool,
    manageScrollView: PropTypes.bool,
    requiresSameParentToManageScrollView: PropTypes.bool,
    addBottomView: PropTypes.bool,
    allowHitsOutsideBounds: PropTypes.bool
  };
  static defaultProps = {
    iOSScrollBehavior: -1,
    revealKeyboardInteractive: false,
    manageScrollView: true,
    requiresSameParentToManageScrollView: false,
    addBottomView: false,
    allowHitsOutsideBounds: false
  };

  constructor(props) {
    super(props);

    this.onContainerComponentHeightChanged = this.onContainerComponentHeightChanged.bind(this);
    this.processInitialProps = this.processInitialProps.bind(this);
    this.registerForKeyboardResignedEvent = this.registerForKeyboardResignedEvent.bind(this);
    this.registerAndroidBackHandler = this.registerAndroidBackHandler.bind(this);
    this.onAndroidBackPressed = this.onAndroidBackPressed.bind(this);

    this.registerForKeyboardResignedEvent();
    this.registerAndroidBackHandler();
  }

  componentWillUnmount() {
    if (this.customInputControllerEventsSubscriber) {
      this.customInputControllerEventsSubscriber.remove();
    }
    if (IsAndroid) {
      BackHandler.removeEventListener('hardwareBackPress', this.onAndroidBackPressed);
    }
  }

  onContainerComponentHeightChanged(event) {
    if (this.props.onHeightChanged) {
      this.props.onHeightChanged(event.nativeEvent.layout.height);
    }
  }

  onAndroidBackPressed() {
    if (this.props.kbComponent) {
      KeyboardUtils.dismiss();
      return true;
    }
    return false;
  }

  getIOSTrackingScrollBehavior() {
    let scrollBehavior = this.props.iOSScrollBehavior;
    if (IsIOS && NativeModules.KeyboardTrackingViewManager && scrollBehavior === -1) {
      scrollBehavior = NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorFixedOffset;
    }
    return scrollBehavior;
  }

  async getNativeProps() {
    if (this.trackingViewRef) {
      return await this.trackingViewRef.getNativeProps();
    }
    return {};
  }

  registerForKeyboardResignedEvent() {
    let eventEmitter = null;
    if (IsIOS) {
      if (NativeModules.CustomInputController) {
        eventEmitter = new NativeEventEmitter(NativeModules.CustomInputController);
      }
    } else {
      eventEmitter = DeviceEventEmitter;
    }

    if (eventEmitter !== null) {
      this.customInputControllerEventsSubscriber = eventEmitter.addListener('kbdResigned', () => {
        if (this.props.onKeyboardResigned) {
          this.props.onKeyboardResigned();
        }
      });
    }
  }

  registerAndroidBackHandler() {
    if (IsAndroid) {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPressed);
    }
  }

  processInitialProps() {
    if (IsIOS && this.props.kbInitialProps && this.props.kbInitialProps.backgroundColor) {
      const processedProps = Object.assign({}, this.props.kbInitialProps);
      processedProps.backgroundColor = processColor(processedProps.backgroundColor);
      return processedProps;
    }
    return this.props.kbInitialProps;
  }

  scrollToStart() {
    if (this.trackingViewRef) {
      this.trackingViewRef.scrollToStart();
    }
  }

  render() {
    return (
      <KeyboardTrackingView
        ref={r => (this.trackingViewRef = r)}
        style={styles.trackingToolbarContainer}
        onLayout={this.onContainerComponentHeightChanged}
        scrollBehavior={this.getIOSTrackingScrollBehavior()}
        revealKeyboardInteractive={this.props.revealKeyboardInteractive}
        manageScrollView={this.props.manageScrollView}
        requiresSameParentToManageScrollView={this.props.requiresSameParentToManageScrollView}
        addBottomView={this.props.addBottomView}
        allowHitsOutsideBounds={this.props.allowHitsOutsideBounds}
      >
        {this.props.renderContent && this.props.renderContent()}
        <CustomKeyboardView
          inputRef={this.props.kbInputRef}
          component={this.props.kbComponent}
          initialProps={this.processInitialProps()}
          onItemSelected={this.props.onItemSelected}
          onRequestShowKeyboard={this.props.onRequestShowKeyboard}
        />
      </KeyboardTrackingView>
    );
  }
}

const styles = StyleSheet.create({
  trackingToolbarContainer: {
    ...Platform.select({
      ios: {
        ...StyleSheet.absoluteFillObject,
        top: undefined
      }
    })
  }
});

export default KeyboardAccessoryView;
