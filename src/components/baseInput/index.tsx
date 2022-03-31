import _ from 'lodash';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {ViewPropTypes, TextInput as RNTextInput, StyleProp, ViewStyle, TextInputProps} from 'react-native';
import Validators from './Validators';
import {Colors, Typography} from '../../style';
import * as Modifiers from '../../commons/modifiers';

const VALIDATORS = {
  REQUIRED: 'required',
  EMAIL: 'email',
  URL: 'url',
  NUMBER: 'number',
  PRICE: 'price'
};

interface BaseInputProps extends TextInputProps {
  /**
   * text color
   */
  color: string;
  /**
   * text input container style
   */
  containerStyle: StyleProp<ViewStyle>;
  /**
   * validator type or custom validator function
   */
  validate: string | Function | (string | Function)[];
  /**
   * Whether to mark required field with an asterisk
   */
  markRequired: boolean;
  /**
   * the message to be displayed when the validation fails
   */
  errorMessage: string | string[];
  /**
   * whether to run the validation on mount
   */
  validateOnStart: boolean;
  /**
   * whether to run the validation on text changed
   */
  validateOnChange: boolean;
  /**
   * whether to run the validation on blur
   */
  validateOnBlur: boolean;
  /**
   * callback for validity change
   */
  onChangeValidity: Function;
}

export default class BaseInput extends Component<BaseInputProps> {
  static displayName = 'BaseInput';

  static propTypes = {
    // @ts-expect-error
    ...RNTextInput.propTypes,
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
    validate: PropTypes.oneOfType([
      PropTypes.oneOf(_.values(VALIDATORS)), // enum
      PropTypes.func, // custom
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(_.values(VALIDATORS)), PropTypes.func])) // array of validators
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

  state = {
    value: this.props.value,
    focused: false,
    valid: false,
    error: undefined
  };

  componentDidMount() {
    const {validateOnStart} = this.props;
    if (validateOnStart) {
      this.validate();
    }
  }

  /** Events */
  onFocus = (...args: any) => {
    _.invoke(this.props, 'onFocus', ...args);
    this.setState({focused: true});
  };

  onBlur = (...args: any) => {
    _.invoke(this.props, 'onBlur', ...args);
    this.setState({focused: false});

    const {validateOnBlur} = this.props;
    if (validateOnBlur) {
      this.validate();
    }
  };

  onChange = (event: any) => {
    _.invoke(this.props, 'onChange', event);
  };

  onChangeText = (text: string) => {
    _.invoke(this.props, 'onChangeText', text);
    this.setState({value: text});

    const {validateOnChange} = this.props;
    if (validateOnChange) {
      setImmediate(this.validate);
    }
  };

  /** Actions */
  getTypography() {
    Modifiers;
    return Modifiers.extractTypographyValue(this.props) || Typography.text70;
  }

  hasText() {
    const {value} = this.state;
    return value && value.length > 0;
  }

  isFocused() {
    // @ts-expect-error
    return this.input.isFocused();
  }

  focus() {
    // @ts-expect-error
    this.input.focus();
  }

  blur() {
    // @ts-expect-error
    this.input.blur();
  }

  clear() {
    // @ts-expect-error
    this.input.clear();
  }

  // @ts-expect-error
  validate = (value = _.get(this, 'state.value'), dryRun: boolean) => {
    // 'input.state.value'
    const {validate} = this.props;
    if (!validate) {
      return;
    }

    let isValid = true;
    const inputValidators = _.isArray(validate) ? validate : [validate];
    let failingValidatorIndex;
    // get validators
    for (let index = 0; index < inputValidators.length; index++) {
      const validator = inputValidators[index];
      let validatorFunction;
      if (_.isFunction(validator)) {
        validatorFunction = validator;
        // @ts-expect-error
      } else if (_.isString(validator) && !!Validators[validator]) {
        // @ts-expect-error
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
      const {errorMessage} = this.props;
      if (_.isArray(errorMessage)) {
        // @ts-expect-error
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
        _.invoke(this.props, 'onChangeValidity', isValid);
      }

      // set values
      this.setState({error, valid: isValid});
    }
    return isValid;
  };

  isRequiredField() {
    const {validate} = this.props;
    if (_.isArray(validate)) {
      return validate.indexOf(VALIDATORS.REQUIRED) !== -1;
    }
    return validate === VALIDATORS.REQUIRED;
  }

  getRequiredPlaceholder(placeholder: string) {
    const {markRequired} = this.props;
    const shouldDisplayPlaceholderAsRequired = this.isRequiredField() && markRequired && placeholder;

    if (shouldDisplayPlaceholderAsRequired) {
      return `${placeholder} *`;
    }
    return placeholder;
  }

  getErrorMessage() {
    // @ts-expect-error
    const {error: propsError} = this.props;
    const {error: stateError} = this.state;

    return propsError || stateError;
  }

  getColor(value: string) {
    if (this.state.focused) {
      return Colors.grey10;
    } else {
      return _.isEmpty(value) ? Colors.grey40 : Colors.grey10;
    }
  }

  toggleExpandableModal(...args: any[]) {
    // @ts-expect-error
    return this.input.toggleExpandableModal(...args);
  }
}
