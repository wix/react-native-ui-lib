import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {LayoutAnimation, StyleSheet, Keyboard, TextInput, PixelRatio, I18nManager} from 'react-native';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons';
import Assets from '../../assets';
import {Colors, Typography} from '../../style';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import Dialog from '../dialog';
import Button from '../button';
import ColorSliderGroup from '../slider/ColorSliderGroup';
import PanningProvider from '../panningViews/panningProvider';


const KEYBOARD_HEIGHT = 216;

/**
 * @description: A color picker dialog component
 * @extends: Dialog
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.js
 */
class ColorPickerDialog extends PureComponent {
  static displayName = 'ColorPickerDialog';

  static propTypes = {
    ...Dialog.PropTypes,
    /**
     * The initial color to pass the picker dialog
     */
    initialColor: PropTypes.string,
    /**
     * onSubmit callback for the picker dialog color change
     */
    onSubmit: PropTypes.func,
    /**
     * Props to pass the Dialog component // TODO: deprecate 'dialogProps' prop
     */
    dialogProps: PropTypes.object,
    /**
     * Additional styling for the color preview text.
     */
    previewInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Accessibility labels as an object of strings, ex. {addButton: 'add custom color using hex code', dismissButton: 'dismiss', doneButton: 'done', input: 'custom hex color code'}
     */
    accessibilityLabels: PropTypes.shape({
      dismissButton: PropTypes.string,
      doneButton: PropTypes.string,
      input: PropTypes.string
    })
  };

  static defaultProps = {
    initialColor: Colors.dark80
  };

