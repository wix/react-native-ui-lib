// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
// TODO: deprecate onShow cause it's already supported by passing it in pickerModalProps
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import memoize from 'memoize-one';
import {Constants, asBaseComponent, forwardRef} from '../../commons';
import {LogService} from '../../services';
// import View from '../../components/view';
import Modal from '../modal';
import ExpandableOverlay from '../../incubator/expandableOverlay';
// import Button from '../../components/button';
import {TextField} from '../inputs';
import NativePicker from './NativePicker';
import PickerModal from './PickerModal';
import PickerItem from './PickerItem';
import PickerContext from './PickerContext';
import {getItemLabel as getItemLabelPresenter, shouldFilterOut} from './PickerPresenter';

const PICKER_MODES = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI'
};
const ItemType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
  })
]);

/**
 * @description: Picker Component, support single or multiple selection, blurModel and native wheel picker
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/MultiPicker.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/NativePicker.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/DialogPicker.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/CustomPicker.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.js
 */
class Picker extends Component {
  static displayName = 'Picker';
  static propTypes = {
    /**
     * Temporary prop required for migration to Picker's new API
     */
    migrate: PropTypes.bool,
    ...TextField.propTypes,
    /**
     * Picker current value in the shape of {value: ..., label: ...}, for custom shape use 'getItemValue' prop
     */
    value: PropTypes.oneOfType([
      ItemType,
      PropTypes.arrayOf(ItemType),
      PropTypes.object,
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * Callback for when picker value change
     */
    onChange: PropTypes.func,
    /**
     * SINGLE mode or MULTI mode
     */
    mode: PropTypes.oneOf(Object.keys(PICKER_MODES)),
    /**
     * Limit the number of selected items
     */
    selectionLimit: PropTypes.number,
    /**
     * Adds blur effect to picker modal (iOS only)
     */
    enableModalBlur: PropTypes.bool,
    /**
     * Render custom picker - input will be value (see above)
     * Example:
     * renderPicker = (selectedItem) => {...}
     */
    renderPicker: PropTypes.elementType,
    /**
     * Render custom picker item
     */
    renderItem: PropTypes.elementType,
    /**
     * Render custom picker modal (e.g ({visible, children, toggleModal}) => {...})
     */
    renderCustomModal: PropTypes.elementType,
    /**
     * Custom picker props (when using renderPicker, will apply on the button wrapper)
     */
    customPickerProps: PropTypes.object,
    /**
     * Add onPress callback for when pressing the picker
     */
    onPress: PropTypes.func,
    /**
     * @deprecated
     * A function that extract the unique value out of the value prop in case value has a custom structure (e.g. {myValue, myLabel})
     */
    getItemValue: PropTypes.func,
    /**
     * @deprecated
     * A function that extract the label out of the value prop in case value has a custom structure (e.g. {myValue, myLabel})
     */
    getItemLabel: PropTypes.func,
    /**
     * A function that returns the label to show for the selected Picker value
     */
    getLabel: PropTypes.func,
    /**
     * The picker modal top bar props
     */
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
    /**
     * Show search input to filter picker items by label
     */
    showSearch: PropTypes.bool,
    /**
     * Style object for the search input (only when passing showSearch)
     */
    searchStyle: PropTypes.shape({
      color: PropTypes.string,
      placeholderTextColor: PropTypes.string,
      selectionColor: PropTypes.string
    }),
    /**
     * Placeholder text for the search input (only when passing showSearch)
     */
    searchPlaceholder: PropTypes.string,
    /**
     * callback for picker modal search input text change (only when passing showSearch)
     */
    onSearchChange: PropTypes.func,
    /**
     * Render custom search input (only when passing showSearch)
     */
    renderCustomSearch: PropTypes.elementType,
    /**
     * Allow to use the native picker solution (different style for iOS and Android)
     */
    useNativePicker: PropTypes.bool,
    /**
     * Callback for rendering a custom native picker inside the dialog (relevant to native picker only)
     */
    renderNativePicker: PropTypes.elementType,
    /**
     * Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
     */
    listProps: PropTypes.object,
    /**
     * Pass props to the picker modal
     */
    pickerModalProps: PropTypes.object
  };

  static defaultProps = {
    ...TextField.defaultProps,
    mode: PICKER_MODES.SINGLE
  };

  static modes = PICKER_MODES;

  pickerExpandable = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      selectedItemPosition: 0,
      items: Picker.extractPickerItems(props),
      multiDraftValue: props.value,
      multiFinalValue: props.value
    };

    if (props.mode === Picker.modes.SINGLE && Array.isArray(props.value)) {
      LogService.warn('Picker in SINGLE mode cannot accept an array for value');
    }
    if (props.mode === Picker.modes.MULTI && !Array.isArray(props.value)) {
      LogService.warn('Picker in MULTI mode must accept an array for value');
    }

    // TODO: this warning should be replaced by the opposite
    // we should warn user NOT to pass an object to the value prop
    // if (props.useNativePicker && _.isPlainObject(props.value)) {
    //   console.warn('UILib Picker: don\'t use object as value for native picker, use either string or a number');
    // }
    if (_.isPlainObject(props.value)) {
      LogService.warn('UILib Picker will stop supporting passing object as value in the next major version. Please use either string or a number as value');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.mode === Picker.modes.MULTI) {
      if (prevState.multiFinalValue !== nextProps.value) {
        return {multiDraftValue: nextProps.value, multiFinalValue: nextProps.value};
      }
    }
    return null;
  }

