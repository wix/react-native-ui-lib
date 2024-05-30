// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
import _ from 'lodash';
import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Typography} from 'style';
import {useThemeProps} from 'hooks';
import {Constants} from '../../commons/new';
import ExpandableOverlay, {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
import TextField from '../textField';
import Icon from '../icon';
import View from '../view';
import Text from '../text';
// import NativePicker from './NativePicker';
import PickerItemsList from './PickerItemsList';
import PickerItem from './PickerItem';
import PickerContext from './PickerContext';
import usePickerSelection from './helpers/usePickerSelection';
import usePickerLabel from './helpers/usePickerLabel';
import usePickerSearch from './helpers/usePickerSearch';
import useImperativePickerHandle from './helpers/useImperativePickerHandle';
import usePickerMigrationWarnings from './helpers/usePickerMigrationWarnings';
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

const dropdown = require('./assets/dropdown.png');

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
    renderCustomDialogHeader,
    // useNativePicker,
    useWheelPicker,
    useDialog,
    renderPicker,
    customPickerProps,
    containerStyle,
    labelStyle,
    testID,
    onChange,
    onPress,
    onShow,
    onSearchChange,
    renderCustomModal,
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
  usePickerMigrationWarnings({children, migrate, getItemLabel, getItemValue});

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

  const {label, accessibilityInfo} = usePickerLabel({
    value,
    items,
    getItemLabel,
    getLabel,
    accessibilityLabel,
    accessibilityHint,
    placeholder: themeProps.placeholder
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

  const modalProps: ExpandableOverlayProps['modalProps'] = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel,
    onShow,
    ...pickerModalProps
  };

  const propsByFieldType = useMemo(() => {
    if (fieldType === PickerFieldTypes.filter) {
      return {
        preset: preset || null,
        containerStyle: {flexDirection: 'row'},
        labelStyle: Typography.text70,
        trailingAccessory: themeProps.trailingAccessory ?? (
          <Icon marginL-s1 source={dropdown} testID={`${testID}.input.icon`}/>
        )
      };
    } else if (fieldType === PickerFieldTypes.settings) {
      return {
        preset: preset || null,
        label: undefined
      };
    }
  }, [fieldType, preset, themeProps.trailingAccessory]);

  const renderPickerItem = useCallback((item: PickerItemProps): React.ReactElement => {
    return <PickerItem {...item}/>;
  }, []);

  const renderItems = useCallback((items: PickerProps['items']) => {
    return items && _.map(items, item => renderPickerItem(item));
  },
  [renderPickerItem]);

  const _renderCustomModal: ExpandableOverlayProps['renderCustomOverlay'] = ({
    visible,
    closeExpandable,
    toggleExpandable
  }) => {
    if (renderCustomModal) {
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

      return renderCustomModal(modalProps);
    }
  };

  const expandableModalContent = useMemo(() => {
    const useItems = useWheelPicker || propItems;
    return (
      <PickerItemsList
        testID={`${testID}.modal`}
        useWheelPicker={useWheelPicker}
        mode={mode}
        useDialog={useDialog}
        items={useItems ? items : undefined}
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
    topBarProps,
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
    items
  ]);

  const renderPickerInnerInput = () => {
    if (fieldType === PickerFieldTypes.filter) {
      return (
        <Text text70 numberOfLines={1} style={others.style} testID={`${testID}.input`}>
          {_.isEmpty(label) ? others.placeholder : label}
        </Text>
      );
    } else if (fieldType === PickerFieldTypes.settings) {
      return (
        <View flexG row spread>
          <Text text70 style={labelStyle} testID={`${testID}.input`}>
            {others.label}
          </Text>
          <Text text70 $textPrimary style={others.style}>
            {_.isEmpty(label) ? others.placeholder : label}
          </Text>
        </View>
      );
    }
  };

  // if (useNativePicker) {
  //   return <NativePicker {...themeProps}/>;
  // }

  return (
    //TODO : fix the ExpandableOverlay ts error
    <PickerContext.Provider value={contextValue}>
      {
        /* @ts-expect-error */
        <ExpandableOverlay
          ref={pickerExpandable}
          useDialog={useDialog || useWheelPicker}
          modalProps={modalProps}
          dialogProps={customPickerProps?.dialogProps || DIALOG_PROPS}
          expandableContent={expandableModalContent}
          renderCustomOverlay={renderCustomModal ? _renderCustomModal : undefined}
          onPress={onPress}
          testID={testID}
          {...customPickerProps}
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
              {renderPickerInnerInput()}
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
