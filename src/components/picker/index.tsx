// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
import _ from 'lodash';
import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {LayoutChangeEvent} from 'react-native';
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
  PickerMethods
} from './types';

const DIALOG_PROPS = {
  bottom: true,
  width: '100%',
  height: 250
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
    mode,
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
    ...others
  } = themeProps;
  const {preset} = others;

  const [selectedItemPosition, setSelectedItemPosition] = useState<number>(0);
  const [items, setItems] = useState<PickerItemProps[]>(propItems || extractPickerItems(themeProps));

  useEffect(() => {
    if (propItems) {
      setItems(propItems);
    }
  }, [propItems]);

  const pickerExpandable = useRef<ExpandableOverlayMethods>(null);

  // TODO:  Remove this when migration is completed, starting of v8
  // usePickerMigrationWarnings({children, migrate, getItemLabel, getItemValue});

  const pickerRef = useImperativePickerHandle(ref, pickerExpandable);
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
    setSearchValue,
    mode
  });

  const overlayTopBarProps = useMemo(() => {
    return {
      ...topBarProps,
      onCancel: cancelSelect,
      onDone: mode === PickerModes.MULTI ? () => onDoneSelecting(multiDraftValue) : undefined
    };
  }, [topBarProps, cancelSelect, onDoneSelecting, multiDraftValue, mode]);

  const {renderHeader, renderInput, renderOverlay, customPickerProps} = useNewPickerProps({
    ...themeProps,
    topBarProps: overlayTopBarProps
  });

  const {label, accessibilityInfo} = usePickerLabel({
    value,
    items,
    getItemLabel,
    getLabel,
    accessibilityLabel,
    accessibilityHint,
    placeholder: themeProps.placeholder
  });

  const {placeholder, style, trailingAccessory} = themeProps;
  const {propsByFieldType, pickerInnerInput} = useFieldType({
    fieldType,
    preset,
    trailingAccessory,
    style,
    placeholder,
    labelStyle,
    label
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

  const renderTextField = useCallback(() => {
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
  }, [
    renderInput,
    pickerRef,
    propsByFieldType,
    containerStyle,
    labelStyle,
    accessibilityInfo,
    label,
    pickerInnerInput,
    testID
  ]);

  const expandableModalContent = useMemo(() => {
    const useItems = useWheelPicker || propItems;
    return (
      <PickerItemsList
        testID={`${testID}.modal`}
        useWheelPicker={useWheelPicker}
        mode={mode}
        useDialog={useDialog}
        items={useItems ? items : undefined}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={_onSearchChange}
        renderCustomSearch={renderCustomSearch}
        renderHeader={renderHeader}
        listProps={listProps}
        useSafeArea={useSafeArea}
      >
        {filteredChildren}
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
    filteredChildren,
    useSafeArea,
    useWheelPicker,
    items
  ]);

  return (
    <PickerContext.Provider value={contextValue}>
      {
        <ExpandableOverlay
          ref={pickerExpandable}
          useDialog={useDialog || useWheelPicker}
          dialogProps={DIALOG_PROPS}
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
Picker.defaultProps = {
  mode: PickerModes.SINGLE
};
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
  PickerMethods
};
export {Picker}; // For tests
export default Picker as typeof Picker & PickerStatics;
