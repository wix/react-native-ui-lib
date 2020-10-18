// TODO: deprecate passing an an object as a value, use label and value props separately
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../style';
import {BaseComponent} from '../../commons';
import Assets from '../../assets';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Image from '../image';
import Text from '../text';

/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.js
 */
class PickerItem extends BaseComponent {
  static displayName = 'Picker.Item';

  static propTypes = {
    /**
     * Item's value
     */
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    /**
     * Item's label
     */
    label: PropTypes.string,
    /**
     * Custom function for the item label (e.g (value) => customLabel)
     */
    getItemLabel: PropTypes.func,
    /**
     * DEPRECATE: Function to return the value out of the item value prop when value is custom shaped.
     */
    getItemValue: PropTypes.func,
    /**
     * Is the item selected
     */
    isSelected: PropTypes.bool,
    /**
     * Pass to change the selected icon
     */
    selectedIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Pass to change the selected icon color
     */
    selectedIconColor: PropTypes.string,
    /**
     * Is the item disabled
     */
    disabled: PropTypes.bool,
    /**
     * Render custom item
     */
    renderItem: PropTypes.elementType,
    /**
     * Callback for onPress action
     */
    onPress: PropTypes.func,
    /**
     * Callback for onLayout event
     */
    onSelectedLayout: PropTypes.func
  };

  
  constructor(props) {
    super(props);

    if (_.isPlainObject(props.value)) {
      console.warn('UILib Picker.Item will stop supporting passing object as value & label (e.g {value, label}) in the next major version. Please pass separate label and value props');
    }
  }
  

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getLabel() {
    const {value, label} = this.props;

    if (_.isObject(value)) {
      return _.invoke(this.props, 'getItemLabel', value) || _.get(value, 'label');
    }
    return label;
  }

  renderSelectedIndicator() {
    const {
      isSelected,
      disabled,
      selectedIcon = Assets.icons.check,
      selectedIconColor = Colors.primary
    } = this.props;

    if (isSelected) {
      return <Image source={selectedIcon} tintColor={disabled ? Colors.dark60 : selectedIconColor}/>;
    }
  }

  renderItem() {
    const {disabled} = this.props;

    return (
      <View style={this.styles.container} flex row spread centerV>
        <Text numberOfLines={1} style={[this.styles.labelText, disabled && this.styles.labelTextDisabled]}>
          {this.getLabel()}
        </Text>
        {this.renderSelectedIndicator()}
      </View>
    );
  }

  onSelectedLayout = (...args) => {
    _.invoke(this.props, 'onSelectedLayout', ...args);
  };

  render() {
    const {renderItem, value, disabled, isSelected, testID} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.onPress}
        onLayout={isSelected ? this.onSelectedLayout : undefined}
        disabled={disabled}
        testID={testID}
        throttleTime={0}
        {...this.extractAccessibilityProps()}
      >
        {renderItem ? renderItem(value, this.props, this.getLabel()) : this.renderItem()}
      </TouchableOpacity>
    );
  }

  // TODO: deprecate the check for object
  onPress = () => {
    const {label, value, onPress} = this.props;
    onPress(_.isObject(value) ? value : {value, label});
  };
}

function createStyles() {
  return StyleSheet.create({
    container: {
      height: 56.5,
      paddingHorizontal: 23,
      borderColor: Colors.rgba(Colors.dark10, 0.1),
      borderBottomWidth: 1
    },
    labelText: {
      ...Typography.text70,
      color: Colors.dark10,
      flex: 1,
      textAlign: 'left'
    },
    labelTextDisabled: {
      color: Colors.dark60
    }
  });
}

export default PickerItem;
