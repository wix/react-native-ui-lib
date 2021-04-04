import _ from 'lodash';
import {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {DeviceEventEmitter, Keyboard} from 'react-native';

export default class KeyboardAwareBase extends Component {
  constructor(props) {
    super(props);
    this._bind('_onKeyboardWillShow',
      '_onKeyboardWillHide',
      '_addKeyboardEventListeners',
      '_removeKeyboardListeners',
      '_scrollToFocusedTextInput',
      '_onKeyboardAwareViewLayout',
      '_updateKeyboardAwareViewContentSize',
      'scrollToBottom',
      'scrollBottomOnNextSizeChange',
      '_onKeyboardAwareViewScroll');
    this.contentSize = undefined;
    this.layoutSize = undefined;
    this.state = {keyboardHeight: 0};
    this._addKeyboardEventListeners();
  }

  static propTypes = {
    startScrolledToBottom: PropTypes.bool,
    scrollToBottomOnKBShow: PropTypes.bool,
    scrollToInputAdditionalOffset: PropTypes.number
  };

  static defaultProps = {
    startScrolledToBottom: false,
    scrollToBottomOnKBShow: false,
    scrollToInputAdditionalOffset: 75
  };

  _bind(...methods) {
    methods.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  _addKeyboardEventListeners() {
    const KeyboardEventsObj = Keyboard || DeviceEventEmitter;
    this.keyboardEventListeners = [
      KeyboardEventsObj.addListener('keyboardWillShow', this._onKeyboardWillShow),
      KeyboardEventsObj.addListener('keyboardWillHide', this._onKeyboardWillHide)
    ];
  }

  _removeKeyboardListeners() {
    this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
  }

  componentDidMount() {
    if (this._keyboardAwareView && this.props.startScrolledToBottom) {
      this.scrollToBottom(false);
      setTimeout(() => this._keyboardAwareView.setNativeProps({opacity: 1}), 100);
    }
  }

  _onKeyboardAwareViewLayout(layoutEvent) {
    const layout = layoutEvent.nativeEvent.layout;
    this.layoutSize = layout;
    this._keyboardAwareView.contentOffset = {x: 0, y: 0};
    this._updateKeyboardAwareViewContentSize();
  }

  _onKeyboardAwareViewScroll(event) {
    this._keyboardAwareView.contentOffset = event.nativeEvent.contentOffset;
    this._updateKeyboardAwareViewContentSize();
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }
  }

  _updateKeyboardAwareViewContentSize(width, height) {
    let heightHasChanged = false;
    if (width && height) {
      if (this.contentSize && this.contentSize.height !== height) { // for FlatList
        heightHasChanged = true;
      }

      this.contentSize = {width, height};
    }

    if (this._keyboardAwareView) {
      if (this.state.scrollBottomOnNextSizeChange ||
          (this.props.startScrolledToBottom && heightHasChanged)) {
        this.scrollToBottom();
        this.setState({scrollBottomOnNextSizeChange: false});
      }
    }
  }

  componentWillUnmount() {
    this._removeKeyboardListeners();
  }

  _scrollToFocusedTextInput() {
    if (this.props.getTextInputRefs) {
      const textInputRefs = this.props.getTextInputRefs();
      textInputRefs.some((textInputRef) => {
        const isFocusedFunc = textInputRef.isFocused();
        const isFocused = isFocusedFunc && typeof isFocusedFunc === 'function' ? isFocusedFunc() : isFocusedFunc;
        if (isFocused) {
          setTimeout(() => {
            this._keyboardAwareView
              .getScrollResponder()
              .scrollResponderScrollNativeHandleToKeyboard(ReactNative.findNodeHandle(textInputRef),
                this.props.scrollToInputAdditionalOffset,
                true);
          }, 0);
        }
        return isFocused;
      });
    }
  }

  _onKeyboardWillShow(event) {
    this._scrollToFocusedTextInput();

    const newKeyboardHeight = event.endCoordinates.height;
    if (this.state.keyboardHeight === newKeyboardHeight) {
      return;
    }

    this.setState({keyboardHeight: newKeyboardHeight});

    if (this.props.scrollToBottomOnKBShow) {
      this.scrollToBottom();
    }
  }

  _onKeyboardWillHide() {
    const keyboardHeight = this.state.keyboardHeight;
    this.setState({keyboardHeight: 0});

    const hasYOffset =
      this._keyboardAwareView &&
      this._keyboardAwareView.contentOffset &&
      this._keyboardAwareView.contentOffset.y !== undefined;
    const yOffset = hasYOffset ? Math.max(this._keyboardAwareView.contentOffset.y - keyboardHeight, 0) : 0;
    this.scrollTo({x: 0, y: yOffset, animated: true});
  }

  scrollBottomOnNextSizeChange() {
    this.setState({scrollBottomOnNextSizeChange: true});
  }

  scrollToBottom(scrollAnimated = true) {
    if (this._keyboardAwareView) {
      if (!this.contentSize || !this.layoutSize) {
        setTimeout(() => this.scrollToBottom(scrollAnimated), 50);
        return;
      }

      this._keyboardAwareView.scrollToEnd({animated: scrollAnimated});
    }
  }

  scrollTo(options) {
    if (this._keyboardAwareView) {
      if (this._keyboardAwareView.scrollTo) {
        this._keyboardAwareView.scrollTo(options);
      } else if (this._keyboardAwareView.scrollToOffset) {
        this._keyboardAwareView.scrollToOffset({...options, offset: _.get(options, 'y', 0)});
      }
    }
  }
}
