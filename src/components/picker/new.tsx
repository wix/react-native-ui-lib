// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
// TODO: deprecate onShow cause it's already supported by passing it in pickerModalProps
import _ from 'lodash';
import React, {useMemo, useState, useRef, PropsWithChildren} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {
  Constants,
  asBaseComponent,
  forwardRef,
  ForwardRefInjectedProps,
  BaseComponentInjectedProps
} from '../../commons/new';
import ExpandableOverlay, {ExpandableOverlayProps} from '../../incubator/expandableOverlay';
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
import usePickerSelection from './helpers/usePickerSelection';
import usePickerLabel from './helpers/usePickerLabel';
import usePickerSearch from './helpers/usePickerSearch';
import usePickerMigrationWarnings from './helpers/usePickerMigrationWarnings';
import {PickerProps, PickerValue, PickerModes, PickerSearchStyle} from './types';

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
    onSearchChange,
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

  const pickerExpandable = useRef<typeof ExpandableOverlay>();

  usePickerMigrationWarnings({value, mode});
  const {
    filteredChildren,
    setSearchValue,
    onSearchChange: _onSearchChange
  } = usePickerSearch({showSearch, onSearchChange, getItemLabel, children});
  const {multiDraftValue, onDoneSelecting, toggleItemSelection, cancelSelect} = usePickerSelection({
    migrate,
    value,
    onChange,
    pickerExpandableRef: pickerExpandable,
    getItemValue,
    topBarProps,
    setSearchValue
  });

  const {label, accessibilityInfo} = usePickerLabel({
    value,
    items,
    getItemLabel,
    getLabel,
    placeholder: props.placeholder
  });

  const onSelectedItemLayout = (event: LayoutChangeEvent) => {
    const y = event.nativeEvent.layout.y;
    setSelectedItemPosition(y);
  };

  const contextValue = useMemo(() => {
    const pickerValue = !migrate && typeof value === 'object' && !_.isArray(value) ? value?.value : value;
    return {
      migrate,
      value: mode === Picker.modes.MULTI ? multiDraftValue : pickerValue,
      onPress: mode === Picker.modes.MULTI ? toggleItemSelection : onDoneSelecting,
      isMultiMode: mode === Picker.modes.MULTI,
      getItemValue,
      getItemLabel,
      onSelectedLayout: onSelectedItemLayout,
      renderItem,
      selectionLimit
    };
  }, [
    migrate,
    mode,
    value,
    multiDraftValue,
    renderItem,
    getItemValue,
    getItemLabel,
    selectionLimit,
    onSelectedItemLayout,
    toggleItemSelection,
    onDoneSelecting
  ]);

  const textInputProps = TextField.extractOwnProps(props);
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
        onDone: () => onDoneSelecting(multiDraftValue),
        onCancel: cancelSelect
      };

      return renderCustomModal(modalProps);
    }
  };

  const expandableModalContent = useMemo(() => {
    return (
      // TODO: Rename this component cause it's not a modal anymore but the content of the modal
      <PickerModal
        testID={`${testID}.modal`}
        // visible={showExpandableModal}
        scrollPosition={selectedItemPosition}
        enableModalBlur={enableModalBlur}
        topBarProps={{
          ...topBarProps,
          onCancel: cancelSelect,
          onDone: mode === Picker.modes.MULTI ? () => onDoneSelecting(multiDraftValue) : undefined
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
  }, [
    testID,
    mode,
    selectedItemPosition,
    enableModalBlur,
    topBarProps,
    cancelSelect,
    onDoneSelecting,
    multiDraftValue,
    showSearch,
    searchStyle,
    searchPlaceholder,
    _onSearchChange,
    renderCustomSearch,
    listProps,
    onShow,
    pickerModalProps,
    filteredChildren
  ]);

  if (useNativePicker) {
    return <NativePicker {...props}/>;
  }

  return (
    <PickerContext.Provider value={contextValue}>
      <ExpandableOverlay
        // @ts-expect-error
        ref={pickerExpandable}
        modalProps={modalProps}
        expandableContent={expandableModalContent}
        renderCustomOverlay={renderCustomModal ? _renderCustomModal : undefined}
        testID={testID}
        {...customPickerProps}
        disabled={editable === false}
      >
        {renderPicker ? (
          renderPicker(value, label)
        ) : (
          <TextFieldMigrator
            migrate={migrateTextField}
            customWarning="RNUILib Picker component's internal TextField will soon be replaced with a new implementation, in order to start the migration - please pass to Picker the 'migrateTextField' prop"
            ref={forwardedRef}
            {...textInputProps}
            testID={`${testID}.input`}
            containerStyle={[paddings, margins, positionStyle, containerStyle]}
            {...accessibilityInfo}
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
