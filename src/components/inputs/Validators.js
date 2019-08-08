import _ from 'lodash';
import {EmailValidator} from 'commons-validator-js';


const urlRegEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i; //eslint-disable-line
const decimalNumberRegEx = /^-?\d+[.,]?\d+$/;
const integerRegEx = /^-?\d*$/; // allows empty string

const validators = {
  required: value => !_.isEmpty(value),
  email: value => new EmailValidator().isValid(value),
  url: value => urlRegEx.test(value),
  number: value => integerRegEx.test(value) || decimalNumberRegEx.test(value)
};

export default validators;
