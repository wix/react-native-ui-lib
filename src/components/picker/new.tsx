// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
// TODO: deprecate onShow cause it's already supported by passing it in pickerModalProps
import _ from 'lodash';
import React, {useMemo, useState, useRef, useEffect, PropsWithChildren} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {
  Constants,
  asBaseComponent,
  forwardRef,
  ForwardRefInjectedProps,
  BaseComponentInjectedProps
} from '../../commons/new';
import {LogService} from '../../services';
// import View from '../../components/view';
// import Modal from '../modal';
import ExpandableOverlay, {ExpandableOverlayProps} from '../../incubator/expandableOverlay';
// import Button from '../../components/button';
// @ts-expect-error
import {TextField} from '../inputs';
import TextFieldMigrator from '../textField/TextFieldMigrator';
// @ts-expect-error
import NativePicker from './NativePicker';
// @ts-expect-error
import PickerModal from './PickerModal';
// @ts-expect-error
import PickerItem from './PickerItem';
// @ts-expect-error
import PickerContext from './PickerContext';
// @ts-expect-error
import {getItemLabel as getItemLabelPresenter, shouldFilterOut} from './PickerPresenter';
import {PickerProps, PickerValue, PickerSingleValue, PickerMultiValue, PickerModes, PickerSearchStyle} from './types';

const PICKER_MODES = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI'
};

