Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}




var StepperButton=function StepperButton(_ref){var label=_ref.label,testId=_ref.testId,styles=_ref.styles,disabled=_ref.disabled,onPress=_ref.onPress;return(
_react2.default.createElement(_reactNative.TouchableOpacity,{disabled:disabled,testID:testId,onPress:onPress,style:styles.button},
_react2.default.createElement(_reactNative.Text,{style:[styles.buttonText,disabled&&styles.disableText],allowFontScaling:false},
label)));};



StepperButton.propTypes={



label:_react2.default.PropTypes.string,



testId:_react2.default.PropTypes.string,



styles:_react2.default.PropTypes.object.isRequired,



disabled:_react2.default.PropTypes.bool,



onPress:_react2.default.PropTypes.func};


StepperButton.displayName='StepperButton';exports.default=

StepperButton;