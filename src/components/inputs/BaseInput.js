import 'react';
import PropTypes from 'prop-types';
import {TextInput as RNTextInput, Animated, ViewPropTypes} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Colors, Typography} from '../../style';

export default class BaseInput extends BaseComponent {
  static displayName = 'TextInput';
  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseComponent.propTypes,
    /**
     * text color
     */
    color: PropTypes.string,
    /**
     * text input container style
     */
    containerStyle: ViewPropTypes.style,
    testId: PropTypes.string,
  };

  static defaultProps = {
    placeholderTextColor: Colors.dark60,
  };

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.focus = this.focus.bind(this);

    const typography = this.getTypography();
    this.state = {
      inputWidth: typography.fontSize * 2,
      widthExtendBreaks: [],
      value: props.value,
      floatingPlaceholderState: new Animated.Value(props.value ? 1 : 0),
      showExpandableModal: !false,
    };
  }

  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }

  getUnderlineStyle() {
    const {focused} = this.state;
    const {error} = this.props;
    if (error) {
      return this.styles.errorUnderline;
    } else if (focused) {
      return this.styles.focusedUnderline;
    }

    return null;
  }

  hasText() {
    const {value} = this.state;
    return value && value.length > 0;
  }

  onFocus(...args) {
    _.invoke(this.props, 'onFocus', ...args);
    this.setState({focused: true});
  }

  onBlur(...args) {
    _.invoke(this.props, 'onBlur', ...args);
    this.setState({focused: false});
  }

  onChangeText(text) {
    _.invoke(this.props, 'onChangeText', text);

    this.setState({
      value: text,
    });
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }
}
