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

// TODO: fully deprecate label prop
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
    value: PropTypes.object,
    /**
     * function to return the label out of the item value prop when value is custom shaped.
     */
    getItemLabel: PropTypes.func,
    /**
     * function to return the value out of the item value prop when value is custom shaped.
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
     * render custom item
     */
    renderItem: PropTypes.func,
    onPress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    if (props.label) {
      console.warn('PickerItem \'label\' prop will be deprecated soon. please include label in \'value\' prop. (refer docs)'); //eslint-disable-line
    }

    if (!_.isObject(props.value)) {
      console.warn('PickerItem \'value\' prop type has changed to object, please use it with the following format: {value: ..., label: ...} or use getItemValue & getItemLabel props'); //eslint-disable-line
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
    const {isSelected, disabled} = this.props;
    if (isSelected) {
      return (
        <Image
          style={[this.styles.checkIcon, disabled && this.styles.checkIconDisabled]}
          source={Assets.icons.check}
        />
      );
    }
  }

  renderItem() {
    const {disabled} = this.props;
    return (
      <View style={this.styles.container} flex row spread centerV>
        <Text
          numberOfLines={1}
          style={[this.styles.labelText, disabled && this.styles.labelTextDisabled]}
        >
          {this.getLabel()}
        </Text>
        {this.renderSelectedIndicator()}
      </View>
    );
  }

  render() {
    const {renderItem, label, value, disabled, onPress, testID} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        // todo: deprecate the check for object
        onPress={() => onPress(_.isObject(value) ? value : {value, label})}
        disabled={disabled}
        testID={testID}
      >
        {renderItem ? renderItem(value, this.props) : this.renderItem()}
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      height: 56.5,
      paddingHorizontal: 23,
      borderColor: Colors.rgba(Colors.dark10, 0.1),
      borderBottomWidth: 1,
    },
    labelText: {
      ...Typography.text70,
      color: Colors.dark10,
      flex: 1,
    },
    labelTextDisabled: {
      color: Colors.dark60,
    },
    checkIcon: {
      tintColor: ThemeManager.primaryColor,
    },
    checkIconDisabled: {
      tintColor: Colors.dark60,
    },
  });
}

export default PickerItem;