const Picker = (props: PropsWithChildren<PickerProps> & ForwardRefInjectedProps & BaseComponentInjectedProps) => {
  const {
    mode,
    selectionLimit,
    showSearch,
    searchStyle,
    searchPlaceholder,
    renderCustomSearch,
    useNativePicker,
    renderPicker,
    customPickerProps,
    containerStyle,
    testID,
    onChange,
    onShow,
    renderCustomModal,
    forwardedRef,
    modifiers,
    enableModalBlur,
    topBarProps,
    pickerModalProps,
    listProps,
    value,
    editable,
    getLabel,
    getItemLabel,
    getItemValue,
    renderItem,
    children,
    migrate,
    migrateTextField
  } = props;

  const [selectedItemPosition, setSelectedItemPosition] = useState(0);
  const [items] = useState(Picker.extractPickerItems(props));
  const [multiDraftValue, setMultiDraftValue] = useState(value as PickerMultiValue);
  const [multiFinalValue, setMultiFinalValue] = useState(value as PickerMultiValue);
  const [searchValue, setSearchValue] = useState('');
  // const [showExpandableModal, setShowExpandableModal] = useState(false);

  const pickerExpandable = useRef<typeof ExpandableOverlay>();

  useEffect(() => {
    if (mode === Picker.modes.SINGLE && Array.isArray(value)) {
      LogService.warn('Picker in SINGLE mode cannot accept an array for value');
    }
    if (mode === Picker.modes.MULTI && !Array.isArray(value)) {
      LogService.warn('Picker in MULTI mode must accept an array for value');
    }

    // TODO: this warning should be replaced by the opposite
    // we should warn user NOT to pass an object to the value prop
    // if (props.useNativePicker && _.isPlainObject(props.value)) {
    //   console.warn('UILib Picker: don\'t use object as value for native picker, use either string or a number');
    // }
    if (_.isPlainObject(value)) {
      LogService.warn('UILib Picker will stop supporting passing object as value in the next major version. Please use either string or a number as value');
    }
  }, []);

  const getAccessibilityInfo = () => {
    return {
      accessibilityLabel: getLabelValueText()
        ? `${props.placeholder}. selected. ${getLabelValueText()}`
        : `Select ${props.placeholder}`,
      accessibilityHint: getLabelValueText()
        ? 'Double tap to edit'
        : `Goes to ${props.placeholder}. Suggestions will be provided`
    };
  };

  const toggleItemSelection = (item: PickerSingleValue) => {
    let newValue;
    const itemAsArray = [item];
    if (!migrate) {
      newValue = _.xorBy(multiDraftValue, itemAsArray, getItemValue || 'value');
    } else {
      newValue = _.xor(multiDraftValue, itemAsArray);
    }

    setMultiDraftValue(newValue);
  };

  const onSelectedItemLayout = (event: LayoutChangeEvent) => {
    const y = event.nativeEvent.layout.y;
    setSelectedItemPosition(y);
  };

  const getContextValue = () => {
    const pickerValue = !migrate && typeof value === 'object' && !_.isArray(value) ? value?.value : value;
    return {
      migrate,
      value: mode === Picker.modes.MULTI ? multiDraftValue : pickerValue,
      onPress: mode === Picker.modes.MULTI ? toggleItemSelection : _onDoneSelecting,
      isMultiMode: mode === Picker.modes.MULTI,
      getItemValue,
      getItemLabel,
      onSelectedLayout: onSelectedItemLayout,
      renderItem,
      selectionLimit
    };
  };

  // @ts-expect-error should set types for children based in PickerItem
  const getFilteredChildren = (children, searchValue: string) => {
    return _.filter(children, child => {
      const {label, value, getItemLabel: childGetItemLabel} = child.props;
      const itemLabel = getItemLabelPresenter(label, value, childGetItemLabel || getItemLabel);
      return !shouldFilterOut(searchValue, itemLabel);
    });
  };

  const filteredChildren = useMemo(() => {
    if (showSearch && !_.isEmpty(searchValue)) {
      return getFilteredChildren(children, searchValue);
    }

    return children;
  }, [children]);

  const getLabelsFromArray = (value: PickerValue) => {
    const itemsByValue = _.keyBy(items, 'value');

    return _.flow(arr =>
      _.map(arr, item => (_.isPlainObject(item) ? getItemLabel?.(item) || item?.label : itemsByValue[item]?.label)),
    arr => _.join(arr, ', '))(value);
  };

  const _getLabel = (value: PickerValue) => {
    if (_.isFunction(getLabel) && !_.isUndefined(getLabel(value))) {
      return getLabel(value);
    }

    if (_.isArray(value)) {
      return getLabelsFromArray(value);
    }

    if (typeof value === 'object') {
      return value?.label;
    }

    // otherwise, extract from picker items
    const selectedItem = _.find(items, {value});

    return _.get(selectedItem, 'label');
  };

  const getLabelValueText = () => {
    return _getLabel(value);
  };

  const _onSearchChange = (searchValue: string) => {
    setSearchValue(searchValue);
    props.onSearchChange?.(searchValue);
  };

  const _onDoneSelecting = (item: PickerValue) => {
    setSearchValue('');
    setMultiFinalValue(item as PickerMultiValue);
    // @ts-expect-error
    pickerExpandable.current?.closeExpandable?.();
    onChange?.(item);
  };

  const _cancelSelect = () => {
    setMultiDraftValue(multiFinalValue);
    // @ts-expect-error
    pickerExpandable.current?.closeExpandable?.();
    topBarProps?.onCancel?.();
  };

  const textInputProps = TextField.extractOwnProps(props);
  const label = getLabelValueText();
  const {paddings, margins, positionStyle} = modifiers;

  const modalProps: ExpandableOverlayProps['modalProps'] = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel,
    onShow,
    ...pickerModalProps
  };

  const _renderCustomModal: ExpandableOverlayProps['renderCustomOverlay'] = ({visible, toggleExpandable}) => {
    if (renderCustomModal) {
      const modalProps = {
        visible,
        toggleModal: toggleExpandable,
        onSearchChange: _onSearchChange,
        children,
        // onDone is relevant to multi mode only
        onDone: () => _onDoneSelecting(multiDraftValue),
        onCancel: _cancelSelect
      };

      return renderCustomModal(modalProps);
    }
  };

  const renderExpandableModal = () => {
    return (
      // TODO: Rename this component cause it's not a modal anymore but the content of the modal
      <PickerModal
        testID={`${testID}.modal`}
        // visible={showExpandableModal}
        scrollPosition={selectedItemPosition}
        enableModalBlur={enableModalBlur}
        topBarProps={{
          ...topBarProps,
          onCancel: _cancelSelect,
          onDone: mode === Picker.modes.MULTI ? () => _onDoneSelecting(multiDraftValue) : undefined
        }}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={_onSearchChange}
        renderCustomSearch={renderCustomSearch}
        listProps={listProps}
        onShow={onShow}
        pickerModalProps={pickerModalProps}
      >
        {filteredChildren}
      </PickerModal>
    );
  };

  if (useNativePicker) {
    return <NativePicker {...props}/>;
  }

  return (
    <PickerContext.Provider value={getContextValue()}>
      <ExpandableOverlay
        // @ts-expect-error
        ref={pickerExpandable}
        modalProps={modalProps}
        expandableContent={renderExpandableModal()}
        renderCustomOverlay={renderCustomModal ? _renderCustomModal : undefined}
        testID={testID}
        {...customPickerProps}
        disabled={editable === false}
      >
        {renderPicker ? (
          renderPicker(value, _getLabel(value))
        ) : (
          <TextFieldMigrator
            migrate={migrateTextField}
            customWarning="RNUILib Picker component's internal TextField will soon be replaced with a new implementation, in order to start the migration - please pass to Picker the 'migrateTextField' prop"
            ref={forwardedRef}
            {...textInputProps}
            testID={`${testID}.input`}
            containerStyle={[paddings, margins, positionStyle, containerStyle]}
            {...getAccessibilityInfo()}
            importantForAccessibility={'no-hide-descendants'}
            value={label}
            selection={Constants.isAndroid ? {start: 0} : undefined}
            /* Disable TextField expandable feature */
            topBarProps={undefined}
            // expandable={false}
            // renderExpandable={_.noop}
            // onToggleExpandableModal={_.noop}
          />
        )}
      </ExpandableOverlay>
    </PickerContext.Provider>
  );
};

Picker.Item = PickerItem;
Picker.defaultProps = {
  ...TextField.defaultProps,
  mode: PICKER_MODES.SINGLE
};
Picker.modes = PICKER_MODES;
Picker.extractPickerItems = (props: PropsWithChildren<PickerProps>) => {
  const {children} = props;
  const items = React.Children.map(children, child => ({
    // @ts-expect-error handle use PickerItemProps once exist
    value: child?.props.value,
    // @ts-expect-error handle use PickerItemProps once exist
    label: child?.props.label
  }));
  return items;
};

export {PickerProps, PickerValue, PickerModes, PickerSearchStyle};
export {Picker}; // For tests
export default asBaseComponent(forwardRef(Picker));
