import React, {PropTypes} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors, Typography, ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import PickerModal from './PickerModal';
import PickerItem from './PickerItem';
import * as PickerPresenter from './PickerPresenter';

/**
 * Picker Component
 */
class Picker extends BaseComponent {
  static displayName = 'Picker';

  static modes = {
    SINGLE: 'SINGLE',
    MULTI: 'MULTI',
  }

  static propTypes = {
    /**
     * The Picker button label
     */
    label: PropTypes.string,
    /**
     * the current selected value
     */
    selectedValue: PropTypes.any,
    /**
     * callback for when picker value change
     */
    onValueChange: PropTypes.func,
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
    mode: Picker.modes.SINGLE,
    enableModalBlur: true,
  }

  constructor(props) {
    super(props);

    this.togglePickerModal = this.togglePickerModal.bind(this);
    this.renderPickerModal = this.renderPickerModal.bind(this);
    this.pickItem = this.pickItem.bind(this);
    this.toggleItemSelection = this.toggleItemSelection.bind(this);
    this.appendPropsToChildren = this.appendPropsToChildren.bind(this);
    this.doneMultiSelect = this.doneMultiSelect.bind(this);
    this.cancelSelect = this.cancelSelect.bind(this);

    this.state = {
      showModal: false,
      selectedValue: props.selectedValue,
    };

    if (props.mode === Picker.modes.SINGLE && Array.isArray(props.selectedValue)) {
      console.warn('Picker in SINGLE mode cannot accpet an array for selectedValue');
    }

    if (props.mode === Picker.modes.MULTI && !Array.isArray(props.selectedValue)) {
      console.warn('Picker in MULTI mode must accpet an array for selectedValue');
    }
  }

  componentWillReceiveProps(nexProps) {
    this.setState({
      selectedValue: nexProps.selectedValue,
    });
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  togglePickerModal(value) {
    return this.setState({showModal: value});
  }

  pickItem({value}) {
    const {onValueChange} = this.props;
    this.setState({
      selectedValue: value,
    });
    if (onValueChange) {
      onValueChange({value});
    }
    this.togglePickerModal(false);
  }

  toggleItemSelection({value}) {
    const {selectedValue} = this.state;
    const newSelectedValue = _.xor(selectedValue, [value]);
    this.setState({
      selectedValue: newSelectedValue,
    });
  }

  doneMultiSelect() {
    const {onValueChange} = this.props;
    this.togglePickerModal(false);
    if (onValueChange) {
      onValueChange({value: this.state.selectedValue});
    }
  }

  cancelSelect() {
    this.setState({
      selectedValue: this.props.selectedValue,
    });
    this.togglePickerModal(false);
  }

  appendPropsToChildren() {
    const {children, mode} = this.props;
    const {selectedValue} = this.state;
    const childrenWithProps = React.Children.map(children,
      child => React.cloneElement(child, {
        isSelected: PickerPresenter.isItemSelected(child.props.value, selectedValue),
        onPress: mode === Picker.modes.MULTI ? this.toggleItemSelection : this.pickItem,
      }),
    );

    return childrenWithProps;
  }

  renderPickerModal() {
    const {mode, enableModalBlur} = this.props;
    const {showModal} = this.state;
    return (
      <PickerModal
        visible={showModal}
        onCancel={this.cancelSelect}
        onDone={this.doneMultiSelect}
        showDone={mode === Picker.modes.MULTI}
        enableModalBlur={enableModalBlur}
      >
        {this.appendPropsToChildren(this.props.children)}
      </PickerModal>);
  }

  render() {
    const {label, testId} = this.props;
    return (
      <TouchableOpacity
        style={[this.styles.container]}
        activeOpacity={0.6}
        onPress={() => this.togglePickerModal(true)}
        testId={testId}
      >
        <Text style={this.styles.label}>
          {label}
        </Text>

        {this.renderPickerModal()}
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
    },
    label: {
      ...Typography.text80,
      color: Colors.dark10,
    },
  });
}

Picker.Item = PickerItem;
export default Picker;