  constructor(props) {
    super(props);

    const color = Colors.getHSL(props.initialColor);
    const text = this.getColorValue(props.initialColor);
    const {valid} = this.getValidColorString(text);

    this.state = {
      keyboardHeight: KEYBOARD_HEIGHT,
      color,
      text,
      valid
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = e => {
    if (Constants.isIOS && this.state.keyboardHeight !== e.endCoordinates.height) {
      this.setState({keyboardHeight: e.endCoordinates.height});
    }
    // For down arrow button in Android keyboard
    this.changeHeight(0);
  };

  keyboardDidHide = () => {
    this.changeHeight(KEYBOARD_HEIGHT);
  };

  onFocus = () => {
    this.changeHeight(0);
  };

  setFocus = () => {
    if (this.textInput) {
      this.textInput.focus();
    }
  };

  changeHeight(height) {
    if (Constants.isAndroid && this.state.keyboardHeight !== height) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({keyboardHeight: height});
    }
  }

  getColorValue(color) {
    if (!_.isString(color)) {
      return;
    }
    return color.replace('#', '');
  }

  getHexColor(text) {
    if (text && !Colors.isTransparent(text)) {
      const trimmed = text.replace(/\s+/g, '');
      const hex = `#${trimmed}`;
      return hex;
    }
    return text;
  }

  getHexString(color) {
    return _.toUpper(Colors.getHexString(color));
  }

  getTextColor(color) {
    return Colors.isDark(color) ? Colors.white : Colors.dark10;
  }

  getValidColorString(text) {
    const hex = this.getHexColor(text);

    if (Colors.isValidHex(hex)) {
      return {hex, valid: true};
    }
    return {undefined, valid: false};
  }

  applyColor = (text) => {
    const {hex, valid} = this.getValidColorString(text);

    if (hex) {
      this.setState({color: Colors.getHSL(hex), text, valid});
    } else {
      this.setState({text, valid});
    }
  };

  updateColor(color) {
    const hex = this.getHexString(color);
    const text = this.getColorValue(hex);
    this.setState({color, text, valid: true});
  }

  resetValues() {
    const color = Colors.getHSL(this.props.initialColor);
    const text = this.getColorValue(this.props.initialColor);
    const {valid} = this.getValidColorString(text);

    this.setState({
      color,
      text,
      valid
    });
  }

  onSliderValueChange = color => {
    const c = Colors.getHSL(color);
    this.updateColor(c);
  };

  onChangeText = value => {
    this.applyColor(value);
  };

  onDonePressed = () => {
    const {text} = this.state;
    const {hex} = this.getValidColorString(text);

    if (hex) {
      _.invoke(this.props, 'onSubmit', hex, this.getTextColor(hex));
      this.onDismiss();
    }
  };

  onDismiss = () => {
    this.resetValues();
    _.invoke(this.props, 'onDismiss');
  };

  renderHeader() {
    const {useCustomTheme, accessibilityLabels} = this.props;
    const {valid} = this.state;

    return (
      <View row spread bg-white paddingH-20 style={styles.header}>
        <Button
          link
          iconSource={Assets.icons.x}
          iconStyle={{tintColor: Colors.dark10}}
          onPress={this.onDismiss}
          accessibilityLabel={accessibilityLabels.dismissButton}
        />
        <Button
          useCustomTheme={useCustomTheme}
          disabled={!valid}
          link
          iconSource={Assets.icons.check}
          onPress={this.onDonePressed}
          accessibilityLabel={accessibilityLabels.doneButton}
        />
      </View>
    );
  }

  renderSliders() {
    const {keyboardHeight, color} = this.state;
    const colorValue = color.a === 0 ? Colors.black : Colors.getHexString(color);

    return (
      <ColorSliderGroup
        initialColor={colorValue}
        containerStyle={[styles.sliderGroup, {height: keyboardHeight}]}
        sliderContainerStyle={styles.slider}
        showLabels
        labelsStyle={styles.label}
        onValueChange={this.onSliderValueChange}
        accessible={false}
      />
    );
  }

  renderPreview() {
    const {accessibilityLabels, previewInputStyle} = this.props;
    const {color, text} = this.state;
    const hex = this.getHexString(color);
    const textColor = this.getTextColor(hex);
    const fontScale = PixelRatio.getFontScale();
    const value = Colors.isTransparent(text) ? '000000' : text;

    return (
      <View style={[styles.preview, {backgroundColor: hex}]}>
        <TouchableOpacity center onPress={this.setFocus} activeOpacity={1} accessible={false}>
          <View style={styles.inputContainer}>
            <Text
              text60
              white
              marginL-13
              marginR-5={Constants.isIOS}
              style={{
                color: textColor,
                transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
              }}
              accessible={false}
            >
              #
            </Text>
            <TextInput
              ref={r => (this.textInput = r)}
              value={value}
              maxLength={6}
              numberOfLines={1}
              onChangeText={this.onChangeText}
              style={[
                styles.input,
                {color: textColor, width: (value.length + 1) * 16.5 * fontScale},
                Constants.isAndroid && {padding: 0},
                previewInputStyle
              ]}
              selectionColor={textColor}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoComplete={'off'}
              autoCapitalize={'characters'}
              // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
              returnKeyType={'done'}
              enablesReturnKeyAutomatically
              onFocus={this.onFocus}
              accessibilityLabel={accessibilityLabels.input}
            />
          </View>
          <View style={[{backgroundColor: textColor}, styles.underline]}/>
        </TouchableOpacity>
      </View>
    );
  }

  renderDialog() {
    const {visible, dialogProps, testID} = this.props;

    return (
      <Dialog
        visible={visible} //TODO: pass all Dialog props instead
        width="100%"
        height={null}
        bottom
        centerH
        onDismiss={this.onDismiss}
        containerStyle={styles.dialog}
        panDirection={PanningProvider.Directions.DOWN}
        testID={`${testID}.dialog`}
        supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']} // iOS only
        {...dialogProps}
      >
        {this.renderHeader()}
        {this.renderPreview()}
        {this.renderSliders()}
      </Dialog>
    );
  }

  render() {
    return this.renderDialog();
  }
}

export default asBaseComponent(ColorPickerDialog);


const BORDER_RADIUS = 12;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  preview: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 56,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: Constants.isAndroid ? 5 : 8,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  input: {
    ...Typography.text60,
    letterSpacing: 3,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  underline: {
    height: 1.5,
    width: Constants.isAndroid ? 119 : 134,
    marginRight: Constants.isAndroid ? 13 : 8
  },
  sliderGroup: {
    paddingTop: 12,
    marginHorizontal: 20
  },
  slider: {
    marginBottom: 15,
    height: 26
  },
  label: {
    marginBottom: 3
  }
});
