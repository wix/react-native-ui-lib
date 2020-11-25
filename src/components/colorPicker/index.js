import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {LogService} from '../../services';
import {asBaseComponent} from '../../commons';
import Assets from '../../assets';
import {Colors} from '../../style';
import View from '../view';
import Button from '../button';
import {SWATCH_MARGIN, SWATCH_SIZE} from './ColorSwatch';
import ColorPalette from './ColorPalette';
import ColorPickerDialog from './ColorPickerDialog';


const ACCESSIBILITY_LABELS = {
  addButton: 'add custom color using hex code',
  dismissButton: 'dismiss',
  doneButton: 'done',
  input: 'custom hex color code'
};

/**
 * @description: A color picker component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.js
 * @notes: This is a screen width component
 */
class ColorPicker extends PureComponent {
  static displayName = 'ColorPicker';

  static propTypes = {
    ...ColorPickerDialog.PropTypes,
    /**
     * Array of colors for the picker's color palette (hex values)
     */
    colors: PropTypes.arrayOf(PropTypes.string),
    /**
     * The value of the selected swatch // TODO: remove after migration to 'selectedValue'
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * The index of the item to animate at first render (default is last)
     */
    animatedIndex: PropTypes.number,
    /**
     * onValueChange callback for the picker's color palette change
     */
    onValueChange: PropTypes.func,
    /**
     * Accessibility labels as an object of strings, ex.
     * {
     *  addButton: 'add custom color using hex code',
     *  dismissButton: 'dismiss',
     *  doneButton: 'done',
     *  input: 'custom hex color code'
     * }
     */
    accessibilityLabels: PropTypes.shape({
      addButton: PropTypes.string,
      dismissButton: PropTypes.string,
      doneButton: PropTypes.string,
      input: PropTypes.string
    })
  };

  static defaultProps = {
    accessibilityLabels: ACCESSIBILITY_LABELS
  };

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    if (props.value) {
      LogService.deprecationWarn({component: 'ColorPicker', oldProp: 'value', newProp: 'selectedValue'});
    }
    if (props.dialogProps) {
      LogService.warn(`ColorPicker's 'dialogProps' is deprecated. Please do NOT wrap Dialog props inside an object.`);
    }
  }

  get animatedIndex() {
    const {animatedIndex, colors} = this.props;
    if (animatedIndex === undefined) {
      return colors.length - 1;
    }
    return animatedIndex;
  }

  showDialog = () => {
    this.setState({show: true});
  };

  hideDialog = () => {
    this.setState({show: false});
  }

  render() {
    const {initialColor, colors, value, selectedValue, testID, accessibilityLabels} = this.props;
    const {show} = this.state;

    return (
      <View row testID={testID}>
        <ColorPalette
          value={selectedValue || value}
          colors={colors}
          style={styles.palette}
          usePagination={false}
          animatedIndex={this.animatedIndex}
          onValueChange={this.onValueChange}
          testID={`${testID}-palette`}
        />
        <View style={styles.buttonContainer}>
          <Button
            color={Colors.dark10}
            outlineColor={Colors.dark10}
            style={styles.button}
            round
            outline
            iconSource={Assets.icons.plusSmall}
            onPress={this.showDialog}
            testID={`${testID}-button`}
            accessibilityLabel={accessibilityLabels.addButton}
          />
        </View>
        <ColorPickerDialog
          {...this.props}
          key={initialColor}
          visible={show}
          onDismiss={this.hideDialog}
          accessibilityLabels={{
            dismissButton: accessibilityLabels.dismissButton,
            doneButton: accessibilityLabels.doneButton,
            input: accessibilityLabels.input
          }}
        />
      </View>
    );
  }

  // ColorPalette
  onValueChange = (value, options) => {
    _.invoke(this.props, 'onValueChange', value, options);
  };
}

export default asBaseComponent(ColorPicker);


const plusButtonContainerWidth = SWATCH_SIZE + 20 + 12;
const plusButtonContainerHeight = 92 - 2 * SWATCH_MARGIN;

const styles = StyleSheet.create({
  palette: {
    paddingLeft: plusButtonContainerWidth
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
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    marginRight: 12
  }
});
