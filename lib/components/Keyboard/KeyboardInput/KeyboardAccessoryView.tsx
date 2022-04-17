import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  processColor,
  BackHandler,
  LayoutChangeEvent
} from 'react-native';
import KeyboardTrackingView from '../KeyboardTracking/KeyboardTrackingView';
import CustomKeyboardView from './CustomKeyboardView';
import KeyboardUtils from './utils/KeyboardUtils';

const IsIOS = Platform.OS === 'ios';
const IsAndroid = Platform.OS === 'android';

const IOS_SCROLL_BEHAVIORS = IsIOS
  ? {
    NONE: NativeModules.KeyboardTrackingViewTempManager?.KeyboardTrackingScrollBehaviorNone,
    SCROLL_TO_BOTTOM_INVERTED_ONLY:
        NativeModules.KeyboardTrackingViewTempManager?.KeyboardTrackingScrollBehaviorScrollToBottomInvertedOnly,
    FIXED_OFFSET: NativeModules.KeyboardTrackingViewTempManager?.KeyboardTrackingScrollBehaviorFixedOffset
  }
  : {};

export type KeyboardAccessoryViewProps = {
  /**
   * Content to be rendered above the keyboard
   */
  renderContent?: () => React.ReactElement;
  /**
   * A callback for when the height is changed
   */
  onHeightChanged?: (height: number) => void;
  /**
   * iOS only.
   * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.).
   * This is required.
   */
  kbInputRef?: any;
  /**
   * The keyboard ID (the componentID sent to KeyboardRegistry)
   */
  kbComponent?: string;
  /**
   * The props that will be sent to the KeyboardComponent
   */
  kbInitialProps?: any;
  /**
   * Callback that will be called when an item on the keyboard has been pressed.
   */
  onItemSelected?: (component?: string, args?: any) => void;
  /**
   * Callback that will be called if KeyboardRegistry.requestShowKeyboard is called.
   */
  onRequestShowKeyboard?: () => void;
  /**
   * Callback that will be called once the keyboard has been closed
   */
  onKeyboardResigned?: () => void;
  /**
   * iOS only.
   * The scrolling behavior, use KeyboardAccessoryView.iosScrollBehaviors.X where X is:
   * NONE, SCROLL_TO_BOTTOM_INVERTED_ONLY or FIXED_OFFSET
   *
   * default: FIXED_OFFSET
   */
  iOSScrollBehavior?: number;
  /**
   * iOS only.
   * Show the keyboard on a negative scroll
   *
   * default: false
   */
  revealKeyboardInteractive?: boolean;
  /**
   * iOS only.
   * Set to false to turn off inset management and manage it yourself
   *
   * default: true
   */
  manageScrollView?: boolean;
  /**
   * iOS only.
   * Set to true manageScrollView is set to true and still does not work,
   * it means that the ScrollView found is the wrong one and you'll have
   * to have the KeyboardAccessoryView and the ScrollView as siblings
   * and set this to true
   *
   * default: false
   */
  requiresSameParentToManageScrollView?: boolean;
  /**
   * iOS only.
   * Add a (white) SafeArea view beneath the KeyboardAccessoryView
   *
   * default: false
   */
  addBottomView?: boolean;
  /**
   * iOS only.
   * Allow hitting sub-views that are placed beyond the view bounds
   *
   * default: false
   */
  allowHitsOutsideBounds?: boolean;

  /**
   * iOS only.
   * Whether or not to handle SafeArea
   * default: true
   */
  useSafeArea?: boolean;

  /**
   * iOS only.
   * Whether or not to include bottom tab bat inset
   * default: false
   */
  usesBottomTabs?: boolean;

  children?: React.ReactChild;
};

/**
 * @description: View that allows replacing the default keyboard with other components
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/KeyboardInputViewScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardAccessoryView/KeyboardAccessoryView.gif?raw=true
 */
class KeyboardAccessoryView extends Component<KeyboardAccessoryViewProps> {

  static iosScrollBehaviors = IOS_SCROLL_BEHAVIORS;

  static defaultProps = {
    iOSScrollBehavior: -1,
    revealKeyboardInteractive: false,
    manageScrollView: true,
    requiresSameParentToManageScrollView: false,
    addBottomView: false,
    allowHitsOutsideBounds: false
  };

  // TODO: fix
  customInputControllerEventsSubscriber: any;
  trackingViewRef: any;

  constructor(props: KeyboardAccessoryViewProps) {
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

  onContainerComponentHeightChanged(event: LayoutChangeEvent) {
    const {onHeightChanged} = this.props;

    if (onHeightChanged) {
      onHeightChanged(event.nativeEvent.layout.height);
    }
  }

  onAndroidBackPressed() {
    const {kbComponent} = this.props;

    if (kbComponent) {
      KeyboardUtils.dismiss();
      return true;
    }
    return false;
  }

  getIOSTrackingScrollBehavior() {
    const {iOSScrollBehavior} = this.props;

    let scrollBehavior = iOSScrollBehavior;
    if (IsIOS && scrollBehavior === -1) {
      scrollBehavior = KeyboardAccessoryView.iosScrollBehaviors.FIXED_OFFSET;
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
    const {onKeyboardResigned} = this.props;
    let eventEmitter = null;
    if (IsIOS) {
      if (NativeModules.CustomInputControllerTemp) {
        eventEmitter = new NativeEventEmitter(NativeModules.CustomInputControllerTemp);
      }
    } else {
      eventEmitter = DeviceEventEmitter;
    }

    if (eventEmitter !== null) {
      this.customInputControllerEventsSubscriber = eventEmitter.addListener('kbdResigned', () => {
        if (onKeyboardResigned) {
          onKeyboardResigned();
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
    const {kbInitialProps} = this.props;

    if (IsIOS && kbInitialProps && kbInitialProps.backgroundColor) {
      const processedProps = Object.assign({}, kbInitialProps);
      processedProps.backgroundColor = processColor(processedProps.backgroundColor);
      return processedProps;
    }

    return kbInitialProps;
  }

  scrollToStart() {
    if (this.trackingViewRef) {
      this.trackingViewRef.scrollToStart();
    }
  }

  render() {
    const {
      revealKeyboardInteractive,
      manageScrollView,
      requiresSameParentToManageScrollView,
      addBottomView,
      allowHitsOutsideBounds,
      renderContent,
      kbInputRef,
      kbComponent,
      onItemSelected,
      onRequestShowKeyboard,
      useSafeArea,
      usesBottomTabs
    } = this.props;

    return (
      <KeyboardTrackingView
        ref={(r: any) => (this.trackingViewRef = r)}
        style={styles.trackingToolbarContainer}
        // @ts-ignore
        onLayout={this.onContainerComponentHeightChanged}
        scrollBehavior={this.getIOSTrackingScrollBehavior()}
        revealKeyboardInteractive={revealKeyboardInteractive}
        manageScrollView={manageScrollView}
        requiresSameParentToManageScrollView={requiresSameParentToManageScrollView}
        addBottomView={addBottomView}
        allowHitsOutsideBounds={allowHitsOutsideBounds}
        usesBottomTabs={usesBottomTabs}
      >
        <>
          {renderContent?.()}
        </>
        <CustomKeyboardView
          inputRef={kbInputRef}
          component={kbComponent}
          initialProps={this.processInitialProps()}
          onItemSelected={onItemSelected}
          onRequestShowKeyboard={onRequestShowKeyboard}
          useSafeArea={useSafeArea}
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
