// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
// TODO: deprecate onShow cause it's already supported by passing it in pickerModalProps
import _ from 'lodash';
import React, {useMemo, useState, useRef, PropsWithChildren, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {
  Constants,
  asBaseComponent,
  forwardRef,
  ForwardRefInjectedProps,
  BaseComponentInjectedProps
} from '../../commons/new';
import ExpandableOverlay, {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
// @ts-expect-error
import {TextField} from '../inputs';
import TextFieldMigrator from '../textField/TextFieldMigrator';
// @ts-expect-error
import NativePicker from './NativePicker';
import PickerItemsList from './PickerItemsList';
import PickerItem from './PickerItem';
import PickerContext from './PickerContext';
import usePickerSelection from './helpers/usePickerSelection';
import usePickerLabel from './helpers/usePickerLabel';
import usePickerSearch from './helpers/usePickerSearch';
import useImperativePickerHandle from './helpers/useImperativePickerHandle';
import usePickerMigrationWarnings from './helpers/usePickerMigrationWarnings';
import {PickerProps, PickerItemProps, PickerValue, PickerModes, PickerSearchStyle, PickerMethods} from './types';

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
    onPress,
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
    getLabel,
    getItemLabel,
    getItemValue,
    renderItem,
    children,
    useSafeArea,
    migrate,
    migrateTextField,
    ...others
  } = props;

  const [selectedItemPosition, setSelectedItemPosition] = useState(0);
  const [items] = useState(Picker.extractPickerItems(props));

  const pickerExpandable = useRef<ExpandableOverlayMethods>(null);

  usePickerMigrationWarnings({value, mode});

  const pickerRef = useImperativePickerHandle(forwardedRef, pickerExpandable);
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

  const onSelectedItemLayout = useCallback((event: LayoutChangeEvent) => {
    const y = event.nativeEvent.layout.y;
    setSelectedItemPosition(y);
  }, []);

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

  // const textInputProps = TextField.extractOwnProps(props);
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
      <PickerItemsList
        testID={`${testID}.modal`}
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
        useSafeArea={useSafeArea}
      >
        {filteredChildren}
      </PickerItemsList>
    );
  }, [
    testID,
    mode,
    selectedItemPosition,
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
    filteredChildren,
    useSafeArea
  ]);

  if (useNativePicker) {
    return <NativePicker {...props}/>;
  }

  return (
    <PickerContext.Provider value={contextValue}>
      <ExpandableOverlay
        ref={pickerExpandable}
        modalProps={modalProps}
        expandableContent={expandableModalContent}
        renderCustomOverlay={renderCustomModal ? _renderCustomModal : undefined}
        onPress={onPress}
        testID={testID}
        {...customPickerProps}
        disabled={props.editable === false}
      >
        {renderPicker ? (
          // @ts-expect-error TS throws a weird error, might be an issue with TS
          renderPicker(value, label)
        ) : (
          <TextFieldMigrator
            migrate={migrateTextField}
            customWarning="RNUILib Picker component's internal TextField will soon be replaced with a new implementation, in order to start the migration - please pass to Picker the 'migrateTextField' prop"
            ref={pickerRef}
            // {...textInputProps}
            {...others}
            testID={`${testID}.input`}
            containerStyle={[paddings, margins, positionStyle, containerStyle]}
            {...accessibilityInfo}
            importantForAccessibility={'no-hide-descendants'}
            value={label}
            selection={Constants.isAndroid ? {start: 0} : undefined}
            /* Note: Disable TextField expandable feature */
            topBarProps={undefined}
          />
        )}
      </ExpandableOverlay>
    </PickerContext.Provider>
  );
};

Picker.Item = PickerItem;
Picker.defaultProps = {
  ...TextField.defaultProps,
  mode: PickerModes.SINGLE
};
Picker.modes = PickerModes;
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

export {PickerProps, PickerItemProps, PickerValue, PickerModes, PickerSearchStyle, PickerMethods};
export {Picker}; // For tests
export default asBaseComponent<PickerProps, typeof Picker>(forwardRef(Picker));