  static extractPickerItems(props) {
    const {children} = props;
    const items = React.Children.map(children, child => ({value: child.props.value, label: child.props.label}));
    return items;
  }

  getAccessibilityInfo() {
    const {placeholder} = this.props;

    return {
      accessibilityLabel: this.getLabelValueText()
        ? `${placeholder}. selected. ${this.getLabelValueText()}`
        : `Select ${placeholder}`,
      accessibilityHint: this.getLabelValueText()
        ? 'Double tap to edit'
        : `Goes to ${placeholder}. Suggestions will be provided`
    };
  }

  getContextValue = () => {
    const {multiDraftValue} = this.state;
    const {migrate, mode, getItemValue, getItemLabel, renderItem, selectionLimit, value} = this.props;
    const pickerValue = !migrate && _.isPlainObject(value) ? value?.value : value;
    return {
      migrate,
      value: mode === Picker.modes.MULTI ? multiDraftValue : pickerValue,
      onPress: mode === Picker.modes.MULTI ? this.toggleItemSelection : this.onDoneSelecting,
      isMultiMode: mode === Picker.modes.MULTI,
      getItemValue,
      getItemLabel,
      onSelectedLayout: this.onSelectedItemLayout,
      renderItem,
      selectionLimit
    };
  };

  getLabelValueText = () => {
    const {value} = this.props;
    return this.getLabel(value);
  };

  getLabelsFromArray = value => {
    const {items} = this.state;
    const itemsByValue = _.keyBy(items, 'value');

    const {getItemLabel = _.noop} = this.props;
    return _.chain(value)
      .map(item => (_.isPlainObject(item) ? getItemLabel(item) || item?.label : itemsByValue[item]?.label))
      .join(', ')
      .value();
  };

  getLabel = value => {
    const {getLabel} = this.props;

    if (_.isFunction(getLabel) && !_.isUndefined(getLabel(value))) {
      return getLabel(value);
    }

    if (_.isArray(value)) {
      return this.getLabelsFromArray(value);
    }

    if (_.isPlainObject(value)) {
      return _.get(value, 'label');
    }

    // otherwise, extract from picker items
    const {items} = this.state;
    const selectedItem = _.find(items, {value});

    return _.get(selectedItem, 'label');
  };

  getFilteredChildren = memoize((children, searchValue) => {
    const {getItemLabel: getItemLabelPicker} = this.props;
    return _.filter(children, child => {
      const {label, value, getItemLabel} = child.props;
      const itemLabel = getItemLabelPresenter(label, value, getItemLabel || getItemLabelPicker);
      return !shouldFilterOut(searchValue, itemLabel);
    });
  });

  get children() {
    const {searchValue} = this.state;
    const {children, showSearch} = this.props;
    if (showSearch && !_.isEmpty(searchValue)) {
      return this.getFilteredChildren(children, searchValue);
    }

    return children;
  }

  // handlePickerOnPress = () => {
  //   this.toggleExpandableModal(true);
  //   _.invoke(this.props, 'onPress');
  // };

  // toggleExpandableModal = value => {
  //   this.setState({showExpandableModal: value});
  //   this.clearSearchField();
  // };

  toggleItemSelection = item => {
    const {getItemValue, migrate} = this.props;
    const {multiDraftValue} = this.state;
    let newValue;
    if (!migrate) {
      newValue = _.xorBy(multiDraftValue, [item], getItemValue || 'value');
    } else {
      newValue = _.xor(multiDraftValue, [item]);
    }

    this.setState({multiDraftValue: newValue});
  };

  cancelSelect = () => {
    this.setState({multiDraftValue: this.state.multiFinalValue});
    // this.toggleExpandableModal(false);
    this.pickerExpandable.current?.closeExpandable?.();
    this.props.topBarProps?.onCancel?.();
  };

  onDoneSelecting = item => {
    this.clearSearchField();
    this.setState({multiFinalValue: item});
    // this.toggleExpandableModal(false);
    this.pickerExpandable.current?.closeExpandable?.();
    this.props.onChange?.(item);
  };

  onSearchChange = searchValue => {
    this.setState({searchValue});
    _.invoke(this.props, 'onSearchChange', searchValue);
  };

  onSelectedItemLayout = ({
    nativeEvent: {
      layout: {y}
    }
  }) => {
    this.setState({selectedItemPosition: y});
  };

