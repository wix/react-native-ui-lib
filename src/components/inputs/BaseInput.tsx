import React, {PureComponent, Validator, Ref} from 'react';
import {ViewPropTypes, TextInput as RNTextInput, TextInputProps, ViewStyle, TextInputChangeEventData} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Colors, Typography} from '../../style';
import {asBaseComponent} from '../../commons/new';
import {extractTypographyValue} from '../../commons/modifiers';
import Validators, {ValidatorTypes} from './Validators';

type ValidatorFunction = (v: string) => boolean;

interface BaseInputProps extends TextInputProps {
  /**
   * text color
   */
  color?: string;
  /**
   * text input container style
   */
  containerStyle?: ViewStyle,
  /**
   * validator type or custom validator function
   */
  validate?: ValidatorTypes | ValidatorFunction | (ValidatorTypes | ValidatorFunction)[]  
  /**
   * Whether to mark required field with an asterisk
   */
  markRequired?: boolean;
  /**
   * Error string to display regardless of the field state
   */
  error?: string;
  /**
   * The message to be displayed when the validation fails
   */
  errorMessage?: string | string[];
  /**
   * whether to run the validation on mount
   */
  validateOnStart?: boolean;
  /**
   * whether to run the validation on text changed
   */
  validateOnChange?: boolean;
  /**
   * whether to run the validation on blur
   */
  validateOnBlur?: boolean;
  /**
   * callback for validity change
   */
  onChangeValidity?: (isValid: boolean) => void;
}

interface State {
  value?: string;
  focused: boolean;
  valid: boolean;
  error?: string;
}

class BaseInput extends PureComponent<BaseInputProps, State> {
  static displayName = 'BaseInput';

  // static propTypes = {
  //   // ...RNTextInput.propTypes,
  //   // ...BaseComponent.propTypes,
    
  // };

  static defaultProps = {
    validateOnBlur: true
  };

  constructor(props: BaseInputProps) {
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
    const {validateOnStart} = this.props;
    if (validateOnStart) {
      this.validate();
    }
  }

  /** Events */
  onFocus = (...args: any[]) => {
    _.invoke(this.props, 'onFocus', ...args);
    this.setState({focused: true});
  };

  onBlur = (...args: any[]) => {
    _.invoke(this.props, 'onBlur', ...args);
    this.setState({focused: false});

    const {validateOnBlur} = this.props;
    if (validateOnBlur) {
      this.validate();
    }
  };

  onChange = (event: TextInputChangeEventData) => {
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
    return extractTypographyValue(this.props) || Typography.text70;
  }

  hasText() {
    const {value} = this.state;
    return value && value.length > 0;
  }

  isFocused() {
    // @ts-ignore
    return this.input.isFocused();
  }

  focus() {
    // @ts-ignore
    this.input.focus();
  }

  blur() {
    // @ts-ignore
    this.input.blur();
  }

  clear() {
    // @ts-ignore
    this.input.clear();
  }

  // @ts-ignore
  validate = (value: string = _.get(this, 'state.value'), dryRun: boolean): boolean | undefined => {
    // 'input.state.value'
    const {validate} = this.props;
    if (!validate) {
      return;
    }
    
    
    let isValid = true;
    const inputValidators = _.isArray(validate) ? validate : [validate];
    let failingValidatorIndex = -1;
    // get validators
    for (let index = 0; index < inputValidators.length; index++) {
      const validator = inputValidators[index];
      let validatorFunction;
      if (_.isFunction(validator)) {
        validatorFunction = validator;
      } else if (_.isString(validator) && !!Validators[validator]) {
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
      return validate.indexOf(ValidatorTypes.REQUIRED) !== -1;
    }
    return validate === ValidatorTypes.REQUIRED;
  }

  getRequiredPlaceholder(placeholder: string) {
    const {markRequired} = this.props;
    const shouldDisplayPlaceholderAsRequired = (this.isRequiredField() && markRequired && placeholder);

    if (shouldDisplayPlaceholderAsRequired) {
      return `${placeholder} *`;
    }
    return placeholder;
  }

  getErrorMessage() {
    const {error: propsError} = this.props;
    const {error: stateError} = this.state;

    return propsError || stateError;
  }

  getColor(value: string) {
    if (this.state.focused) {
      return Colors.dark10;
    } else {
      return _.isEmpty(value) ? Colors.dark40 : Colors.dark10;
    }
  }

  toggleExpandableModal(...args: any[]) {
    // @ts-ignore
    return this.input.toggleExpandableModal(...args);
  }
}

export default asBaseComponent(BaseInput);
