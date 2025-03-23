// TODO: deprecate all places where we check if _.isPlainObject
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
import _ from 'lodash';
import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {DimensionValue, LayoutChangeEvent} from 'react-native';
import {useThemeProps} from 'hooks';
import {Constants} from '../../commons/new';
import ExpandableOverlay, {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
import TextField from '../textField';
import PickerItemsList from './PickerItemsList';
import PickerItem from './PickerItem';
import PickerContext from './PickerContext';
import usePickerSelection from './helpers/usePickerSelection';
import usePickerLabel from './helpers/usePickerLabel';
import usePickerSearch from './helpers/usePickerSearch';
import useImperativePickerHandle from './helpers/useImperativePickerHandle';
import useFieldType from './helpers/useFieldType';
import useNewPickerProps from './helpers/useNewPickerProps';
// import usePickerMigrationWarnings from './helpers/usePickerMigrationWarnings';
import {extractPickerItems} from './PickerPresenter';
import {
  PickerProps,
  PickerItemProps,
  PickerValue,
  PickerModes,
  PickerFieldTypes,
  PickerSearchStyle,
  RenderCustomModalProps,
  PickerItemsListProps,
  PickerMethods,
  PickerSelectionStatusProps
} from './types';
import {DialogProps} from '../../incubator/dialog';

const DEFAULT_DIALOG_PROPS: DialogProps = {
  bottom: true,
  width: '100%' as DimensionValue
};

type PickerStatics = {
  Item: typeof PickerItem;
  modes: typeof PickerModes;
  fieldTypes: typeof PickerFieldTypes;
  extractPickerItems: typeof extractPickerItems;
};

const Picker = React.forwardRef((props: PickerProps, ref) => {
  const themeProps = useThemeProps(props, 'Picker');
  const {
    mode = PickerModes.SINGLE,
    fieldType = PickerFieldTypes.form,
    selectionLimit,
    showSearch,
    searchStyle,
    searchPlaceholder,
    renderCustomSearch,
    useWheelPicker,
    useDialog,
    containerStyle,
    labelStyle,
    testID,
    onChange,
    onPress,
    onSearchChange,
    topBarProps,
    listProps,
    value,
    getLabel,
    getItemLabel,
    getItemValue,
    renderItem,
    children,
    useSafeArea,
    // TODO: Remove migrate props and migrate code
    migrate = true,
    accessibilityLabel,
    accessibilityHint,
    items: propItems,
    showLoader,
    customLoaderElement,
    renderCustomTopElement,
    selectionStatus,
    ...others
  } = themeProps;
  const {preset, placeholder, style, trailingAccessory, label: propsLabel} = others;
  const {renderHeader, renderInput, renderOverlay, customPickerProps} = useNewPickerProps(themeProps);
  const [selectedItemPosition, setSelectedItemPosition] = useState<number>(0);
  const [items, setItems] = useState<PickerItemProps[]>(propItems || extractPickerItems(themeProps));
  const pickerExpandable = useRef<ExpandableOverlayMethods>(null);
  const pickerRef = useImperativePickerHandle(ref, pickerExpandable);

  // TODO: Remove this when migration is completed, starting of v8
  // usePickerMigrationWarnings({children, migrate, getItemLabel, getItemValue});

  useEffect(() => {
    if (propItems) {
      setItems(propItems);
    }
  }, [propItems]);

  const {
    filteredItems,
    setSearchValue,
    onSearchChange: _onSearchChange
  } = usePickerSearch({showSearch, onSearchChange, getItemLabel, children, items});
  const {
    multiDraftValue,
    onDoneSelecting,
    toggleItemSelection,
    cancelSelect,
    areAllItemsSelected,
    toggleAllItemsSelection
  } = usePickerSelection({
    migrate,
    value,
    onChange,
    pickerExpandableRef: pickerExpandable,
    getItemValue,
    topBarProps,
    setSearchValue,
    mode,
    items
  });

  const {label, accessibilityInfo} = usePickerLabel({
    value,
    items,
    getItemLabel,
    getLabel,
    accessibilityLabel,
    accessibilityHint,
    placeholder
  });

  const {propsByFieldType, pickerInnerInput} = useFieldType({
    fieldType,
    preset,
    trailingAccessory,
    style,
    placeholder,
    labelStyle,
    label: propsLabel,
    value: label,
    testID
  });

  const onSelectedItemLayout = useCallback((event: LayoutChangeEvent) => {
    const y = event.nativeEvent.layout.y;
    setSelectedItemPosition(y);
  }, []);

  const contextValue = useMemo(() => {
    // @ts-expect-error cleanup after removing migrate prop
    const pickerValue = !migrate && typeof value === 'object' && !_.isArray(value) ? value?.value : value;
    return {
      migrate,
      value: mode === PickerModes.MULTI ? multiDraftValue : pickerValue,
      onPress: mode === PickerModes.MULTI ? toggleItemSelection : onDoneSelecting,
      isMultiMode: mode === PickerModes.MULTI,
      getItemValue,
      getItemLabel,
      onSelectedLayout: onSelectedItemLayout,
      renderItem,
      selectionLimit,
      areAllItemsSelected,
      toggleAllItemsSelection
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
    onDoneSelecting,
    areAllItemsSelected,
    toggleAllItemsSelection
  ]);

  const renderPickerItem = useCallback((item: PickerItemProps, index: number): React.ReactElement => {
    return <PickerItem key={`${index}-${item.value}`} {...item}/>;
  }, []);

  const renderItems = useCallback((items: PickerProps['items']) => {
    return items && _.map(items, (item, index) => renderPickerItem(item, index));
  },
  [renderPickerItem]);

  const _renderOverlay: ExpandableOverlayProps['renderCustomOverlay'] = ({
    visible,
    closeExpandable,
    toggleExpandable
  }) => {
    if (renderOverlay) {
      const modalProps = {
        visible,
        closeModal: closeExpandable,
        toggleModal: toggleExpandable,
        onSearchChange: _onSearchChange,
        children: children || renderItems(items),
        // onDone is relevant to multi mode only
        onDone: () => onDoneSelecting(multiDraftValue),
        onCancel: cancelSelect
      };

      return renderOverlay(modalProps);
    }
  };

  const renderTextField = () => {
    return renderInput ? (
      // @ts-expect-error - hopefully will be solved after the picker migration ends
      renderInput(value, label)
    ) : (
      <TextField
        // @ts-expect-error
        ref={pickerRef}
        {...others}
        {...propsByFieldType}
        testID={`${testID}.input`}
        // @ts-expect-error
        containerStyle={[containerStyle, propsByFieldType?.containerStyle]}
        labelStyle={[propsByFieldType?.labelStyle, labelStyle]}
        {...accessibilityInfo}
        importantForAccessibility={'no-hide-descendants'}
        value={label}
        selection={Constants.isAndroid ? {start: 0} : undefined}
      >
        {pickerInnerInput}
      </TextField>
    );
  };

  const expandableModalContent = useMemo(() => {
    const useItems = useWheelPicker || propItems;
    return (
      <PickerItemsList
        testID={`${testID}.modal`}
        useWheelPicker={useWheelPicker}
        mode={mode}
        useDialog={useDialog}
        items={useItems ? filteredItems : undefined}
        topBarProps={{
          ...topBarProps,
          onCancel: cancelSelect,
          onDone: mode === PickerModes.MULTI ? () => onDoneSelecting(multiDraftValue) : undefined
        }}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={_onSearchChange}
        renderCustomSearch={renderCustomSearch}
        renderHeader={renderHeader}
        listProps={listProps}
        useSafeArea={useSafeArea}
        showLoader={showLoader}
        customLoaderElement={customLoaderElement}
        renderCustomTopElement={renderCustomTopElement}
        selectionStatus={selectionStatus}
      >
        {filteredItems}
      </PickerItemsList>
    );
  }, [
    testID,
    mode,
    useDialog,
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
    renderHeader,
    listProps,
    filteredItems,
    useSafeArea,
    useWheelPicker,
    items,
    showLoader
  ]);

  return (
    <PickerContext.Provider value={contextValue}>
      {
        <ExpandableOverlay
          ref={pickerExpandable}
          useDialog={useDialog || useWheelPicker}
          dialogProps={DEFAULT_DIALOG_PROPS}
          migrateDialog
          expandableContent={expandableModalContent}
          renderCustomOverlay={renderOverlay ? _renderOverlay : undefined}
          onPress={onPress}
          testID={testID}
          {...customPickerProps}
          disabled={themeProps.editable === false}
        >
          {renderTextField()}
        </ExpandableOverlay>
      }
    </PickerContext.Provider>
  );
});

// @ts-expect-error
Picker.Item = PickerItem;

Picker.displayName = 'Picker';
// @ts-expect-error
Picker.modes = PickerModes;
// @ts-expect-error
Picker.fieldTypes = PickerFieldTypes;
// @ts-expect-error
Picker.extractPickerItems = extractPickerItems;

export {
  PickerProps,
  PickerItemProps,
  PickerValue,
  PickerModes,
  PickerFieldTypes,
  PickerSearchStyle,
  RenderCustomModalProps,
  PickerItemsListProps,
  PickerMethods,
  PickerSelectionStatusProps
};
export {Picker}; // For tests
export default Picker as typeof Picker & PickerStatics;
