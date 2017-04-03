import React, {PropTypes} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors, Typography} from '../../style';
import {BaseComponent} from '../../commons';
import {TextInput} from '../inputs';
import PickerModal from './PickerModal';
import PickerItem from './PickerItem';
import * as PickerPresenter from './PickerPresenter';

const ItemType = PropTypes.shape({value: PropTypes.any, label: PropTypes.string});

/**
 * Picker Component
 */
class Picker extends TextInput {
  static displayName = 'Picker';

  static modes = {
    SINGLE: 'SINGLE',
    MULTI: 'MULTI',
  }

  static propTypes = {
    ...TextInput.propTypes,
    /**
     * picker current value
     */
    value: PropTypes.oneOf(ItemType, PropTypes.arrayOf(ItemType)),
    /**
     * callback for when picker value change
     */
    onChange: PropTypes.func,
    /**
     * SINGLE mode or MULTI mode
     */
    mode: PropTypes.oneOf(Object.keys(Picker.modes)),
    /**
     * Adds blur effect to picker modal (only iOS)
     */
    enableModalBlur: PropTypes.bool,
    /**
     * Use to identify the picker in tests
     */
    testId: PropTypes.string,
  };

  static defaultProps = {
    ...TextInput.defaultProps,
    mode: Picker.modes.SINGLE,
    enableModalBlur: true,

    expandable: true,
    text70: true,
    floatingPlaceholder: true,
  }

  constructor(props) {
    super(props);

    this.pickItem = this.pickItem.bind(this);
    this.toggleItemSelection = this.toggleItemSelection.bind(this);
    this.appendPropsToChildren = this.appendPropsToChildren.bind(this);
    this.doneMultiSelect = this.doneMultiSelect.bind(this);
    this.cancelSelect = this.cancelSelect.bind(this);

    this.state = {
      ...this.state,
      showModal: false,
      selectedValue: props.selectedValue,
    };

    if (props.mode === Picker.modes.SINGLE && Array.isArray(props.value)) {
      console.warn('Picker in SINGLE mode cannot accpet an array for value');
    }

    if (props.mode === Picker.modes.MULTI && !Array.isArray(props.value)) {
      console.warn('Picker in MULTI mode must accpet an array for value');
    }
  }

  componentWillReceiveProps(nexProps) {
    this.setState({
      selectedValue: nexProps.selectedValue,
    });
  }

  pickItem(item) {
    this.onChangeText(item);
    this.toggleExpandableModal(false);
    _.invoke(this.props, 'onChange', item);
    // this.updateFloatingPlaceholderState(true);
  }

  toggleItemSelection(item) {
    const {value} = this.state;
    const newValue = _.xorBy(value, [item], 'value');
    this.setState({
      value: newValue,
    });
  }

  doneMultiSelect() {

    const {value} = this.state;
    this.onChangeText(value);
    this.toggleExpandableModal(false);
    _.invoke(this.props, 'onChange', value);


    // const {onValueChange} = this.props;
    // this.toggleExpandableModal(false);
    // if (onValueChange) {
    //   onValueChange({value: this.state.selectedValue});
    // }
  }

  cancelSelect() {
    this.setState({
      value: this.props.value,
    });
    this.toggleExpandableModal(false);
  }

  appendPropsToChildren() {
    const {children, mode} = this.props;
    const {value} = this.state;
    const childrenWithProps = React.Children.map(children,
      child => React.cloneElement(child, {
        isSelected: PickerPresenter.isItemSelected(child.props.value, value),
        onPress: mode === Picker.modes.MULTI ? this.toggleItemSelection : this.pickItem,
      }),
    );

    return childrenWithProps;
  }

  getLabel() {
    const {value} = this.state;
    if (_.isArray(value)) {
      return _.chain(value).map('label').join(', ').value();
    }
    return _.get(value, 'label');
  }

  renderExpandableInput() {
    const typography = this.getTypography();
    const color = this.extractColorValue() || Colors.dark10;
    const label = this.getLabel();

    return (
      <Text
        style={[this.styles.input, typography, {color}]}
        numberOfLines={3}
        onPress={() => this.toggleExpandableModal(true)}
      >
        {label}
      </Text>
    );
  }

  renderExpandableModal() {
    const {mode, enableModalBlur} = this.props;
    // const {showModal} = this.state;
    const {showExpandableModal} = this.state;
    return (
      <PickerModal
        visible={showExpandableModal}
        onCancel={this.cancelSelect}
        onDone={mode === Picker.modes.MULTI ? this.doneMultiSelect : undefined}
        enableModalBlur={enableModalBlur}
      >
        {this.appendPropsToChildren(this.props.children)}
      </PickerModal>);
  }
}

// function createStyles() {
//   return StyleSheet.create({
//     label: {
//       ...Typography.text80,
//       color: Colors.dark10,
//     },
//   });
// }

Picker.Item = PickerItem;
export default Picker;
