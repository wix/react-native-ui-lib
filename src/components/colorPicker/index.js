import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {LayoutAnimation, StyleSheet, Keyboard, TextInput, PixelRatio} from 'react-native';
import {
  Constants,
  Assets,
  Colors,
  Typography,
  PureBaseComponent,
  View,
  TouchableOpacity,
  Dialog,
  Button,
  Text,
  ColorSliderGroup,
  PanningProvider
} from 'react-native-ui-lib';
import ColorPalette from './ColorPalette';
import {SWATCH_MARGIN, SWATCH_SIZE} from './ColorSwatch';


const KEYBOARD_HEIGHT = 216;

/**
 * @description: A color picker component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.js
 * @notes: This is a screen width component
 */
export default class ColorPicker extends PureBaseComponent {
  static displayName = 'ColorPicker';

  static propTypes = {
    ...Dialog.PropTypes,
    /**
     * Array of colors for the picker's color palette (hex values)
     */
    colors: PropTypes.arrayOf(PropTypes.string),
    /**
     * The value of the selected swatch
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * The index of the item to animate at first render (default is last)
     */
    animatedIndex: PropTypes.number,
    /**
     * onValueChange callback for the picker's color palette change
     */
    onValueChange: PropTypes.func,
    /**
     * The initial color to pass the picker dialog
     */
    initialColor: PropTypes.string,
    /**
     * onSubmit callback for the picker dialog color change
     */
    onSubmit: PropTypes.func
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
      show: false,
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.initialColor !== nextProps.initialColor) {
      const text = this.getColorValue(nextProps.initialColor || this.props.initialColor);
      const color = Colors.getHSL(nextProps.initialColor);
      const {valid} = this.getValidColorString(text);
      
      this.setState({color, text, valid});
    }
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

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  showDialog = () => {
    this.setState({show: true});
  };

  get animatedIndex() {
    const {animatedIndex, colors} = this.props;
    if (animatedIndex === undefined) {
      return colors.length - 1;
    }
    return animatedIndex;
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
      show: false,
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
    const {useCustomTheme} = this.props;
    const {valid} = this.state;

    return (
      <View row spread bg-white paddingH-20 style={this.styles.header}>
        <Button
          link
          iconSource={Assets.icons.x}
          iconStyle={{tintColor: Colors.dark10}}
          onPress={this.onDismiss}
        />
        <Button
          useCustomTheme={useCustomTheme}
          disabled={!valid}
          link
          iconSource={Assets.icons.check}
          onPress={this.onDonePressed}
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
        containerStyle={[this.styles.sliderGroup, {height: keyboardHeight}]}
        sliderContainerStyle={this.styles.slider}
        showLabels
        labelsStyle={this.styles.label}
        onValueChange={this.onSliderValueChange}
      />
    );
  }

  renderPreview() {
    const {color, text} = this.state;
    const hex = this.getHexString(color);
    const textColor = this.getTextColor(hex);
    const fontScale = PixelRatio.getFontScale();
    const value = Colors.isTransparent(text) ? '000000' : text;

    return (
      <View style={[this.styles.preview, {backgroundColor: hex}]}>
        <TouchableOpacity center onPress={this.setFocus} activeOpacity={1}>
          <View style={this.styles.inputContainer}>
            <Text text60 white marginL-13 marginR-5={Constants.isIOS} style={{color: textColor}}>
              #
            </Text>
            <TextInput
              ref={r => (this.textInput = r)}
              value={value}
              maxLength={6}
              numberOfLines={1}
              onChangeText={this.onChangeText}
              style={[
                this.styles.input,
                {color: textColor, width: (value.length + 1) * 16.5 * fontScale},
                Constants.isAndroid && {padding: 0}
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
            />
          </View>
          <View style={[{backgroundColor: textColor}, this.styles.underline]}/>
        </TouchableOpacity>
      </View>
    );
  }

  renderDialog() {
    const {show} = this.state;

    return (
      <Dialog
        migrate
        visible={show}
        width="100%"
        height={null}
        bottom
        centerH
        onDismiss={this.onDismiss}
        containerStyle={this.styles.dialog}
        panDirection={PanningProvider.Directions.DOWN}
      >
        {this.renderHeader()}
        {this.renderPreview()}
        {this.renderSliders()}
      </Dialog>
    );
  }

  render() {
    const {colors, value} = this.props;

    return (
      <View row>
        <ColorPalette
          value={value}
          colors={colors}
          style={this.styles.palette}
          usePagination={false}
          animatedIndex={this.animatedIndex}
          onValueChange={this.onValueChange}
        />
        <View style={this.styles.buttonContainer}>
          <Button
            color={Colors.dark10}
            outlineColor={Colors.dark10}
            style={this.styles.button}
            round
            outline
            iconSource={Assets.icons.plusSmall}
            onPress={this.showDialog}
          />
        </View>
        {this.renderDialog()}
      </View>
    );
  }

  // ColorPalette
  onValueChange = (value, options) => {
    _.invoke(this.props, 'onValueChange', value, options);
  };
}

function createStyles(props) {
  const borderRadius = 12;
  const iconSize = SWATCH_SIZE;
  const plusButtonContainerWidth = iconSize + 20 + 12;
  const plusButtonContainerHeight = 92 - 2 * SWATCH_MARGIN;
  
  const styles = StyleSheet.create({
    palette: {
      paddingLeft: plusButtonContainerWidth
    },
    dialog: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    },
    buttonContainer: {
      position: 'absolute',
      left: 0,
      width: plusButtonContainerWidth,
      height: plusButtonContainerHeight,
      marginTop: SWATCH_MARGIN,
      marginBottom: SWATCH_MARGIN,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingTop: 1,
      backgroundColor: Colors.white
    },
    button: {
      width: iconSize,
      height: iconSize,
      marginRight: 12
    },
    preview: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
      height: 56,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: Constants.isAndroid ? 5 : 8
    },
    input: {
      ...Typography.text60,
      letterSpacing: 3
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
  return styles;
}
