import React, {PropTypes} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors, Typography, ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import * as Assets from '../../assets';
import View from '../view';

// todo: fully deprecate label prop
class PickerItem extends BaseComponent {
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

    if (_.isObject(props.value)) {
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
        <Text style={[this.styles.labelText, disabled && this.styles.labelTextDisabled]}>{this.getLabel()}</Text>
        {this.renderSelectedIndicator()}
      </View>
    );
  }

  render() {
    const {renderItem, label, value, disabled, onPress} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        // todo: deprecate the check for object
        onPress={() => onPress(_.isObject(value) ? value : {value, label})}
        disabled={disabled}
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
