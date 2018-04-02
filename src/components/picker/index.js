import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Colors} from '../../style';
import {TextInput} from '../inputs';
import PickerModal from './PickerModal';
import PickerItem from './PickerItem';
import * as PickerPresenter from './PickerPresenter';
import Button from '../../components/button';
import View from '../../components/view';
import Modal from '../../screensComponents/modal';

const PICKER_MODES = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
};

const ItemType = PropTypes.shape({value: PropTypes.any, label: PropTypes.string});

/**
 * @description: Picker Component, support single or multiple selection, blurModel and floatingPlaceholder
 * @extends: TextInput
 * @extendslink: docs/TextInput
 * @gif: https://media.giphy.com/media/3o751SiuZZiByET2lq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
class Picker extends TextInput {
  static displayName = 'Picker';
  static modes = PICKER_MODES;
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * picker current value in the shape of {value: ..., label: ...}, for custom shape use 'getItemValue' prop
     */
    value: PropTypes.oneOfType([ItemType, PropTypes.arrayOf(ItemType), PropTypes.object]),
    /**
     * callback for when picker value change
     */
    onChange: PropTypes.func,
    /**
     * SINGLE mode or MULTI mode
     */
    mode: PropTypes.oneOf(Object.keys(PICKER_MODES)),
    /**
     * Adds blur effect to picker modal (only iOS)
     */
    enableModalBlur: PropTypes.bool,
    /**
     * render custom picker
     */
    renderPicker: PropTypes.func,
    /**
     * add onPress callback for when pressing the picker
     */
    onPress: PropTypes.func,
    /**
     * a function that extract the unique value out of the value prop in case value has a custom structure.
     */
    getItemValue: PropTypes.func,
    /**
     * a function that returns the label to show for the selected Picker value
     */
    getLabel: PropTypes.func,
    /**
     * The picker modal top bar props
     */
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
  };

  static defaultProps = {
    ...TextInput.defaultProps,
    mode: PICKER_MODES.SINGLE,
    enableModalBlur: true,
    expandable: true,
    text70: true,
    floatingPlaceholder: true,
  };

  constructor(props) {
    super(props);

    this.onDoneSelecting = this.onDoneSelecting.bind(this);
    this.toggleItemSelection = this.toggleItemSelection.bind(this);
    this.appendPropsToChildren = this.appendPropsToChildren.bind(this);
    this.cancelSelect = this.cancelSelect.bind(this);
    this.handlePickerOnPress = this.handlePickerOnPress.bind(this);

    this.state = {
      ...this.state,
      showModal: false,
    };

    if (props.mode === Picker.modes.SINGLE && Array.isArray(props.value)) {
      console.warn('Picker in SINGLE mode cannot accept an array for value');
    }

    if (props.mode === Picker.modes.MULTI && !Array.isArray(props.value)) {
      console.warn('Picker in MULTI mode must accept an array for value');
    }
  }

  componentWillReceiveProps(nexProps) {
    this.setState({
      value: nexProps.value,
    });
  }

  toggleItemSelection(item) {
    const {value} = this.state;
    const newValue = _.xorBy(value, [item], 'value');
    this.setState({
      value: newValue,
    });
  }

  onDoneSelecting(item) {
    this.onChangeText(item);
    this.toggleExpandableModal(false);
    _.invoke(this.props, 'onChange', item);
  }

  cancelSelect() {
    this.setState({
      value: this.props.value,
    });
    this.toggleExpandableModal(false);
  }

  appendPropsToChildren() {
    const {children, mode, getItemValue} = this.props;
    const {value} = this.state;
    const childrenWithProps = React.Children.map(children, (child) => {
      const childValue = PickerPresenter.getItemValue({getItemValue, ...child.props});
      const selectedValue = PickerPresenter.getItemValue({value, getItemValue});
      return React.cloneElement(child, {
        isSelected: PickerPresenter.isItemSelected(childValue, selectedValue),
        onPress: mode === Picker.modes.MULTI ? this.toggleItemSelection : this.onDoneSelecting,
        getItemValue: child.props.getItemValue || getItemValue,
      });
    });

    return childrenWithProps;
  }

  getLabel() {
    const {getLabel} = this.props;
    const {value} = this.state;
    if (_.isArray(value)) {
      return _.chain(value).map('label').join(', ').value();
    }
    return _.isFunction(getLabel) ? getLabel(value) : _.get(value, 'label');
  }

  handlePickerOnPress() {
    this.toggleExpandableModal(true);
    _.invoke(this.props, 'onPress');
  }

  renderExpandableInput() {
    const typography = this.getTypography();
    const color = this.extractColorValue() || Colors.dark10;
    const label = this.getLabel();

    return (
      <Text
        style={[this.styles.input, typography, {color}]}
        numberOfLines={3}
        onPress={this.handlePickerOnPress}
      >
        {label}
      </Text>
    );
  }

  renderExpandableModal() {
    const {mode, enableModalBlur, topBarProps} = this.props;
    const {showExpandableModal} = this.state;
    return (
      <PickerModal
        visible={showExpandableModal}

        enableModalBlur={enableModalBlur}
        topBarProps={{
          ...topBarProps,
          onCancel: this.cancelSelect,
          onDone: mode === Picker.modes.MULTI ? () => this.onDoneSelecting(this.state.value) : undefined,
        }}
      >
        {this.appendPropsToChildren(this.props.children)}
      </PickerModal>);
  }

  render() {
    const {renderPicker, testID} = this.props;
    if (_.isFunction(renderPicker)) {
      const {value} = this.state;
      return (
        <View left>
          <Button link onPress={this.handlePickerOnPress} testID={testID}>
            {renderPicker(value)}
          </Button>
          {this.renderExpandableModal()}
        </View>
      );
    }

    return super.render();
  }
}

Picker.Item = PickerItem;
export default Picker;
