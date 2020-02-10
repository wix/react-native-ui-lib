// TODO: deprecate passing an an object as a value, use label and value props separately
import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors, Typography, ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import Assets from '../../assets';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';

/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
class PickerItem extends BaseComponent {
  static displayName = 'Picker.Item';
  static propTypes = {
    /**
     * [DEPRECATED - please include the label in the value prop] The item label
     */
    label: PropTypes.string,
    /**
     * The item value with the following format - {value: ..., label: ...},
     * for custom shape use getItemLabel, getItemValue props
     */
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    /**
     * Function to return the label out of the item value prop when value is custom shaped.
     */
    getItemLabel: PropTypes.func,
    /**
     * Function to return the value out of the item value prop when value is custom shaped.
     */
    getItemValue: PropTypes.func,
    /**
     * Is the item selected
     */
    isSelected: PropTypes.bool,
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

  /* eslint-disable */
  /* constructor(props) {
    super(props);

    if (props.label) {
      console.warn('PickerItem \'label\' prop will be deprecated soon. please include label in \'value\' prop. (refer docs)');  //eslint-disable-line
    }

    if (!_.isObject(props.value)) {
      console.warn('PickerItem \'value\' prop type has changed to object, please use it with the following format: {value: ..., label: ...} or use getItemValue & getItemLabel props'); //eslint-disable-line
    }
  } */
  /* eslint-enable */

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
    const {isSelected, disabled} = this.props;
    if (isSelected) {
      return (
        <Image style={[this.styles.checkIcon, disabled && this.styles.checkIconDisabled]} source={Assets.icons.check}/>
      );
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
    },
    checkIcon: {
      tintColor: ThemeManager.primaryColor
    },
    checkIconDisabled: {
      tintColor: Colors.dark60
    }
  });
}

export default PickerItem;
