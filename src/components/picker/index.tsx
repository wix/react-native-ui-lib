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
// import usePickerMigrationWarnings from './helpers/usePickerMigrationWarnings';
import usePickerType from './helpers/usePickerType';
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
  PickerTypes,
  PickerPropsDeprecation
} from './types';

type PickerStatics = {
  Item: typeof PickerItem;
  modes: typeof PickerModes;
  fieldTypes: typeof PickerFieldTypes;
  extractPickerItems: typeof extractPickerItems;
  picketType: typeof PickerTypes;
};

const Picker = React.forwardRef((props: PickerProps & PickerPropsDeprecation, ref) => {
  const themeProps = useThemeProps(props, 'Picker');
  const {
    mode,
    fieldType = PickerFieldTypes.form,
    selectionLimit,
    showSearch,
    searchStyle,
    searchPlaceholder,
    renderCustomSearch,
    renderCustomDialogHeader,
    useWheelPicker,
    useDialog,
    renderPicker,
    customPickerProps,
    containerStyle,
    labelStyle,
    testID,
    onChange,
    onPress,
    onSearchChange,
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

  const {type, componentProps} = usePickerType({
    ...themeProps
  });
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
    headerProps: type.modal && componentProps.headerProps,
    setSearchValue,
    mode
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

  const _renderCustomModal: ExpandableOverlayProps['renderCustomOverlay'] = ({
    visible,
    closeExpandable,
    toggleExpandable
  }) => {
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

    return componentProps.customModal?.(modalProps);
  };

  const expandableModalContent = useMemo(() => {
    const useItems = type.wheelPicker || propItems;
    return (
      <PickerItemsList
        testID={`${testID}.modal`}
        mode={mode}
        type={type}
        items={useItems ? items : undefined}
        topBarProps={{
          ...componentProps.headerProps,
          onCancel: cancelSelect,
          onDone: mode === PickerModes.MULTI ? () => onDoneSelecting(multiDraftValue) : undefined
        }}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={_onSearchChange}
        renderCustomSearch={renderCustomSearch}
        renderCustomDialogHeader={renderCustomDialogHeader}
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
    cancelSelect,
    onDoneSelecting,
    multiDraftValue,
    showSearch,
    searchStyle,
    searchPlaceholder,
    _onSearchChange,
    renderCustomSearch,
    renderCustomDialogHeader,
    listProps,
    filteredChildren,
    useSafeArea,
    useWheelPicker,
    items,
    type,
    componentProps
  ]);

  return (
    //TODO : fix the ExpandableOverlay ts error
    <PickerContext.Provider value={contextValue}>
      {
        /* @ts-expect-error */
        <ExpandableOverlay
          ref={pickerExpandable}
          useDialog={type.dialog || type.wheelPicker}
          modalProps={componentProps.pickerModalProps}
          expandableContent={expandableModalContent}
          renderCustomOverlay={type.custom ? _renderCustomModal : undefined}
          onPress={onPress}
          testID={testID}
          {...customPickerProps}
          dialogProps={componentProps.dialogProps}
          disabled={themeProps.editable === false}
        >
          {renderPicker ? (
            // @ts-expect-error - hopefully will be solved after the picker migration ends
            renderPicker(value, label)
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
          )}
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
// @ts-expect-error
Picker.pickerTypes = PickerTypes;

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
  PickerTypes
};
export {Picker}; // For tests
export default Picker as typeof Picker & PickerStatics;
