import _isEmpty from "lodash/isEmpty";
import _isString from "lodash/isString";
import _isFunction from "lodash/isFunction";
import _isArray from "lodash/isArray";
import _get from "lodash/get";
import _invoke from "lodash/invoke";
import _values from "lodash/values"; // @ts-nocheck
import PropTypes from 'prop-types';
import 'react';
import { ViewPropTypes, TextInputPropTypes } from 'deprecated-react-native-prop-types';
import { Colors, Typography } from "../../style";
import { BaseComponent } from "../../commons";
import Validators from "./Validators";
const VALIDATORS = {
  REQUIRED: 'required',
  EMAIL: 'email',
  URL: 'url',
  NUMBER: 'number',
  PRICE: 'price'
};
export default class BaseInput extends BaseComponent {
  static displayName = 'BaseInput';
  static propTypes = {
    ...TextInputPropTypes,
    // ...BaseComponent.propTypes,
    /**
     * text color
     */
    color: PropTypes.string,
    /**
     * text input container style
     */
    containerStyle: ViewPropTypes.style,
    /**
     * validator type or custom validator function
     */
    validate: PropTypes.oneOfType([PropTypes.oneOf(_values(VALIDATORS)),
    // enum
    PropTypes.func,
    // custom
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(_values(VALIDATORS)), PropTypes.func])) // array of validators
    ]),
    /**
     * Whether to mark required field with an asterisk
     */
    markRequired: PropTypes.bool,
    /**
     * the message to be displayed when the validation fails
     */
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    /**
     * whether to run the validation on mount
     */
    validateOnStart: PropTypes.bool,
    /**
     * whether to run the validation on text changed
     */
    validateOnChange: PropTypes.bool,
    /**
     * whether to run the validation on blur
     */
    validateOnBlur: PropTypes.bool,
    /**
     * callback for validity change
     */
    onChangeValidity: PropTypes.func
  };
  static defaultProps = {
    validateOnBlur: true
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      value: props.value,
      focused: false,
      valid: false,
      error: undefined
    };
  }
  componentDidMount() {
    const {
      validateOnStart
    } = this.props;
    if (validateOnStart) {
      this.validate();
    }
  }

  /** Events */
  onFocus = (...args) => {
    _invoke(this.props, 'onFocus', ...args);
    this.setState({
      focused: true
    });
  };
  onBlur = (...args) => {
    _invoke(this.props, 'onBlur', ...args);
    this.setState({
      focused: false
    });
    const {
      validateOnBlur
    } = this.props;
    if (validateOnBlur) {
      this.validate();
    }
  };
  onChange = event => {
    _invoke(this.props, 'onChange', event);
  };
  onChangeText = text => {
    _invoke(this.props, 'onChangeText', text);
    this.setState({
      value: text
    });
    const {
      validateOnChange
    } = this.props;
    if (validateOnChange) {
      setImmediate(this.validate);
    }
  };

  /** Actions */
  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }
  hasText() {
    const {
      value
    } = this.state;
    return value && value.length > 0;
  }
  isFocused() {
    return this.input.isFocused();
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
  validate = (value = _get(this, 'state.value'), dryRun) => {
    // 'input.state.value'
    const {
      validate
    } = this.props;
    if (!validate) {
      return;
    }
    let isValid = true;
    const inputValidators = _isArray(validate) ? validate : [validate];
    let failingValidatorIndex;
    // get validators
    for (let index = 0; index < inputValidators.length; index++) {
      const validator = inputValidators[index];
      let validatorFunction;
      if (_isFunction(validator)) {
        validatorFunction = validator;
      } else if (_isString(validator) && !!Validators[validator]) {
        validatorFunction = Validators[validator];
      }

      // validate
      if (validatorFunction && !validatorFunction(value)) {
        isValid = false;
        failingValidatorIndex = index;
        break;
      }
    }

    // get error message
    let error;
    if (!isValid) {
      const {
        errorMessage
      } = this.props;
      if (_isArray(errorMessage)) {
        error = errorMessage[failingValidatorIndex];
      } else {
        error = errorMessage;
      }
    } else {
      error = undefined;
    }
    if (!dryRun) {
      // invoke caller's implementation
      if (this.state.valid !== isValid) {
        _invoke(this.props, 'onChangeValidity', isValid);
      }

      // set values
      this.setState({
        error,
        valid: isValid
      });
    }
    return isValid;
  };
  isRequiredField() {
    const {
      validate
    } = this.props;
    if (_isArray(validate)) {
      return validate.indexOf(VALIDATORS.REQUIRED) !== -1;
    }
    return validate === VALIDATORS.REQUIRED;
  }
  getRequiredPlaceholder(placeholder) {
    const {
      markRequired
    } = this.getThemeProps();
    const shouldDisplayPlaceholderAsRequired = this.isRequiredField() && markRequired && placeholder;
    if (shouldDisplayPlaceholderAsRequired) {
      return `${placeholder} *`;
    }
    return placeholder;
  }
  getErrorMessage() {
    const {
      error: propsError
    } = this.props;
    const {
      error: stateError
    } = this.state;
    return propsError || stateError;
  }
  getColor(value) {
    if (this.state.focused) {
      return Colors.grey10;
    } else {
      return _isEmpty(value) ? Colors.grey40 : Colors.grey10;
    }
  }
  toggleExpandableModal(...args) {
    // @ts-expect-error
    return this.input.toggleExpandableModal(...args);
  }
}