// TODO: deprecate all places where we check if _.isPlainObject
// TODO: deprecate getItemValue prop
// TODO: deprecate getItemLabel prop
// TODO: Add initialValue prop
// TODO: consider deprecating renderCustomModal prop
// TODO: deprecate onShow cause it's already supported by passing it in pickerModalProps
import _ from 'lodash';
import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Typography} from 'style';
import {useThemeProps} from 'hooks';
import {Constants} from '../../commons/new';
import ExpandableOverlay, {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
// @ts-expect-error
import {TextField} from '../inputs';
import TextFieldMigrator from '../textField/TextFieldMigrator';
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
// import usePickerMigrationWarnings from './helpers/usePickerMigrationWarnings';
import {extractPickerItems} from './PickerPresenter';
import {
  PickerProps,
  PickerItemProps,
  PickerValue,
  PickerModes,
  PickerFieldTypes,
  PickerSearchStyle,
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
    // useNativePicker,
    useWheelPicker,
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
    migrateTextField = true,
    accessibilityLabel,
    accessibilityHint,
    items: propItems,
    ...others
  } = themeProps;
  const {preset} = others;

  const [selectedItemPosition, setSelectedItemPosition] = useState(0);
  const [items, setItems] = useState(propItems || extractPickerItems(themeProps));

  useEffect(() => {
    if (propItems) {
      setItems(propItems);
    }
  }, [propItems]);

  const pickerExpandable = useRef<ExpandableOverlayMethods>(null);

  // TODO: Remove
  // usePickerMigrationWarnings({value, mode});

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
        trailingAccessory: themeProps.trailingAccessory ?? <Icon marginL-s1 source={dropdown}/>
      };
    } else if (fieldType === PickerFieldTypes.settings) {
      return {
        preset: preset || null,
        label: undefined
      };
    }
  }, [fieldType, preset, themeProps.trailingAccessory]);

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
        children,
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
    useSafeArea,
    useWheelPicker,
    items
  ]);

  const renderPickerInnerInput = () => {
    if (fieldType === PickerFieldTypes.filter) {
      return (
        <Text text70 style={others.style}>
          {label ?? others.placeholder}
        </Text>
      );
    } else if (fieldType === PickerFieldTypes.settings) {
      return (
        <View flex row spread>
          <Text text70 style={labelStyle}>
            {others.label}
          </Text>
          <Text text70 $textPrimary style={others.style}>
            {label ?? others.placeholder}
          </Text>
        </View>
      );
    }
  };

  // if (useNativePicker) {
  //   return <NativePicker {...themeProps}/>;
  // }

  return (
    <PickerContext.Provider value={contextValue}>
      <ExpandableOverlay
        ref={pickerExpandable}
        useDialog={useWheelPicker}
        modalProps={modalProps}
        dialogProps={DIALOG_PROPS}
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
          <TextFieldMigrator
            migrate={migrateTextField}
            // customWarning="RNUILib Picker component's internal TextField will soon be replaced with a new implementation, in order to start the migration - please pass to Picker the 'migrateTextField' prop"
            // @ts-expect-error
            ref={pickerRef}
            // {...textInputProps}
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
            /* Note: Disable TextField expandable feature */
            // topBarProps={undefined}
          >
            {renderPickerInnerInput()}
          </TextFieldMigrator>
        )}
      </ExpandableOverlay>
    </PickerContext.Provider>
  );
});

// @ts-expect-error
Picker.Item = PickerItem;
Picker.defaultProps = {
  ...TextField.defaultProps,
  mode: PickerModes.SINGLE
};
Picker.displayName = 'Picker';
// @ts-expect-error
Picker.modes = PickerModes;
// @ts-expect-error
Picker.fieldTypes = PickerFieldTypes;
// @ts-expect-error
Picker.extractPickerItems = extractPickerItems;

export {PickerProps, PickerItemProps, PickerValue, PickerModes, PickerFieldTypes, PickerSearchStyle, PickerMethods};
export {Picker}; // For tests
export default Picker as typeof Picker & PickerStatics;