  clearSearchField = () => {
    this.setState({searchValue: ''});
  };

  renderCustomModal = ({visible, toggleExpandable}) => {
    const {renderCustomModal, children} = this.props;
    const {multiDraftValue} = this.state;

    if (renderCustomModal) {
      const modalProps = {
        visible,
        toggleModal: toggleExpandable,
        onSearchChange: this.onSearchChange,
        children,
        // onDone is relevant to multi mode only
        onDone: () => this.onDoneSelecting(multiDraftValue),
        onCancel: this.cancelSelect
      };

      return renderCustomModal(modalProps);
    }
  };

  // TODO: Rename to renderExpandableContent
  renderExpandableModal = () => {
    const {
      mode,
      enableModalBlur,
      topBarProps,
      showSearch,
      onShow,
      searchStyle,
      searchPlaceholder,
      renderCustomSearch,
      // renderCustomModal,
      listProps,
      // children,
      testID,
      pickerModalProps
    } = this.props;
    const {showExpandableModal, selectedItemPosition, multiDraftValue} = this.state;

    // if (renderCustomModal) {
    //   const modalProps = {
    //     visible: showExpandableModal,
    //     toggleModal: this.toggleExpandableModal,
    //     onSearchChange: this.onSearchChange,
    //     children,
    //     onDone: () => this.onDoneSelecting(multiDraftValue),
    //     onCancel: this.cancelSelect
    //   };

    //   return (
    //     <>
    //       {/* <PickerContext.Provider value={this.getContextValue()}> */}
    //       {renderCustomModal(modalProps)}
    //       {/* </PickerContext.Provider> */}
    //     </>
    //   );
    // }

    return (
      // <PickerContext.Provider value={this.getContextValue()}>
      <PickerModal
        testID={`${testID}.modal`}
        visible={showExpandableModal}
        scrollPosition={selectedItemPosition}
        enableModalBlur={enableModalBlur}
        topBarProps={{
          ...topBarProps,
          onCancel: this.cancelSelect,
          onDone: mode === Picker.modes.MULTI ? () => this.onDoneSelecting(multiDraftValue) : undefined
        }}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={this.onSearchChange}
        renderCustomSearch={renderCustomSearch}
        listProps={listProps}
        onShow={onShow}
        pickerModalProps={pickerModalProps}
      >
        {this.children}
      </PickerModal>
      // </PickerContext.Provider>
    );
  };

  render() {
    const {
      useNativePicker,
      renderPicker,
      customPickerProps,
      containerStyle,
      testID,
      onShow,
      renderCustomModal,
      forwardedRef,
      modifiers,
      enableModalBlur,
      topBarProps,
      pickerModalProps,
      value,
      editable
    } = this.props;

    if (useNativePicker) {
      return <NativePicker {...this.props}/>;
    }

    // if (_.isFunction(renderPicker)) {
    //   const {value} = this.props;

    //   return (
    //     <PickerContext.Provider value={this.getContextValue()}>
    //       <View left>
    //         <Button {...customPickerProps} link onPress={this.handlePickerOnPress} testID={testID}>
    //           {renderPicker(value, this.getLabel(value))}
    //         </Button>
    //         {this.renderExpandableModal()}
    //       </View>
    //     </PickerContext.Provider>
    //   );
    // }

    const textInputProps = TextField.extractOwnProps(this.props);
    const label = this.getLabelValueText();
    const {paddings, margins, positionStyle} = modifiers;

    const modalProps = {
      animationType: 'slide',
      transparent: Constants.isIOS && enableModalBlur,
      enableModalBlur: Constants.isIOS && enableModalBlur,
      onRequestClose: topBarProps?.onCancel,
      onShow,
      ...pickerModalProps
    };

    return (
      <PickerContext.Provider value={this.getContextValue()}>
        <ExpandableOverlay
          ref={this.pickerExpandable}
          modalProps={modalProps}
          expandableContent={this.renderExpandableModal()}
          renderCustomOverlay={renderCustomModal ? this.renderCustomModal : undefined}
          testID={testID}
          {...customPickerProps}
          disabled={editable === false}
        >
          {renderPicker ? (
            renderPicker(value, this.getLabel(value))
          ) : (
            <TextField
              ref={forwardedRef}
              {...textInputProps}
              testID={`${testID}.input`}
              containerStyle={[paddings, margins, positionStyle, containerStyle]}
              {...this.getAccessibilityInfo()}
              importantForAccessibility={'no-hide-descendants'}
              value={label}
              selection={Constants.isAndroid ? {start: 0} : undefined}
              // Disable TextField expandable feature
              expandable={false}
              renderExpandable={_.noop}
              onToggleExpandableModal={_.noop}
            />
          )}
        </ExpandableOverlay>
      </PickerContext.Provider>
    );
  }
}

Picker.Item = PickerItem;

export {Picker}; // For tests
export default asBaseComponent(forwardRef(Picker));
